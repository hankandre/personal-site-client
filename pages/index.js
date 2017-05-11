import React, { PropTypes, Component } from 'react'
import { Image, Header, Divider } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'
import Link from 'next/link'

import defaultPage from '../hocs/defaultPage'
import NotAuthenticated from '../layouts/NotAuthenticated'

class Index extends Component {
  static async getInitialProps () {
    const res = await fetch('https://stark-cliffs-87781.herokuapp.com/')
    const blogPosts = await res.json()
    return { blogPosts }
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
        <style jsx>{`
        img {
          max-width: 100%;
          display: block;
        }
        section {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }
        section > * {
          flex: 1 33.33333333%;
        }
        `}</style>
        {isAuthenticated ? this.SuperSecretDiv() : null }
        <section>
          {
            blogPosts.posts.map(post => {
              const date = new Date(post.createdAt)
              const slug = post.type.toLowerCase()
              return <Link
                key={post._id}
                href={`/${slug}?id=${post._id}`}
                as={`/${slug}/${post._id}`} >
                <a>
                  <Image src={post.image} />
                  <div>
                    <Header>{post.title}</Header>
                    <p>{date.toLocaleDateString()}</p>
                    <Divider />>
                    <Markdown source={post.content} />
                  </div>
                </a>
              </Link>
            })
          }
        </section>
      </NotAuthenticated>

    )
  }
}

export default defaultPage(Index)
