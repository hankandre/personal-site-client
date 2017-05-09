import React from 'react'
import Router from 'next/router'

import { Form, Input, Button, Icon } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import { setToken } from '../utils/auth'
import defaultPage from '../hocs/defaultPage'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: '',
      lock: 'lock'
    }
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
  }

  static getInitialProps () {
    return {}
  }

  handleUsername (e) {
    this.setState({username: e.target.value})
  }

  handlePassword (e) {
    this.setState({password: e.target.value})
  }

  async handleSubmit (e) {
    const { username, password } = this.state
    const user = {
      username,
      password
    }
    e.preventDefault()
    const res = await fetch('https://mighty-sierra-41096.herokuapp.com/', {
      method: 'post',
      body: JSON.stringify(user)
    })
    const data = await res.json()
    if (!data.token && !data.error) {
      this.setState({error: 'Uh oh, Jim.'})
    } else if (!data.token && data.error) {
      this.setState({error: data.error})
    } else {
      setToken(data)
      this.setState({lock: 'unlock'})
      setTimeout(() => {
        Router.push('/admin/dashboard')
      }, 300)
    }
  }

  render () {
    const { error,
      username,
      password,
      lock } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <style jsx global>{`
          form {
            display: flex;
            height: calc(100vh - 58px);
            width: 100%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          input {
            width: 250px;
          }
        `}</style>
        <Form.Field>
          <Input type='text'
            placeholder='Username'
            value={username}
            icon='user'
            onChange={this.handleUsername} />
        </Form.Field>
        <Form.Field>
          <Input type='password'
            placeholder='Password'
            value={password}
            icon='lock'
            onChange={this.handlePassword} />
        </Form.Field>
        <p style={{color: 'red'}}>{error}</p>
        <Button>
          <Icon name={lock} />
          Submit
        </Button>

      </Form>
    )
  }
}

export default defaultPage(SignIn)
