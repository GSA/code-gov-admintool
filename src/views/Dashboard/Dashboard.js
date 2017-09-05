import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import Session from '../../middleware/Session';
import { get, post, resolveBackendUrl } from '../../middleware/Networking';
import javascriptTimeAgo from 'javascript-time-ago'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';

javascriptTimeAgo.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')

const timeAgoEnglish = new javascriptTimeAgo('en-US')

const brandPrimary =  '#20a8d8';
const brandSuccess =  '#4dbd74';
const brandInfo =     '#63c2de';
const brandDanger =   '#f86c6b';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    let agency = Session.getSession();
    if (agency == null) { window.location.href = "/"; }
    this.state = {
      agency: agency
    }
  }

  componentDidMount() {
    $("#my-file").change(() => this.uploadJson());
  }

  addRepo() {
    post(resolveBackendUrl('/repos/add'), Session.getToken(), null, function(err, data) {
      window.location = '/#/repos/edit/' + data.repo.id;
    });
  }

  deleteRepo = (id) => {
    confirmAlert({
      title: 'Please Confirm',
      message: 'Are you sure to delete this repo?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => post(resolveBackendUrl('/repos/delete'), Session.getToken(), {id: id}, function(err, data) {
        window.location.reload();
      }),
      onCancel: () => console.log('Delete cancelled'),
    })
  };

  uploadJson() {
    let file = $('#my-file').prop('files')[0];

    if (file) {
      let fr = new FileReader();
      fr.onload = () => {
        let jsonObject = JSON.parse(fr.result);
        console.log(jsonObject);

        post(resolveBackendUrl('/repos/add-json'), Session.getToken(), {codeJson: JSON.stringify(jsonObject)}, function(err, data) {
          console.log("Org Count: " + data.orgCount);
          window.location.reload();
        });
      }

      fr.readAsText(file);
    }
  }

  render() {
    let agency = this.state.agency;

    let repoCount = this.props.repos ? this.props.repos.length : 0;
    let reusableCount = this.props.repos ? this.props.repos.filter((repo) => repo.reusable).length : 0;
    let openSourceCount = this.props.repos ? this.props.repos.filter((repo) => repo.open_source).length : 0;
    let percentOpenSource = (parseFloat(openSourceCount) / parseFloat(repoCount) * 100).toFixed(2)

    let boxInfo = [{ metric: repoCount, title: 'Total Repositories', color: 'primary'},
      { metric: reusableCount, title: 'Reusable Repos', color: 'info'},
      { metric: openSourceCount, title: 'Open Source Repos', color: 'info'},
      { metric: percentOpenSource + '%', title: 'Open Source', color: 'danger'}
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

    let repos = this.props.repos || [];

    let that = this;
    let _repoRows = repos.map(function(repo, key) {
      return (
        <tr key={key}>
          <td>
            <NavLink to={'/repos/edit/' + repo.id} className="" activeClassName="active">{ repo.name }</NavLink>
            <div className="small text-muted">{ repo.organization }</div>
          </td>
          <td>
            <span className="badge badge-success">Active</span>
          </td>
          <td>
            { repo.reusable ? <span className="badge badge-primary">Reusable</span> : ''}
            { repo.reusable ? <br /> : '' }
            { repo.open_source ? <span className="badge badge-info">Open Source</span> : ''}
          </td>
          <td>
            <a href={ 'mailto:' + repo.contact_email }>{ repo.contact_name }</a>
            <div className="small text-muted">{ repo.contact_email }</div>
          </td>
          <td>
            { timeAgoEnglish.format(new Date(repo.updatedAt)) }
          </td>
          <td>
            <NavLink to={'/repos/edit/' + repo.id} className="btn btn-primary btn-sm">Edit Metadata</NavLink>&nbsp; &nbsp;
            <button className='btn btn-danger btn-sm' onClick={that.deleteRepo.bind(this, repo.id)}>Delete</button>
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
                  <input type="file" name="my_file" id="my-file" accept='.json' style={{display: 'none'}} />
                  <button type="button" onClick={()=> $('#my-file').click()} className="btn btn-sm btn-primary"><i className="fa fa-plus" ></i> Import from Code.json
                  </button>&nbsp;&nbsp;&nbsp;
                  <button type="button" className="btn btn-sm btn-success" onClick={this.addRepo.bind(this)}><i className="fa fa-plus" ></i> Add New Repository
                  </button>&nbsp;&nbsp;&nbsp;
                  <a role="button" href={resolveBackendUrl('/repos')} className="btn btn-sm btn-light">
                    <i className="fa fa-download" ></i> Export to Code.json
                  </a>
                </div>
                Current {agency.acronym} Repositories
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
