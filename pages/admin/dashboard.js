import React, { Component } from 'react'
import { Grid,
        Button } from 'semantic-ui-react'
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch'

import securePage from '../../hocs/securePage'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
  }

  handleTitle (e) {
    this.setState({title: e.target.value})
  }

  handleContent (e) {
    this.setState({content: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state)
  }

  render () {
    return (
      <Grid celled='internally'>
        <style jsx global>{`
          img {
            max-width: 100%;
            display: block;
          }
          input,
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
        <input
          placeholder='Title'
          value={this.state.title}
          onChange={this.handleTitle.bind(this)} />
        <Grid.Row style={{height: 'calc(80vh - 58px)'}}>
          <Grid.Column width='8' className='editor'>
            <textarea
              onChange={this.handleContent.bind(this)}
              value={this.state.content} />
            <Button
              floated='right'
              onClick={this.handleSubmit.bind(this)}>
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column width='8'>
            <Markdown className='preview' source={this.state.content} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default securePage(Dashboard)
