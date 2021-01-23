import React from "react";
import logo from "../Assets/logo.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  List,
  Image,
} from "semantic-ui-react";
import { fetchStreams } from "../Action";
import Slider from "../Components/Carousel";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderVideoShow() {
    return (
      <div className="left floated content">
        <video width="100%" controls />
      </div>
    );
  }
  renderCreatedBy(stream) {
    return (
      <React.Fragment>
        <div className="right floated content">
          <Label animated as="a" color="teal" tag size="large">
            Created by : {stream.UserName}
          </Label>
        </div>
      </React.Fragment>
    );
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <>
          <div className="right floated content">
            <Link
              to={`/streams/edit/${stream.id}`}
              className="ui button primary"
            >
              <Icon animated name="pencil" /> Edit
            </Link>
            <Link
              to={`/streams/delete/${stream.id}`}
              className="ui button negative"
            >
              Delete
            </Link>
          </div>
        </>
      );
    }
  }

  renderCreate() {
    if (this.props.currentIsSignedIn) {
      return (
        <>
          <Link to="/streams/new" className="ui button primary">
            <Icon name="plus" />
            Create Stream
          </Link>
        </>
      );
    }
  }

  renderEmail() {
    if (this.props.currentIsSignedIn) {
      return (
        <>
          <Label as="a" size="meduim">
            <Image avatar spaced="right" src={this.props.currentUserImage} />
            {this.props.currentEmail}
          </Label>
        </>
      );
    }
  }
  renderList() {
    console.log("userImage", this.props.currentUserImage);
    return this.props.streams.map((stream) => {
      return (
        <>
          <List.Item key={stream.id}>
            {this.renderVideoShow(stream)}
            {this.renderAdmin(stream)}
            {this.renderCreatedBy(stream)}
            <Image avatar spaced="right" src={logo} />
            <div className="content">
              <Link to={`/streams/${stream.id}`}>
                <h3> {stream.title} </h3>
              </Link>
              <div className="description">
                <p> {stream.description}</p>
              </div>
            </div>
          </List.Item>
        </>
      );
    });
  }
  render() {
    console.log(this.props.streams);
    console.log("UserName", this.props.currentUserName);
    return (
      <div>
        <Slider />
        <Grid streached centered>
          <Grid.Column width="13" style={{ marginTop: 30 }}>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column width="7"> {this.renderEmail()}</Grid.Column>
                <Grid.Column width="6"></Grid.Column>
                <Grid.Column width="3" className="right floated content">
                  {this.renderCreate()}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider color="blue" />
            <List divided animated verticalAlign="middle" raised>
              {this.renderList()}
            </List>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  const { userId, UserEmail, UserImage, UserName } = state.auth.UserProfile;
  return {
    streams: Object.values(state.streams),
    currentUserId: userId,
    currentIsSignedIn: state.auth.isSignedIn,
    currentEmail: UserEmail,
    currentUserImage: UserImage,
    currentUserName: UserName,
  };
};

export default connect(MapStateToProps, { fetchStreams })(StreamList);
