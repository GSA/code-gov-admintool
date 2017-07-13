import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import { post } from '../../../middleware/Networking.js';
import Session from '../../../middleware/Session';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  attemptLogin() {
    let that = this;
    post('http://localhost:3033/token', null, {email: this.state.email, password: this.state.password}, function(err, data) { 
      if (!err) {
        Session.createSession(data.token, function(success) {
          if (success) that.props.history.push('/dashboard');
        })
      }
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">
                    <h1>Agency Login</h1>
                    <p className="text-muted">Sign in using your shared agency account</p>
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" value={this.state.email} placeholder="Email" name="email" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" value={this.state.password} placeholder="Password" name="password" onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="button" className="btn btn-primary px-4" onClick={ this.attemptLogin.bind(this) } >Login</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <div className="card-block text-center">
                    <div>
                      <h2>No Account?  <br />Forgot Password?</h2>
                      <p>Access is granted by the <strong><a href='http://Code.gov' style={{color: 'white'}}>Code.gov team</a></strong>.  Reach out to us for your agency access! </p>
                      <button type="button" className="btn btn-primary active mt-3">Contact Code.gov</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
