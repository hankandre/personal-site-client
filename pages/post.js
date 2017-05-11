import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch'

import defaultPage from '../hocs/defaultPage'

class Post extends Component {
  static async getInitialProps ({ req }) {
    const id = url.split('/').pop()
    const res = await fetch(`https://stark-cliffs-87781.herokuapp.com/${id}`)
    const post = await res.json()
    console.log(post)
    return {post}
  }

  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    const { query } = this.props.url
    return (
      <section>
        <style jsx>{`
          img {
            display: block;
            max-width: 100%;
          }
        `}</style>
        <img src={query.image} alt='post title' />
        <Container>
          <h1>{query.title}</h1>
          <Markdown source={query.content} />
        </Container>
      </section>
    )
  }
}

export default defaultPage(Post)
