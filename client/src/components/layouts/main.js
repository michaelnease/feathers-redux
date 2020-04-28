import React from 'react';

export const With_Header = ({ children }) => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <a href="https://www.beyond.ai/">
          <img className="header-logo" src="images/logo.svg" alt="Beyond Limits" />
        </a>
      </header>
      <main className="dashboard__main">
        <div className="dashboard__inner ui-card">{children}</div>
      </main>
    </div>
  );
};

export const With_Header_Sidebar = ({ children }) => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <button className="hamburger-menu">
          <i className="fe fe-menu" />
        </button>
        <a href="https://www.beyond.ai/">
          <img className="header-logo" src="images/logo.svg" alt="Beyond Limits" />
        </a>
      </header>

      {/* <nav className={`dashboard__nav ${!isNavOpen ? 'nav--closed' : ''}`}> */}
      <nav className="dashboard__nav">
        <ul className="dashboard__main-nav">
          <li>
            <p>Top Link</p>
          </li>
          <li>
            <p>Middle Link</p>
          </li>
          <li>
            <p>Bottom Link</p>
          </li>
        </ul>
      </nav>
      <main className="dashboard__main">
        <div className="dashboard__inner ui-card">{children}</div>
      </main>
    </div>
  );
};
