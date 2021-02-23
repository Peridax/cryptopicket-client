import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center p-4 my-3 text-white-50 bg-primary rounded shadow-sm">
              <div className="lh-100">
                <h5 className="text-white lh-100 mb-1">CryptoPicket</h5>
                <p className="m-0">A cryptocurrency market analysis tool to assist users in analyizing the market</p>
              </div>
            </div>

            <div className="card text-white mt-3">
              <div className="card-header">
                Crypto Coins
              </div>
              <div className="card-body">
                <p className="text-center m-2">No available coins</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Home)
