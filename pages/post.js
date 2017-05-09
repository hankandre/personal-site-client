import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Markdown from 'react-markdown'

import defaultPage from '../hocs/defaultPage'

class Post extends Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    console.log(this.props)
    return (
      <section>
        <style jsx>{`
          img {
            display: block;
            max-height: 80vh;
          }
        `}</style>
        <img src={this.props.url.query.image} alt='post title' />
        <Container>
          <h1>{this.props.url.query.title}</h1>
          <Markdown source={this.props.url.query.content} />
        </Container>
      </section>
    )
  }
}

export default defaultPage(Post)
