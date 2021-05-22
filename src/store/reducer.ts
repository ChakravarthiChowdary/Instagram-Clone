import { AnyAction } from "redux";
import { PostType } from "../App";
import {
  SET_ERROR,
  CLEAR_USER,
  GET_POSTS,
  SET_USER,
  CLEAR_ERROR,
} from "./actions";

interface StateType {
  loading: boolean;
  posts: { id: string; post: PostType }[] | [];
  user: {
    displayName: string;
    email: string;
  } | null;
  username: null | string;
  authError: null | { message: string };
}

const initialState: StateType = {
  loading: false,
  posts: [],
  user: null,
  username: null,
  authError: null,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authError: null,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        authError: null,
      };
    case SET_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
