import React from 'react'
import Toast from 'react-bootstrap/Toast'

import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true
    }
    this.timeoutId = null
  }

  componentDidMount () {
    // this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  componentWillUnmount () {
    clearTimeout(this.timeoutId)
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { heading, message, deleteAlert, id, variant } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        deleteAlert(id)
      }, 300)
    }

    return (
      <Toast
        show={this.state.show}
        onClose={this.handleClose}
        delay={8000}
        animation
        autohide
      >
        <Toast.Header
          className={'bg-' + (variant || 'primary')}
        >
          <strong className="mr-auto">{heading}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    )
  }
}

export default AutoDismissAlert
