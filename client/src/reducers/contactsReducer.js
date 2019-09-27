import { FETCH_CONTACTS, ADD_CONTACT, UPDATE_CONTACT } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_CONTACT:
      return state.map(item => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return {
          ...item,
          ...action.payload
        };
      });
    case ADD_CONTACT:
      console.log(action.payload);
      return [
        ...state,
        action.payload
      ];
    case FETCH_CONTACTS:
      return action.payload;
    default:
      return state;
  }
}
/*
export default function(state = [], action) {
    switch (action.type) {
      case UPDATE_CONTACT:
      case ADD_CONTACT:
        return { ...state, [action.payload._id]: action.payload };
      case FETCH_CONTACTS:
        return { ...state, ..._.mapKeys(action.payload, "_id") };;
      default:
        return state;
    }
    */
