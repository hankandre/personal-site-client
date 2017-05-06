import React, { PropTypes, Component } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'

import defaultPage from '../hocs/defaultPage'

class Index extends Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  static async getInitialProps () {
    const res = await fetch('https://stark-cliffs-87781.herokuapp.com/')
    const data = await res.json()
    return {data}
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
    console.log(this.props)
    return (
      <div>
        {this.props.isAuthenticated ? this.SuperSecretDiv() : null }
        <Container>
          {this.props.data.posts.map(post => {
            return <Segment>
              <h3>{post.title}</h3>
              <Markdown source={post.content.substring(0, 150)} />
            </Segment>
          })}
        </Container>
      </div>

    )
  }
}

export default defaultPage(Index)
