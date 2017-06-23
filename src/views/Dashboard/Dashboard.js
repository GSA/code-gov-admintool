import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';

const brandPrimary =  '#20a8d8';
const brandSuccess =  '#4dbd74';
const brandInfo =     '#63c2de';
const brandDanger =   '#f86c6b';

class Dashboard extends Component {

  constructor(props) {
    super(props);
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
          <div className={"card card-inverse card-" + box.color} >
            <div className="card-block pb-0">
              <h4 className="mb-0">{ box.metric }</h4>
              <p>{ box.title }</p>
            </div>
            <div className="chart-wrapper px-3">
            </div>
          </div>
        </div>
      );
    });

    let repos = [
      { name: 'Best Intern Repo', org: 'OFCIO', url: '#', contact: {name: 'Philip Bale', email: 'philip.j.bale@omb.eop.gov'} },
    ];

    for (var i = 0; i < 35; i++) repos.push(repos[0]);

    let _repoRows = repos.map(function(repo, key) {
      return (
        <tr key={key}>
          <td>
            <a href={ repo.url }>{ repo.name }</a>
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
