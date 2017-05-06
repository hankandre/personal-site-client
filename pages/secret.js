import React, { PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import securePage from '../hocs/securePage'

const Secret = ({ loggedUser }) => (
  <Container>
    Hi <strong>{loggedUser.email}</strong>. This is a super secure page! Try loading this page again using the incognito/private mode of your browser.
  </Container>
)

Secret.propTypes = {
  loggedUser: PropTypes.object.isRequired
}

export default securePage(Secret)
