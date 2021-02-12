const MAIN_URL = 'https://api.github.com';

const request = (url) => {
  return fetch(`${MAIN_URL}${url}`, {
    headers: {
      "User-Agent": "search_github_users",
      Accept: "application/vnd.github.v3+json",
      authorization: "token 32e5e0a3afa5e3ac50e0c0acb6ca38136b9456da",
    }
  })
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