import apiUrl from '../apiConfig'
import axios from 'axios'

/* User Auth */

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

/* Watchlist */

export const createWatchlist = (watchlist, user) => {
  return axios({
    url: apiUrl + '/watchlists',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      watchlist: {
        title: watchlist.title
      }
    }
  })
}

export const fetchWatchlists = user => {
  return axios({
    url: apiUrl + '/watchlists',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  })
}

export const fetchWatchlist = (id, user) => {
  return axios({
    url: apiUrl + '/watchlist/' + id,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  })
}
