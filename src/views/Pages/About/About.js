import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import { post, resolveBackendUrl } from '../../../middleware/Networking.js';
import Session from '../../../middleware/Session';
import { NavLink } from 'react-router-dom'

class About extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container about">
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="float-right">
                  <NavLink to={'/login'} className="btn btn-primary btn-sm">Proceed to App</NavLink>
                </div>
                About | Code.gov Agency Admin Tool
              </div>
              <div className="card-block">
                <h4>1. Purpose</h4>
                <p>The Code.gov Agency Admin Tool was...</p>

                <h4>2. Getting Started</h4>
                <p>Every agency has its own login credentials.  If you do not have your agency credentials,
                please contact your agency Code.gov PoC or email us at <a href="mailto:team@code.gov">team@code.gov</a>.
                Once you have your login credentials, you can head to the tool <NavLink to={'/login'}>login page</NavLink>.</p>
                <p>After logging in, you will be redirected to the agency admin dashboard.  The dashboard contains useful information
                such as a high-level list of current repositories, the ability to create new repositories,
                and quick metrics about your agency. </p>
                <div className='center'>
                  <img className='test' src={'img/dashboard.png'} alt="Agency Dashboard"/>
                  <p><small>Agency Dashboard</small></p>
                </div>

                <h4>3. Editing Agency Details</h4>
                <p>The Code.gov Agency Admin Tool was...</p>
                <div className='center'>
                  <img className='test' src={'img/agency-edit.png'} alt="Edit Agency Page"/>
                  <p><small>Edit Agency Page</small></p>
                </div>


                <h4>4. Creating a New Repo</h4>
                <p>The Code.gov Agency Admin Tool was...</p>

                <h4>5. Editing Repos</h4>
                <p>The Code.gov Agency Admin Tool was...</p>
                <div className='center'>
                  <img className='test' src={'img/repo-edit.png'} alt="Edit Repo Page"/>
                  <p><small>Edit Repo Page</small></p>
                </div>

                <h4>6. Assistance and Updates</h4>
                <p>The Code.gov Agency Admin Tool was...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
