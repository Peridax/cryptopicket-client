import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => msgAlert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Failed to change password',
          message: messages.changePasswordFailure + ': ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 mt-3">
          <div className="card mt-3">
            <div className="card-header">
              Change Password
            </div>
            <div className="card-body">
              <Form onSubmit={this.onChangePassword}>
                <Form.Group controlId="oldPassword">
                  <Form.Control
                    required
                    name="oldPassword"
                    value={oldPassword}
                    type="password"
                    placeholder="Old Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Control
                    required
                    name="newPassword"
                    value={newPassword}
                    type="password"
                    placeholder="New Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  Change Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
