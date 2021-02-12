import React from 'react';
import { CurrentUser } from '../CurrentUser/CurrentUser';
import { Loader } from '../Loader/Loader';
import PropTypes from 'prop-types';

export const UserList = ({ repos }) => (
  <>
    {repos.length === 0 ? (
      <Loader />
      ) : (
      <>
        {repos.map(repo => (
          <CurrentUser key={repo.id} {...repo} />
        ))}
      </>
    )
    }
  </>
);

UserList.propTypes = {
  repos: PropTypes.array.isRequired,
}
