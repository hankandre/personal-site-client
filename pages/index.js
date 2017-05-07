import React, { PropTypes, Component } from 'react'
import { Segment } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'

import defaultPage from '../hocs/defaultPage'
import NotAuthenticated from '../layouts/NotAuthenticated'

class Index extends Component {
  static async getInitialProps () {
    const res = await fetch('https://stark-cliffs-87781.herokuapp.com/')
    const data = await res.json()
    return { blogPosts: data }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  SuperSecretDiv = () => (
    <b>
      This is a super secret div.
    </b>
  )

  render () {
    return (
      <NotAuthenticated>
        <style jsx global>{`
        img {
          max-width: 100%;
          display: block;
        }
        `}</style>
        {this.props.isAuthenticated ? this.SuperSecretDiv() : null }
        {
          this.props.blogPosts.posts.map(post => {
            const date = new Date(post.createdAt)
            return <div>
              <h4>{post.title}</h4>
              <p>{
                date.toLocaleDateString()
              }</p>
              <Segment>
                <Markdown source={post.content} />
              </Segment>
            </div>
          })
        }
      </NotAuthenticated>

    )
  }
}

export default defaultPage(Index)
