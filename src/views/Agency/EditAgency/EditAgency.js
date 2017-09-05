import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import Session from '../../../middleware/Session';
import { post, resolveBackendUrl } from '../../../middleware/Networking';


class EditAgency extends Component {
  constructor(props) {
    super(props);

    let agency = Session.getSession();
    if (agency == null) { window.location.href = "/"; }

    this.state = {
      agency: agency,
      updateVars: agency
    };
  }

  handleChange(e) {
    let updateVars = this.state.updateVars;
    updateVars[e.target.name] = e.target.value;
    this.setState(updateVars: updateVars);
  }

  save() {
    let that = this;
    post(resolveBackendUrl('/agencies/update'), Session.getToken(), this.state.updateVars, function(err, data) {
      Session.updateSession(data.agency);
      window.location.reload();
    });
  }

  render() {
    let agency = this.state.agency;

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <button onClick={this.save.bind(this)} type="submit" className="btn btn-sm btn-success" style={{float: 'right'}}><i className="fa fa-dot-circle-o"></i> Save</button>
                <strong>{ agency.acronym }</strong> <small>ID #{ agency.id }</small>
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Agency Name</label>
                    <input type="text" className="form-control" placeholder="ex. Office of Management and Budget" defaultValue={agency.name} name='name' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Agency Acronym</label>
                    <input type="text" className="form-control" placeholder="ex. OMB" defaultValue={agency.acronym} name='acronym' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Agency Icon Link</label>
                    <input type="text" className="form-control" placeholder="ex. https://cei.org/sites/default/files/OMB-Logo.png" defaultValue={agency.logo_url} name='logo_url' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>


                <div className="form-group">
                  <label>Description</label>
                  <textarea rows='3' type="text" className="form-control" placeholder="ex. The Office of Management and Budget (OMB) serves the President of the United States in overseeing the implementation of his vision across the Executive Branch."
                    defaultValue={agency.description} name='description' onChange={this.handleChange.bind(this)} />
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Contact Name</label>
                    <input type="text" className="form-control" placeholder="ex. Philip Bale" defaultValue={agency.contact_name} name='contact_name' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Email</label>
                    <input type="text" className="form-control" placeholder="ex. team@code.gov" defaultValue={agency.contact_email} name='contact_email' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Phone</label>
                    <input type="text" className="form-control" placeholder="ex. (123) 456-7890" defaultValue={agency.contact_phone} name='contact_phone' onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://twitter.com/@codedotgov" defaultValue={agency.contact_url} name='contact_url' onChange={this.handleChange.bind(this)}/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>20% Measurement</label>
                    <select className="form-control" defaultValue={agency.measurement_type_method} name="measurement_type_method" onChange={this.handleChange.bind(this)}>
                      <option value="linesOfCode">Source lines of code</option>
                      <option value="modules">Number of self-contained modules</option>
                      <option value="cost">Cost of software development</option>
                      <option value="projects">Number of software projects</option>
                      <option value="systems">System certification and accreditation boundaries</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {
                    this.state.updateVars.measurement_type_method === 'other' ?
                      <div className="form-group col-sm-4">
                        <label>Other measurement description</label>
                        <input type="text" className="form-control" placeholder="ex. Number of hours worked on the project" defaultValue={agency.measurement_type_if_other} name='measurement_type_if_other' onChange={this.handleChange.bind(this)}/>
                      </div> :
                      null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditAgency;
