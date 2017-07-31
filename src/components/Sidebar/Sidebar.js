import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  render() {
    let repos = this.props.repos || [];
    let _repos = repos.map(function(repo, key) {
      return (
        <li className='nav-item' key={key}>
          <NavLink to={'/repos/edit/' + repo.id} className="nav-link" activeClassName="active">{repo.name}</NavLink>
        </li>
      );
    });

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/agency/edit'} className="nav-link" activeClassName="active"><i className="icon-settings"></i> Agency Settings</NavLink>
            </li>
            <li className="nav-title">
              Repositories
              { _repos }
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
