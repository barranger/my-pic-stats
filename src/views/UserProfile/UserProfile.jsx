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
import DB from "db/DB.js";
import Instagram from 'services/Instagram'

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
    DB.init('user',state => this.setState(state));

  }

  showMedia() {
    Instagram.getMyMedia(data => {console.log('my media', data)})
  }

  showComments() {
    const testId = '1824065720393156834_189607138';
    Instagram.getCommentsForMedia(testId, data => {console.log('my media', data)})
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
                <Button color="primary" round onClick={this.showMedia}>My Media</Button>
                <Button color="primary" round onClick={this.showComments}>Comments</Button>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
