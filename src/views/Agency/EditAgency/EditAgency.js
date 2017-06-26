import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { WithContext as ReactTags } from 'react-tag-input';

class EditAgency extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <button type="submit" className="btn btn-sm btn-success" style={{float: 'right'}}><i className="fa fa-dot-circle-o"></i> Save</button>
                <strong>{ 'OMB' }</strong> <small>ID #{ this.props.match.params.repoId }</small>
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Agency Name</label>
                    <input type="text" className="form-control" placeholder="ex. Office of Management and Budget"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Agency Acronym</label>
                    <input type="text" className="form-control" placeholder="ex. OMB"/>
                  </div> 
                </div>


                <div className="form-group">
                  <label>Description</label>
                  <textarea rows='3' type="text" className="form-control" placeholder="ex. The Office of Management and Budget (OMB) serves the President of the United States in overseeing the implementation of his vision across the Executive Branch."/>
                </div>

                <div className="row">
                  <div className="form-group col-sm-3">
                    <label>Contact Name</label>
                    <input type="text" className="form-control" placeholder="ex. Philip Bale"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Email</label>
                    <input type="text" className="form-control" placeholder="ex. team@code.gov"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact Phone</label>
                    <input type="text" className="form-control" placeholder="ex. (123) 456-7890"/>
                  </div>
                  <div className="form-group col-sm-3">
                    <label>Contact URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://twitter.com/@codedotgov"/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-4">
                    <label>Source Code Main URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://github.com/presidential-innovation-fellows/"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label>Homepage URL</label>
                    <input type="text" className="form-control" placeholder="ex. https://code.gov"/>
                  </div>
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
