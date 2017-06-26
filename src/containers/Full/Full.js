import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import EditAgency from '../../views/Agency/EditAgency/'
import EditRepo from '../../views/Repos/EditRepo/'

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/agency/edit/" name="EditAgency" component={EditAgency}/>
                <Route path="/repos/edit/:repoId" name="EditRepo" component={EditRepo}/>
                 
                <Redirect from="/" to="/dashboard"/>
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
