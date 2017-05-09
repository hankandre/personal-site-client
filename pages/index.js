import React, { PropTypes, Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'
import Router from 'next/router'
import Link from 'next/link'

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

  constructor (props) {
    super(props)
    this.props = props
  }

  toQueryString (object) {
    let params = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var element = object[key]
        params.push(`${key}=${element}`)
      }
    }
    return params.join('&')
  }

  navigateToPost (post) {
    console.log(post)
    Router.push(
      `/${post.type.toLowerCase()}?${this.toQueryString(post)}`,
      `/${post.type.toLowerCase()}/${post.title.toLowerCase().split(' ').join('-')}`,
      { shallow: true })
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
        <Card.Group>
          {
            this.props.blogPosts.posts.map(post => {
              if (process.browser) {
                Router.prefetch(`/${post.type.toLowerCase()}?${this.toQueryString(post)}`)
              }
              const date = new Date(post.createdAt)
              return <Card key={post._id} onClick={this.navigateToPost.bind(this, post)}>
                <Image src={post.image} />
                <Card.Content>
                  <Card.Header>{post.title}</Card.Header>
                  <Card.Meta content={date.toLocaleDateString()} />
                  <Card.Description>
                    <Markdown source={post.content} />
                  </Card.Description>
                </Card.Content>
              </Card>
            })
          }
        </Card.Group>
      </NotAuthenticated>

    )
  }
}

export default defaultPage(Index)
