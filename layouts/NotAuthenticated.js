import React, { Component } from 'react'
import Header from '../components/Header'

export default class NotAuthenticated extends Component {
  render () {
    return (
      <section>
        <Header />
        {this.props.children}
      </section>
    )
  }
};
