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
                <p>The Code.gov Agency Admin Tool was created to allow agencies and their components to manage their software repositories.  Previously, agencies needed to manually fill out various JSON documents to catalog their software.  With the new Agency Admin Tool, all data is stored in the cloud and access to repository management can be both shared and distributed.  Furthermore, automatic schema changes and improvements can be handled behind the scenes.</p>

                <h4>2. Getting Started</h4>
                <p>Every agency has its own login credentials.  If you do not have your agency credentials,
                please contact your agency Code.gov PoC or email us at <a href="mailto:team@code.gov">team@code.gov</a>.
                Once you have your login credentials, you can head to the tool <NavLink to={'/login'}>login page</NavLink>.</p>
                <p>After logging in, you will be redirected to the agency admin dashboard.  The dashboard contains useful information such as a high-level list of current repositories, the ability to create new repositories, and quick metrics about your agency. </p>
                <div className='center'>
                  <img className='test' src={'img/dashboard.png'} alt="Agency Dashboard"/>
                  <p><small>Agency Dashboard</small></p>
                </div>

                <h4>3. Editing Agency Details</h4>
                <p>Each agency has various informational details that may change over time, such as description, contact, homepage, etc.  While these details are not always relevant to individual repositories, they are helpful in information organization and point of contact discovery.</p>
                <p>To update information:
                  <ol>
                    <li>Edit any fields you would like</li>
                    <li>Press the green save button at the top right of the edit panel</li>
                  </ol>
                </p>

                <div className='center'>
                  <img className='test' src={'img/agency-edit.png'} alt="Edit Agency Page"/>
                  <p><small>Edit Agency Page</small></p>
                </div>

                <h4>4. Creating a New Repo</h4>
                <p>The "Add New Repository" button can be found on the dashboard page at the top right of the repository listing panel.  Once this button is clicked, a new repository will be created and you will be redirected to the edit agecy page.  To make any changes, please follow the instructions below.</p>

                <h4>5. Editing Repos</h4>
                <p>Each repository is individually editable in the Agency Admin Tool.  Users can only edit repositories in their organization.  You may select a repository via either the left side bar or the dashboard repository list.</p>

                <p><strong>To add a tag or language:</strong>
                  <ol>
                    <li>Type in the input box</li>
                    <li>Press the enter or tab button</li>
                    <li>Repeat or press save</li>
                  </ol>
                </p>

                <p><strong>To update information:</strong>
                  <ol>
                    <li>Edit any fields you would like</li>
                    <li>Press the green save button at the top right of the edit panel</li>
                  </ol>
                </p>
                <div className='center'>
                  <img className='test' src={'img/repo-edit.png'} alt="Edit Repo Page"/>
                  <p><small>Edit Repo Page</small></p>
                </div>

                <h4>6. Assistance and Updates</h4>
                <p>The Code.gov team is happy to assist in setting up your agency or component on the Agency Admin Tool.  If you have not used the platform before, you will need to contact us for your credentials.  We are constantly working to update and improve the Agency Admin Tool.  Any comments, questions, or suggestions may be sent to <a href='mailto:team@code.gov'>team@code.gov</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
