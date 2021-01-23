// Here we all kind of action Creator to change the route value to get the value
// and have the all possibl action Creater to get the request
// for seeing the all the action creater I have attached the file png in the github

import AxiosInstances from "../Services/AxiosInstances/AxiosInstances";
import {
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "./Types";
import history from "../History/history";

export const signIn = (UserProfile) => {
  return {
    type: "SIGN_IN",
    payload: UserProfile,
  };
};

export const signOut = () => {
  history.push("/");
  return {
    type: "SIGN_OUT",
  };
};
// aAction creator for the Create Stream whith te Post method
export const CreateStream = (formValues) => async (dispatch, getState) => {
  const {
    userId,
    UserEmail,
    UserImage,
    UserName,
  } = getState().auth.UserProfile;
  const res = await AxiosInstances.post("/streams", {
    ...formValues,
    userId,
    UserEmail,
    UserImage,
    UserName,
  });

  dispatch({ type: CREATE_STREAM, payload: res.data });
  history.push("/");
};

// Action Creator for the Fetch the streams using the get method
export const fetchStreams = () => async (dispatch) => {
  const res = await AxiosInstances.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: res.data });
};

// Action Creator for the Fetch Stream
export const fetchStream = (id) => async (dispatch) => {
  const res = await AxiosInstances.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: res.data });
};

// Action creator for the Edit the Stream
export const editStream = (id, formValues) => async (dispatch) => {
  const res = await AxiosInstances.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: res.data });
  history.push("/");
};

// Action creator for the Delete the streams
export const deleteStream = (id) => async (dispatch) => {
  await AxiosInstances.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
