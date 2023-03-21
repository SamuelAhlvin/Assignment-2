import React from "react";
import { Link } from 'react-router-dom';
import '/src/App.css'


export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient navbar-dark fixed-top">
      <div className="container-fluid">
        <Link to={'/'}>
          <a className="navbar-brand" href="#">
            <span className="logo" id="logo-link">Feature Flicks</span>
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to={'/'}>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#" id="start-link">Start</a>
              </li>
            </Link>
            <Link to={'/screenings/'}>
              <li className="nav-item">
                <a className="nav-link" href="#" id="screenings">Screenings</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>)
}