import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state
    const { user } = this.props

    if (user && !email) {
      return <Redirect to="/" />
    }

    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 mt-3">
          <div className="card mt-3">
            <div className="card-header">
              Sign Up
            </div>
            <div className="card-body">
              <Form onSubmit={this.onSignUp}>
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
                <Form.Group controlId="passwordConfirmation">
                  <Form.Control
                    required
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  Sign Up
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
