import { post, resolveBackendUrl } from './Networking.js';

const AGENCY_KEY = 'agency';
const TOKEN_KEY = 'token';

class Session {

  createSession(token, completion) {
    localStorage.setItem(TOKEN_KEY, token);

    post(resolveBackendUrl('/login-token'), token, {}, function(err, data) {
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
    if (storedItem && storedItem.length > 0) return JSON.parse(storedItem);
    return null
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  destroy() {
    localStorage.removeItem(AGENCY_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
}

export default new Session;
