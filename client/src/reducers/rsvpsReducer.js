import { FETCH_RSVPS, FETCH_RSVP } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RSVPS:
      return action.payload;
    case FETCH_RSVP:
      return { ...state, selectedRSVP: action.payload };
    default:
      return state;
  }
}
