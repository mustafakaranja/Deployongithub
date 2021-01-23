import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Label,
} from "semantic-ui-react";

const StreamForm = (formProps) => {
  // onSubmit function is winded up by the redux form file
  const onSubmit = (formValues) => {
    formProps.onSubmit(formValues);
  };
  // A rest conventions or restful conventions are a predefined system for defining different routes on an
  //API that work with a given type of records.
  // That's super unclear.
  const RenderInput = ({ input, label, meta }) => {
    // RenderError Function is for the validation and the touched parametre is from the
    //argument props passed by
    const renderError = ({ error, touched }) => {
      if (touched && error) {
        return (
          <Label basic color="red" pointing>
            <Icon name="exclamation triangle" />
            {meta.error}
          </Label>
        );
      }
    };
    return (
      <>
        <label>{label}</label>
        <Input {...input} />
        {renderError(meta)}
      </> // alternate sytex for this is <Input onChange ={form.input.onchange} value={form.input.value}
    );
  };
  // console.log(formProps); // value of the object which is in the StreamForm Hence this value is gonna update in the form filling object

  return (
    <Form onSubmit={formProps.handleSubmit(onSubmit)}>
      <Form.Field>
        <Field
          name="title"
          component={RenderInput}
          placeholder="title of your stream"
          label="Enter Title"
        />
      </Form.Field>
      <Form.Field>
        <Field
          name="description"
          component={RenderInput}
          placeholder="Enter Your Stream Description"
          label="Enter Description"
        />
      </Form.Field>
      <Form.Field>
        <Button fluid primary>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

const validate = (formValues) => {
  const errors = {};
  // Validate function to render the value by using the redux
  if (!formValues.title) {
    errors.title = "You must enter a Title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a Description";
  }
  return errors;
};

export default reduxForm({
  // this are the value for the redux store to add. and this steamCreate object store the value in the redux which is the value of form input
  form: "StreamForm",
  validate,
})(StreamForm);
