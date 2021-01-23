import React from "react";
import { Button, Icon, Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../Action";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client: auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "350008834264-q5irgi6kjob0nn2s12g7pe01efegimo0.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  OnSignedIn = () => {
    this.auth.signIn();
    localStorage.setItem(
      "UserGoogleId",
      this.auth.currentUser.get().getBasicProfile().getEmail()
    );
  };
  OnSignedOut = () => {
    this.auth.signOut();
  };
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn({
        userId: this.auth.currentUser.get().getId(),
        UserEmail: this.auth.currentUser.get().getBasicProfile().getEmail(),
        UserImage: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
        UserName: this.auth.currentUser.get().getBasicProfile().getName(),
      });
    } else {
      this.props.signOut();
    }
    console.log("userid", this.auth);
  };

  RenderJugment() {
    if (this.props.isSignedIn === null) {
      return (
        <div>
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
        </div>
      );
    } else if (this.props.isSignedIn === true) {
      return (
        <div>
          <Button onClick={this.OnSignedOut} color="red">
            <Icon name="sign-out" />
            Sign Out
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={this.OnSignedIn} color="green">
            <Icon name="google" />
            <Icon name="sign-in" />
            Sign In
          </Button>
        </div>
      );
    }
  }
  render() {
    return <>{this.RenderJugment()}</>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
