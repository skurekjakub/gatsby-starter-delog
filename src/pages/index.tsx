import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
import HeroHeader from "../components/heroHeader"
import { PageProps } from "gatsby"
import { Helmet } from "react-helmet"

export interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        title: string,
        description: string
      }
    }
    allMarkdownRemark: {
      edges: {
        node: {
          id: number,
          excerpt: string,
          frontmatter: {
            date: Date,
            path: string,
            title: string,
            thumbnail: string
          }
        }
      }[]
    }    
  }
}

export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`

const IndexPage: React.FC<IndexPageProps> = ({data}) =>
{  
  const {allMarkdownRemark: {edges}, site: {siteMetadata: {title, description}}} = data;
  
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <HeroHeader/>
      <h2>Blog Posts &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  )
}

export default IndexPage