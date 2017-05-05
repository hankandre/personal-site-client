import React from 'react'
import Router from 'next/router'
import { unsetToken } from '../../utils/auth'

export default class SignOff extends React.Component {
  componentDidMount () {
    unsetToken()
    Router.push('/')
  }
  render () {
    return null
  }
}
