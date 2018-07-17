import DB from "db/DB";

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
  }
}

export default Instagram
