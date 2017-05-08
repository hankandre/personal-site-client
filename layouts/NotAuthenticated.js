import React, { Component } from 'react'
import Header from '../components/Header'
import { Container } from 'semantic-ui-react'

export default class NotAuthenticated extends Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    return (
      <section>
        {Header(this.props)}
        <Container>
          {this.props.children}
        </Container>
      </section>
    )
  }
};
