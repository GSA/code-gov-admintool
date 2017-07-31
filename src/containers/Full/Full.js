import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import EditAgency from '../../views/Agency/EditAgency/'
import EditRepo from '../../views/Repos/EditRepo/'

import Session from '../../middleware/Session';
import { get, resolveBackendUrl } from '../../middleware/Networking';


class Full extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.loadRepos();
  }

  loadRepos() {
    let that = this;
    get(resolveBackendUrl('/agencies/repos'), Session.getToken(), function(err, data) {
      if (data) {
        that.setState({repos: data.repos});
      } 
    });
  }

  render() {
    const ProppedDashboard = (props) => {
      return (
        <Dashboard
          repos={this.state.repos}
          {...props}
        />
      );
    }

    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} repos={this.state.repos}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={ProppedDashboard}/>
                <Route path="/agency/edit/" name="EditAgency" component={EditAgency}/>
                <Route path="/repos/edit/:repoId" name="EditRepo" component={EditRepo}/>

                <Redirect from="/" to="/login"/>
              </Switch>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
