import React, { PropTypes } from 'react'
import Link from 'next/link'
import { Container } from 'semantic-ui-react'
import defaultPage from '../hocs/defaultPage'

const SuperSecretDiv = () => (
  <b>
    This is a super secret div.
  </b>
)

const Index = ({ isAuthenticated }) => (
  <div>
    {isAuthenticated && <SuperSecretDiv />}
    <Container>
      <h4>Hello, friend!</h4>
      <p>
        This is a super simple example of how to use  together.
      </p>
      {!isAuthenticated && (
        <p>
          You're not authenticated yet. Maybe you want to and see what happens?
        </p>
      )}
      {isAuthenticated && (
        <p>
          Now that you're authenticated, maybe you should try going to our!
        </p>
      )}
    </Container>
  </div>
)

Index.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default defaultPage(Index)
