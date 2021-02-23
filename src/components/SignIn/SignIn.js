import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state
    const { user } = this.props

    if (user && !email) {
      return <Redirect to="/" />
    }

    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 mt-3">
          <div className="card mt-3">
            <div className="card-header">
              Sign In
            </div>
            <div className="card-body">
              <Form onSubmit={this.onSignIn}>
                <Form.Group controlId="email">
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    required
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  Sign In
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
