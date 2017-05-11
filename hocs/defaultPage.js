import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { getUserFromCookie, getUserFromLocalStorage } from '../utils/auth'

export default Page => class DefaultPage extends React.Component {
  static async getInitialProps (ctx) {
    const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req)
    const pageProps = Page.getInitialProps
                    ? await Page.getInitialProps(ctx)
                    : null
    return {
      ...pageProps,
      loggedUser,
      currentUrl: ctx.pathname,
      isAuthenticated: !!loggedUser
    }
  }

  constructor (props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout (eve) {
    if (eve.key === 'logout') {
      Router.push(`/?logout=${eve.newValue}`)
    }
  }

  componentDidMount () {
    window.addEventListener('storage', this.logout, false)
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.logout, false)
  }

  render () {
    const cssFiles = [
      '//unpkg.com/normalize.css@5.0.0/normalize.css',
      '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'
    ]
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {cssFiles.map((c, i) => <link key={i} href={c} rel='stylesheet' />)}
          <style jsx>
            {`
            * {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            }
            a {
              cursor: pointer;
            }
            `}
          </style>
          <title>Hank Andre</title>
        </Head>
        <Page {...this.props} />
      </div>
    )
  }
}
