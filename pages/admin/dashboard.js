import React, { Component } from 'react'
import { Grid,
        Button,
        Dropdown
      } from 'semantic-ui-react'
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch'

import securePage from '../../hocs/securePage'

class Dashboard extends Component {
  static async getInitialProps () {
    const res = await fetch('https://stark-cliffs-87781.herokuapp.com/')
    const data = await res.json()

    const postTypes = data.posts.map((post) => {
      return post.type
    })
    .filter((type, index, self) => {
      return self.indexOf(type) === index
    })

    return {postTypes}
  }

  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      type: ''
    }
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
    console.log(this.state)
    // fetch('https://stark-cliffs-87781.herokuapp.com/', {
    //   method: 'post',
    //   body: JSON.stringify(this.state)
    // })
  }

  render () {
    return (
      <Grid celled='internally'>
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
        <input
          placeholder='Title'
          value={this.state.title}
          onChange={this.handleTitle.bind(this)} />
        <Dropdown
          placeholder='Post type'
          openOnFocus
          selection
          onChange={this.handleType.bind(this)}
          options={this.props.postTypes.map((type) => {
            return {
              key: type,
              value: type,
              text: type
            }
          })}
          value={this.state.type} />
        <Grid.Row style={{height: 'calc(80vh - 58px)'}}>
          <Grid.Column width='8' className='editor'>
            <textarea
              onChange={this.handleContent.bind(this)}
              value={this.state.content} />
            <Button
              floated='right'
              onClick={this.handleSubmit.bind(this)}
              color='teal'>
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
