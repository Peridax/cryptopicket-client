import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

import Home from './components/Home/Home'
import Watchlists from './components/Watchlist/Watchlists'
import CreateWatchlist from './components/Watchlist/CreateWatchlist'
import Watchlist from './components/Watchlist/Watchlist'
import UpdateWatchlist from './components/Watchlist/UpdateWatchlist'

import { verifyToken } from './api/auth'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      verifiedToken: false,
      msgAlerts: []
    }
  }

  setUser = user => {
    this.setState({ user })
    localStorage.setItem('User', JSON.stringify(user))
  }

  clearUser = () => {
    this.setState({ user: null })
    localStorage.clear()
  }

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  componentDidMount () {
    const userItem = localStorage.getItem('User')

    if (userItem) {
      verifyToken(JSON.parse(userItem))
        .then(res => this.setUser(res.data.user))
        .catch(localStorage.clear())
    }
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 99999999
        }} >
          {msgAlerts.map(msgAlert => (
            <AutoDismissAlert
              key={msgAlert.id}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
              id={msgAlert.id}
              deleteAlert={this.deleteAlert}
            />
          ))}
        </div>
        <main className="container pt-5">
          {/* Home Page */}
          <Route path="/" exact render={() => (
            <Fragment>
              <Home user={user} />
            </Fragment>
          )} />

          {/* User auth pages */}
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} user={user} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Watchlist routes */}
          <AuthenticatedRoute exact user={user} path='/watchlists' render={() => (
            <Watchlists msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/watchlists/create' render={() => (
            <CreateWatchlist msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/watchlist/:id' render={() => (
            <Watchlist user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute exact user={user} path='/watchlist/:id/update' render={() => (
            <UpdateWatchlist user={user} msgAlert={this.msgAlert} />
          )} />
        </main>

        <Footer user={user} />
      </Fragment>
    )
  }
}

export default App
