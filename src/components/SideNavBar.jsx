import React from 'react';
import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../services/SideMenuData';

class SideNavBar extends React.Component {
  state = {
    sideBar: false,
  };

  showSidebar = () => {
    let sideBar = !this.state.sideBar;
    this.setState({ sideBar });
  };
  render() {
    const { sideBar } = this.state;
    return (
      <>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={this.showSidebar} />
          </Link>
        </div>
        <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={this.showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" style={{ textDecoration: 'none' }}>
                <FaIcons.FaBars /> <span>MERIT</span>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  }
}

export default SideNavBar;
