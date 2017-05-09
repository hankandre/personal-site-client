import React, { Component } from 'react'
import { Grid,
        Button,
        Dropdown
      } from 'semantic-ui-react'
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch'

import securePage from '../../hocs/securePage'

class Dashboard extends Component {
  // static async getInitialProps () {
  //   const res = await fetch('https://stark-cliffs-87781.herokuapp.com/')
  //   const data = await res.json()

  //   const postTypes = data.posts.map((post) => {
  //     return post.type
  //   })
  //   .filter((type, index, self) => {
  //     return self.indexOf(type) === index
  //   })

  //   return {postTypes}
  // }

  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      type: ''
    }
    this.emptyState = Object.assign({}, this.state)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleContent = this.handleContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleType = this.handleType.bind(this)
  }

  handleTitle (e) {
    this.setState({title: e.target.value})
  }

  handleContent (e) {
    this.setState({content: e.target.value})
  }

  handleType (e, {value}) {
    this.setState({type: value})
  }

  async handleSubmit (e) {
    e.preventDefault()
    const token = window.localStorage.getItem('hankToken')
    const res = await fetch('https://stark-cliffs-87781.herokuapp.com/', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(this.state)
    })
    this.state = res.status === 200 ? this.emptyState : this.state
  }

  render () {
    const { content } = this.state
    return (
      <Grid celled='internally'>
        <input
          placeholder='Title'
          value={this.state.title}
          onChange={this.handleTitle} />
        <Dropdown
          placeholder='Post type'
          openOnFocus
          selection
          divider
          onChange={this.handleType}
          options={[
            {
              key: Math.random(),
              value: 'Post',
              text: 'Post'
            }
          ]}
          value={this.state.type} />
        <Grid.Row style={{height: 'calc(80vh - 58px)'}}>
          <Grid.Column
            width='8'
            className='editor'>
            <textarea
              onChange={this.handleContent}
              value={content} />
            <Button
              floated='right'
              onClick={this.handleSubmit}
              color='teal'>
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column width='8'>
            <Markdown
              className='preview'
              source={content} />
          </Grid.Column>
        </Grid.Row>
        <style jsx global>{`
          img {
            max-width: 100%;
            display: block;
          }
          .ui.input,
          textarea,
          .preview {
            width: 100%;
          }
          
          textarea,
          .preview {
            height: 100%;
          }
          input {
            font-size: 2.6em;
            font-weight: 500;
          }

        `}</style>
      </Grid>
    )
  }
}

export default securePage(Dashboard)
