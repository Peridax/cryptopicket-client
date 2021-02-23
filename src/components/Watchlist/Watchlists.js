import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import './Watchlists.scss'
import { fetchWatchlists } from '../../api/auth'

class Watchlists extends Component {
  constructor (props) {
    super(props)
    this.state = {
      watchlists: [],
      isMounted: false
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    fetchWatchlists(user)
      .then(res => this.setState({ watchlists: res.data.watchlists, isMounted: true }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load watchlists',
          message: 'Failed to fetch all watchlists with error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { watchlists, isMounted } = this.state

    const watchlistsTable = watchlists => {
      return watchlists
    }

    const watchlistsList = (
      watchlists.map((watchlist, index) => (
        <div
          key={watchlist._id}
          className={'row align-items-center py-3 m-0' + (watchlists.length !== (index + 1) ? ' border-bottom' : '')}
        >
          <div className="col col-9 col-md-9 col-lg-10">
            <Link
              to={'/watchlist/' + watchlist._id}
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              {watchlist.title}
            </Link>
          </div>
          <div className="col-auto text-center col-3 col-md-3 col-lg-2">0</div>
        </div>
      ))
    )

    const loaded = () => {
      if (watchlists.length) {
        return watchlistsTable(watchlistsList)
      } else {
        return <p className="text-center m-3">No available watchlists</p>
      }
    }

    const unloaded = (
      <div className="text-center p-3">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )

    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <Link to="/watchlists/create" className="text-white" style={{ textDecoration: 'none' }}>
              <button type="button" className="btn btn-primary d-flex mb-2 mt-3 ml-auto">
                Create Watchlist
              </button>
            </Link>
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col col-9 col-md-9 col-lg-10">
                    Watchlists
                  </div>
                  <div className="col-auto text-center col-3 col-md-3 col-lg-2">
                    Coins
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                { isMounted ? loaded() : unloaded }
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Watchlists)
