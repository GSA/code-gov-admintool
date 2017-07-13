import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import Session from '../../middleware/Session';

const brandPrimary =  '#20a8d8';
const brandSuccess =  '#4dbd74';
const brandInfo =     '#63c2de';
const brandDanger =   '#f86c6b';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    let agency = Session.getSession();
    if (agency == null) { window.location.href = "/"; }
  }

  render() {

    let boxInfo = [{ metric: 25, title: 'Total Repositories', color: 'primary'},
      { metric: '25 Million', title: 'Lines of Code', color: 'info'},
      { metric: 300, title: 'Contributers', color: 'warning'},
      { metric: 1, title: 'Awesome Intern', color: 'danger'}
    ];

    let _boxes = boxInfo.map(function(box, key) {
      return (
        <div className="col-sm-6 col-lg-3" key={key}>
          <div className="card">
            <div className="card-block p-0 clearfix">
              <i className={"fa fa-bell p-4 font-2xl mr-3 float-left bg-" + box.color}></i>
              <div className={"h5 mb-0 pt-3 text-" + box.color}>{ box.metric }</div>
              <div className="text-muted text-uppercase font-weight-bold font-xs">{ box.title }</div>
            </div>
          </div>
        </div>
      );
    });

    let repos = [
      { name: 'Best Intern Repo', org: 'OFCIO', id: 1, contact: {name: 'Philip Bale', email: 'philip.j.bale@omb.eop.gov'} },
    ];

    for (var i = 0; i < 35; i++) repos.push(repos[0]);

    let _repoRows = repos.map(function(repo, key) {
      return (
        <tr key={key}>
          <td>
            <NavLink to={'/repos/edit/' + repo.id} className="" activeClassName="active">{ repo.name }</NavLink>
            <div className="small text-muted">{ repo.org }</div>
          </td>
          <td>
            <span className="badge badge-success">Active</span>
          </td>
          <td>
            <span className="badge badge-primary">Reusable</span> <br /><span className="badge badge-info">Open Source</span>
          </td>
          <td>
            <a href={ 'mailto:' + repo.contact.email }>{ repo.contact.name }</a>
            <div className="small text-muted">{ repo.contact.email }</div>
          </td>
          <td>
            10 seconds ago
          </td>
          <td>
            <button className='btn btn-primary btn-sm'>Edit Metadata</button>&nbsp; &nbsp;
            <button className='btn btn-danger btn-sm'>Delete</button>
          </td>
        </tr>
      );
    });

    return (
      <div className="animated fadeIn">
        <div className="row">
          { _boxes }
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="float-right">
                  <button type="button" className="btn btn-sm btn-success"><i className="fa fa-plus" ></i> Add New Repository
                  </button>
                </div>
                Current Repositories
              </div>
              <div className="card-block">
                <table className="table table-hover table-outline mb-0 hidden-sm-down">
                  <thead className="thead-default">
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Policy</th>
                      <th>POC</th>
                      <th>Last Edit</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                     { _repoRows }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
