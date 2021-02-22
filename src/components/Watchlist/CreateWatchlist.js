import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { createWatchlist } from '../../api/auth'

class CreateWatchlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateWatchlist = event => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props

    createWatchlist(this.state, user)
      .then(res => {
        msgAlert({
          heading: 'Successfully created watchlist',
          message: 'The watchlist ' + res.data.watchlist.title + ' has been created',
          variant: 'success'
        })
      })
      .then(history.push('/watchlists'))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create watchlist',
          message: 'Failed to create watchlist with error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title } = this.state

    return (
      <Fragment>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-5 col-lg-6 mt-3">
            <div className="box p-3">
              <h6 className="border-bottom pb-2">Create Watchlist</h6>
              <form className="mt-3" onSubmit={this.onCreateWatchlist}>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="title"
                    value={title}
                    className="form-control"
                    placeholder="Watchlist Title"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Create Watchlist
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(CreateWatchlist)
