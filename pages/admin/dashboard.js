import React, { Component } from 'react'

import securePage from '../../hocs/securePage'

class Dashboard extends Component {
  render () {
    return (
      <h1>Dashboard</h1>
    )
  }
}

export default securePage(Dashboard)
