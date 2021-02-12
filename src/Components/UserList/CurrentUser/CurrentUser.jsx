import React from 'react';
import '../CurrentUser/currentUser.scss';
import PropTypes from 'prop-types';

export const CurrentUser = ({
  name,
  description,
  language,
  html_url,
}) => {

  return (
    <div className="user">
      <div className="user__info">
        <a href={html_url} target="_blank" rel="noreferrer">
          <h3 className="user__title">{name}</h3>
        </a>
        <p>
          Language:
          {' '}
          {language || "No language selected"}
        </p>
        <p>
          Description:
          {' '}
          {description || "User has no description"}
        </p>
      </div>
    </div>
  );
}

CurrentUser.propTypes = {
  name: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  description: PropTypes.string,
  language: PropTypes.string,
}
