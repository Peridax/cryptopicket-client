import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { fetchWatchlist, deleteWatchlist } from '../../api/auth'

import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'

import './Watchlists.scss'
import './Watchlist.scss'

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

  handleDelete = () => {
    const { watchlist } = this.state
    const { user, msgAlert, history } = this.props

    deleteWatchlist(watchlist._id, user)
      .then(() => {
        msgAlert({
          heading: 'Successfully deleted watchlist',
          message: 'You have successfully deleted your watchlist.',
          variant: 'success'
        })
      })
      .then(() => history.push('/watchlists'))
      .catch(error => {
        msgAlert({
          heading: 'Failed to delete watchlist',
          message: 'You have failed to delete your watchlist with error: ' + error.message,
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
        <div className="card-header">
          Watchlists
        </div>
        <div className="card-body">
          <div className="text-center mt-3">
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
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
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  {watchlist.title}
                </div>
                <div className="col-auto">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="transparent"
                      id="dropdown-basic"
                      size="sm"
                      className="action-btn"
                    >
                      Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href={'#/watchlist/' + watchlist._id + '/update'}>Update</Dropdown.Item>
                      <Dropdown.Item onClick={this.handleDelete} className="text-danger">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="text-center mt-3">This watchlist has no coins</p>
            </div>
          </Fragment>
        )
      }
    }

    return (
      <div className="row">
        <div className="col-12">
          <Link to="/watchlists" className="text-white d-flex mb-2 mt-3" style={{ textDecoration: 'none', justifyContent: 'flex-end', lineHeight: '38px' }}>
            Return to watchlists
          </Link>
          <div className="card">
            { isMounted ? loaded() : unloaded }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Watchlist)
