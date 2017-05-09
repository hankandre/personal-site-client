import React, { PropTypes, Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'
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

  SuperSecretDiv = () => (
    <b>
      This is a super secret div.
    </b>
  )

  render () {
    const { isAuthenticated, blogPosts } = this.props
    return (
      <NotAuthenticated>
        <style jsx global>{`
        img {
          max-width: 100%;
          display: block;
        }
        `}</style>
        {isAuthenticated ? this.SuperSecretDiv() : null }
        <Card.Group itemsPerRow='3' stackable>
          {
            blogPosts.posts.map(post => {
              const date = new Date(post.createdAt)
              const slug = post.type.toLowerCase()
              return <Link href={`/${slug}?`} >
                <Card
                  key={post._id}
                  as='a'>
                  <Image src={post.image} />
                  <Card.Content>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Meta content={date.toLocaleDateString()} />
                    <Card.Description>
                      <Markdown source={post.content} />
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            })
          }
        </Card.Group>
      </NotAuthenticated>

    )
  }
}

export default defaultPage(Index)
