import React, { PropTypes } from 'react'
import Router from 'next/router'

import defaultPage from './defaultPage'

const securePageHoc = Page => class SecurePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notAuthenticated: null
    }
  }

  static getInitialProps (ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx)
  }

  componentDidMount () {
    if (!this.props.isAuthenticated && process.browser) {
      this.setState({notAuthenticated: `Um. You're not logged in`})
      setTimeout(() => {
        this.setState({notAuthenticated: `Here. Let me help you.`})
      }, 2500)
      setTimeout(() => {
        Router.push('/sign-in')
      }, 5000)
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }
  render () {
    if (!this.props.isAuthenticated) {
      return <h1>
        <style jsx global>{`
        h1 {
          height: calc(100vh - 58px);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
        {this.state.notAuthenticated}
      </h1>
    }
    return <Page {...this.props} />
  }
}

export default Page => defaultPage(securePageHoc(Page))
