import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Message,
  Segment,
  Header,
  Grid,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { editStream, fetchStream } from "../Action";
import StreamFrom from "./StreamFrom";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    const { id } = this.props.match.params;
    this.props.editStream(id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      );
    } else {
      return (
        <>
          <Grid centered>
            <Grid.Column style={{ maxWidth: 600, marginTop: 20 }}>
              <Segment>
                <Header as="h1" textAlign="center">
                  Edit Your Stream
                </Header>
                <StreamFrom
                  initialValues={_.pick(
                    this.props.stream,
                    "title",
                    "description"
                  )}
                  onSubmit={this.onSubmit}
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </>
      );
    }
  }
}

const MapStateToProps = (state, ownProps) => {
  console.log("OwnProps", ownProps);
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(MapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
