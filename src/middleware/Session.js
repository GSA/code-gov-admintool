import { post } from './Networking.js';

const AGENCY_KEY = 'agency';
const TOKEN_KEY = 'token';

class Session {

  createSession(token, completion) {
    localStorage.setItem(TOKEN_KEY, token);

    post('http://localhost:3033/login-token', token, {}, function(err, data) {
      if (!err && data.agency) {
        localStorage.setItem(AGENCY_KEY, JSON.stringify(data.agency));
        completion(true);
      } else {
        completion(false);
      }
    });
  }

  updateSession(data) {
    localStorage.setItem(AGENCY_KEY, JSON.stringify(data));
  }

  getSession() {
    let storedItem = localStorage.getItem(AGENCY_KEY);
    if (storedItem) return JSON.parse(storedItem);
    return null
  }

  destroy() {
    localStorage.removeItem(AGENCY_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
}

export default new Session;
