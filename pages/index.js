import React, { PropTypes, Component } from 'react'
import { Item } from 'semantic-ui-react'
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
        <Item.Group>
          {
            this.props.blogPosts.posts.map(post => {
              const date = new Date(post.createdAt)
              return <Item>
                <Item.Image src={post.image} size='small' />
                <Item.Content>
                  <Item.Header>{post.title}</Item.Header>
                  <Item.Meta content={date.toLocaleDateString()} />
                  <Item.Description>
                    <Markdown source={post.content} />
                  </Item.Description>
                </Item.Content>
              </Item>
            })
          }
        </Item.Group>
      </NotAuthenticated>

    )
  }
}

export default defaultPage(Index)
