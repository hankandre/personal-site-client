import React, { PropTypes } from 'react'

import defaultPage from './defaultPage'

const securePageHoc = Page => class SecurePage extends React.Component {
  static getInitialProps (ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx)
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }
  render () {
    console.log(this.props)
    if (!this.props.isAuthenticated) {
      return <h1>You're not authenticated!</h1>
    }
    return <Page {...this.props} />
  }
}

export default Page => defaultPage(securePageHoc(Page))
