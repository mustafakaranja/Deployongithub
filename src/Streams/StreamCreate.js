import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { CreateStream } from "../Action";
import StreamFrom from "./StreamFrom";

const StreamCreate = (formProps) => {
  const onSubmit = (formValues) => {
    formProps.CreateStream(formValues);
  };

  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 600, marginTop: 30 }}>
          <Segment>
            <Header as="h1" textAlign="center">
              {" "}
              Create a Stream{" "}
            </Header>
            <StreamFrom onSubmit={onSubmit} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default connect(null, { CreateStream })(StreamCreate);
