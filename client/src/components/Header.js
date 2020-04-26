import React from 'react';
import { connect } from 'react-redux';
import { boot } from '../actions/metaActions';

const Header = ({ boot, site }) => {
  const handleButtonClick = () => {
    boot('FPT');
  };

  return (
    <header>
      <p>Header {site}</p>
      <button onClick={handleButtonClick}>Click</button>
    </header>
  );
};

const mapStateToProps = ({ meta }) => ({
  site: meta.site,
});

const mapDispatchToProps = {
  boot,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
