const MAIN_URL = 'https://api.github.com';

const request = (url) => {
  return fetch(`${MAIN_URL}${url}`)
  .then(response => {
    if (response.ok) {

      return response.json();
    }

    // eslint-disable-next-line no-throw-literal
    throw `${response.status} - ${response.statusText}`
  });
};

export function getUserRepo(user) {
  return request(`/users/${user}/repos`);
}