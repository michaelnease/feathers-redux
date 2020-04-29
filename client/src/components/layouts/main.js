import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

export const WithHeader = ({ children }) => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <Link to="/">
          <img className="header-logo" src="images/logo.svg" alt="Beyond Limits" />
        </Link>
      </header>
      <main className="dashboard__main">
        <div className="dashboard__inner ui-card">{children}</div>
      </main>
    </div>
  );
};

export const WithHeaderSidebar = ({ children, initialSidebarState }) => {
  const [isOpen, setIsOpen] = useState(initialSidebarState);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <button className="hamburger-menu" onClick={handleToggleSidebar}>
          <i className="fe fe-menu" />
        </button>
        <Link to="/">
          <img className="header-logo" src="images/logo.svg" alt="Beyond Limits" />
        </Link>
      </header>

      <nav className={`dashboard__nav ${!isOpen ? 'nav--closed' : ''}`}>
        <ul className="dashboard__main-nav">
          <li>
            <Link to="/historical-data">
              <i className="fe fe-anchor" />
              Historical Data
            </Link>
          </li>
          <li>
            <Link to="/create-new-project">
              <i className="fe fe-anchor" />
              Create New Project
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <i className="fe fe-anchor" />
              Projects
            </Link>
          </li>
          <li>
            <Link to="/worksheets">
              <i className="fe fe-anchor" />
              Worksheets
            </Link>
          </li>
          <li>
            <Link to="/archive">
              <i className="fe fe-anchor" />
              Archive
            </Link>
          </li>
        </ul>
      </nav>
      <main className="dashboard__main">
        <div className="dashboard__inner">{children}</div>
      </main>
    </div>
  );
};
