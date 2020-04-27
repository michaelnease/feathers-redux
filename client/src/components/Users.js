import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/userActions';

const Users = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <p>all users</p>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
