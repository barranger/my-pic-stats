let _stats = null;
let _token = null;
let _user = null;

const DB = {
  isLoaded: false,

  init(page, cb) {

    if(_stats) {
      cb(_user);
      return;
    }
    let u = window.location.href;

    _token =
      u.indexOf("#access_token=") === -1
        ? null
        : u.substring(u.indexOf("#access_token=") + 14);

      if(!_token) {
        _token = window.localStorage.getItem('access_token');
      }

      if (!_token) {
        const redirect = process.env.PUBLIC_URL ? 'https://barranger.github.io/my-pic-stats/' : 'http://localhost:3000/'
        window.location =
          "https://api.instagram.com/oauth/authorize/?client_id=f19cd80176bc4c62bb756838627ac944&redirect_uri=" + redirect + page + "&response_type=token";
      } else {

        window.localStorage.setItem("access_token", _token);
        fetch(
          "https://api.instagram.com/v1/users/self/?access_token=" + _token
        )
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            let { full_name, profile_picture, bio, counts } = json.data;

            _stats = counts;
            _user = {
              name: full_name,
              desc: bio,
              url: profile_picture
            };

            cb(_user)
          });
      }
  },

  getStats() {
    return _stats;
  },

  //This needs to move to Instagram.js
  getToken() {
    return _token;
  }
};

export default DB;