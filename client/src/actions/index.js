import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, FETCH_SURVEY } from "./types";
import history from "../history";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });

  if (res.data) history.push("/surveys");
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const submitSurvey = values => async dispatch => {
  values.status = 1;
  const res =
    values._id === undefined
      ? await axios.post("/api/surveys", values)
      : await axios.put("/api/surveys", values);

  history.push("/surveys");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveSurvey = values => async dispatch => {
  values.status = 0;
  console.log(values._id);
  const res =
    values._id === undefined
      ? await axios.post("/api/surveys", values)
      : await axios.put("/api/surveys", values);

  history.push("/surveys");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchSurvey = surveyId => async dispatch => {
  const res = await axios.get(`/api/surveys/${surveyId}`);
  dispatch({ type: FETCH_SURVEY, payload: res.data });
};
