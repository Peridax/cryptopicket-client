import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { fetchWatchlist } from '../../api/auth'

import Table from 'react-bootstrap/Table'
import './Watchlists.scss'

class Watchlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      watchlist: {},
      isMounted: false
    }
  }

  componentDidMount () {
    const { msgAlert, user, match: { params } } = this.props

    fetchWatchlist(params.id, user)
      .then(res => this.setState({ watchlist: res.data.watchlist, isMounted: true }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load watchlist',
          message: 'Failed to load watchlist with error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { watchlist, isMounted } = this.state

    const watchlistTable = coins => (
      <Table hover borderless style={{ marginBottom: 0 }}>
        <thead>
          <tr>
            <th>{watchlist.title}</th>
          </tr>
        </thead>
        <tbody>
          {coinsList}
        </tbody>
      </Table>
    )

    const coinsList = (
      <tr>
        <td>Coin</td>
      </tr>
    )

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

    const loaded = () => {
      if (watchlist.coins && watchlist.coins.length) {
        return watchlistTable(coinsList)
      } else {
        return (
          <Fragment>
            <h6 className="section-title">{watchlist.title}</h6>
            <p className="text-center mt-3 mb-0 p-3">This watchlist has no coins</p>
          </Fragment>
        )
      }
    }

    return (
      <div className="row">
        <div className="col-12">
          <Link to="/watchlists" className="text-white d-flex mb-2 mt-3" style={{ textDecoration: 'none', justifyContent: 'flex-end' }}>
            Return to watchlists
          </Link>
          <div className="box p-3">
            { isMounted ? loaded() : unloaded }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Watchlist)
