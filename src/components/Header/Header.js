import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import Session from '../../middleware/Session';
import { NavLink } from 'react-router-dom'


class Header extends Component {

  constructor(props) {
    super(props);

    let agency = Session.getSession();

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      agency: agency
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  logout() {
    Session.destroy();
    window.location.href = "/";
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
    let agency = this.state.agency;

    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>

        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
          <a className="navbar-brand" href="#"></a>
          <li className="nav-item px-3">
            <a className="nav-link" href="https://code.gov">return to code.gov</a>
          </li>
          <li className="nav-item px-3">
            <NavLink to={'/about'} className="nav-link">about</NavLink> 
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={agency && agency.logo_url} className="img-avatar" alt=""/>
                <span className="d-md-down-none">{ agency && agency.acronym }</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem onClick={this.logout.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item">
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
