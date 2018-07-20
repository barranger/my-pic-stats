import {getAccessToken} from 'services/Firebase';
import Instagram from '../services/Instagram';
import { saveToken } from '../services/Firebase';
let _token = null;

const DB = {
  isLoaded: false,

  init(page, cb) {

    if(Instagram.getStats()) {
      cb(Instagram.getUser());
      return;
    }
    let u = window.location.href;

    _token =
      u.indexOf("#access_token=") === -1
        ? null
        : u.substring(u.indexOf("#access_token=") + 14);

      if(!_token) {
        getAccessToken(token => {
          if(!token) {
            Instagram.getAccessToken(page);
          }
          else {
            Instagram.retrieveStats(token, cb);          
          }
        });
      } else {
        saveToken(_token)
      }
  },

  

  //This needs to move to Instagram.js
  getToken() {
    return _token;
  }
};

export default DB;