import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { Container, Divider, Segment } from "semantic-ui-react";
import { fetchStream } from "../Action";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading..</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <div>
        <Container>
          <Segment>
            <video ref={this.videoRef} style={{ width: "100%" }} controls />
            <h2>{title}</h2>
            <Divider />
            <h3>{description}</h3>
          </Segment>
        </Container>
      </div>
    );
  }
}

const MapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(MapStateToProps, { fetchStream })(StreamShow);
