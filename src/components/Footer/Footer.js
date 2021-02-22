import React from 'react'

import './Footer.scss'

const Footer = () => (
  <div className="footer py-5">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col">
          <p className="text-white-50 m-0">&#169; Evandro Rodrigues</p>
        </div>
        <div className="col-auto">
          <a
            href='https://github.com/Peridax/CryptoPicket-Client'
            rel='noopener noreferrer'
            target='_blank'
            className="text-white-50"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
