import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'https://cei.org/sites/default/files/OMB-Logo.png'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="d-md-down-none">OMB</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>

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
