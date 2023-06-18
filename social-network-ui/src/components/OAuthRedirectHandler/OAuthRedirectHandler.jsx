import React from 'react';
import { redirect } from 'react-router-dom';

import { TOKEN } from '../../util/constants';

const getUrlParameter = (name) => {
  name = name.replace(/\[\]/, '\\[').replace(/\[\]/, '\\[]');
  let regex = new RegExp('[?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const OAuthRedirectHandler = () => {
  const token = getUrlParameter('token');

  if (token) {
    localStorage.setItem(TOKEN, token);
  }

  return redirect('/');
};

export default OAuthRedirectHandler;
