import DB from "db/DB";
import {saveToken, saveStats} from 'services/Firebase';

let _token = null;
let _user = null;
let _stats = null;

const Instagram = {
  getMyMedia(cb) {
    fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + DB.getToken() )
      .then( res => {return res.json()})
      .then( data => { cb(data)})
  },

  getCommentsForMedia(id, cb) {
    fetch('https://api.instagram.com/v1/media/' + id + '/comments?access_token=' + DB.getToken() )
      .then( res => {return res.json()})
      .then( data => { cb(data)})
  },

  getAccessToken(page, cb) {
    if (!_token) {
      const redirect = process.env.PUBLIC_URL ? 'https://barranger.github.io/my-pic-stats/' : 'http://localhost:3000/'
      window.location =
        "https://api.instagram.com/oauth/authorize/?client_id=f19cd80176bc4c62bb756838627ac944&redirect_uri=" + redirect + page + "&response_type=token";
    } else {
      saveToken(_token);
      this.retrieveStats(_token, cb);
    }
  },

  retrieveStats(token, cb) {
    fetch(
      "https://api.instagram.com/v1/users/self/?access_token=" + token
    )
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        saveStats(json.data.counts);
        let { full_name, profile_picture, bio, counts } = json.data;

        _stats = counts;
        _user = {
          name: full_name,
          desc: bio,
          url: profile_picture
        };

        cb(_user)
      });
  },

  getStats() {
    return _stats;
  },
  getUser() {
    return _user;
  },
}

export default Instagram
