import React from 'react'
import Router from 'next/router'

import defaultPage from '../../hocs/defaultPage'
import { Form, Input, Button } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch'
import { setToken } from '../../utils/auth'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  handleUsername (e) {
    this.setState({username: e.target.value})
  }

  handlePassword (e) {
    this.setState({password: e.target.value})
  }

  async handleSubmit (e) {
    const user = {
      username: this.state.username,
      password: this.state.password
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
      Router.push('/')
    }
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field>
          <Input type='text'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleUsername.bind(this)} />
        </Form.Field>
        <Form.Field>
          <Input type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handlePassword.bind(this)} />
        </Form.Field>
        <p style={{color: 'red'}}>{this.state.error}</p>
        <Button>Submit</Button>

      </Form>
    )
  }
}

export default defaultPage(SignIn)
