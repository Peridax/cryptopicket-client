import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'
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
      return (
        <Table hover borderless style={{ marginBottom: 0 }}>
          <thead>
            <tr>
              <th style={{ width: '90%' }}>Watchlists</th>
              <th style={{ width: '10%' }} className="text-center">Coins</th>
            </tr>
          </thead>
          <tbody>
            {watchlists}
          </tbody>
        </Table>
      )
    }

    const watchlistsList = (
      watchlists.map(watchlist => (
        <tr key={watchlist._id}>
          <td>
            <Link
              to={'/watchlist/' + watchlist._id}
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              {watchlist.title}
            </Link>
          </td>
          <td className="text-center">0</td>
        </tr>
      ))
    )

    const loaded = () => {
      if (watchlists.length) {
        return watchlistsTable(watchlistsList)
      } else {
        return (
          <Fragment>
            <h6 className="section-title">Watchlists</h6>
            <p className="text-center mt-3 mb-0 p-3">No available watchlists</p>
          </Fragment>
        )
      }
    }

    const unloaded = (
      <Fragment>
        <h6 className="section-title">Watchlists</h6>
        <div className="text-center mt-3 mb-0 p-3">
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Fragment>
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
            <div className="box p-3">
              { isMounted ? loaded() : unloaded }
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Watchlists)
