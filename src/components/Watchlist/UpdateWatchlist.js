import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { fetchWatchlist, updateWatchlist } from './../../api/auth'

class UpdateWatchlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentDidMount () {
    const { user, msgAlert, match: { params } } = this.props

    fetchWatchlist(params.id, user)
      .then(res => this.setState({ title: res.data.watchlist.title }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to fetch watchlist',
          message: 'There was a problem fetching the watchlist you\'re trying to update with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  updateWatchlist = event => {
    event.preventDefault()

    const { user, msgAlert, history, match: { params } } = this.props

    updateWatchlist(params.id, this.state.title, user)
      .then(res => {
        console.log(res)
        msgAlert({
          heading: 'Successfully updated watchlist',
          message: 'The watchlist has been successfully updated to ' + this.state.title,
          variant: 'success'
        })
      })
      .then(() => history.push('/watchlist/' + params.id))
      .catch(error => {
        msgAlert({
          heading: 'Failed to update watchlist',
          message: 'Failed to update watchlist with error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title } = this.state

    return (
      <Fragment>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-lg-6 mt-3">
            <div className="card mt-3">
              <div className="card-header">
                Update Watchlist
              </div>
              <div className="card-body">
                <form onSubmit={this.updateWatchlist}>
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
        </div>
      </Fragment>
    )
  }
}

export default withRouter(UpdateWatchlist)
