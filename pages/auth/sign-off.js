import React from 'react'

import { unsetToken } from '../../utils/auth'

export default class SignOff extends React.Component {
  componentDidMount () {
    unsetToken()
  }
  render () {
    return null
  }
}
