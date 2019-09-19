import axios from "axios";
import { FETCH_USER, FETCH_RSVPS, FETCH_RSVP } from "./types";
import history from "../history";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });

  if (res.data) history.push("/rsvps");
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const submitRSVP = values => async dispatch => {
  values.status = 1;
  const res =
    values._id === undefined
      ? await axios.post("/api/rsvps", values)
      : await axios.put("/api/rsvps", values);

  history.push("/rsvps");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveRSVP = values => async dispatch => {
  values.status = 0;
  console.log(values._id);
  const res =
    values._id === undefined
      ? await axios.post("/api/rsvps", values)
      : await axios.put("/api/rsvps", values);

  history.push("/rsvps");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchRSVPs = () => async dispatch => {
  const res = await axios.get("/api/rsvps");
  dispatch({ type: FETCH_RSVPS, payload: res.data });
};

export const fetchRSVP = rsvpId => async dispatch => {
  const res = await axios.get(`/api/rsvps/${rsvpId}`);
  dispatch({ type: FETCH_RSVP, payload: res.data });
};
