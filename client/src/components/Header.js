import React from 'react';
import { connect } from 'react-redux';

const Header = ({ site }) => {
  return (
    <header>
      <p>Header {site}</p>
    </header>
  );
};

const mapStateToProps = ({ meta }) => ({
  site: meta.site,
});

export default connect(mapStateToProps)(Header);
