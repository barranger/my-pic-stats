import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends React.Component {
  state = {
    name: "",
    url: "",
    desc: "",
    token: null
  };

  componentWillMount() {

    let u = window.location.href;
    let token =
      u.indexOf("#access_token=") === -1
        ? null
        : u.substring(u.indexOf("#access_token=") + 14);
    
    this.setState({token}, this.getUserData);

  }

  getUserData = () => {
      if (!this.state.token) {
        window.location =
          "https://api.instagram.com/oauth/authorize/?client_id=f19cd80176bc4c62bb756838627ac944&redirect_uri=http://localhost:3000/user&response_type=token";
      } else {
        fetch(
          "https://api.instagram.com/v1/users/self/?access_token=" +
            this.state.token
        )
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            console.log("json", json);
            let { full_name, profile_picture, bio } = json.data;
            this.setState({
              name: full_name,
              desc: bio,
              url: profile_picture
            });
          });
      }
  }

  showAvatar = () => {
    if (this.state.url) {
      return (
        <CardAvatar profile>
          <a href="#pablo" onClick={e => e.preventDefault()}>
            <img id="pic" src={this.state.url} alt="..." />
          </a>
        </CardAvatar>
      );
    }
    return null;
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              {this.showAvatar()}

              <CardBody profile>
                <h4 id="name" className={classes.cardTitle}>
                  {this.state.name}
                </h4>
                <p className={classes.description}>{this.state.desc}</p>
                <Button
                  color="primary"
                  round
                  onClick={this.getUserData}
                >
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
