import { PROFILE_INFO_SUCCESS, FETCH_REQUEST, FETCH_ERROR, } from "../actionTypes";

const initialState = {
  profile: {},
  loading: false,
  error: null
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case PROFILE_INFO_SUCCESS:
      return { ...state, loading: false, profile: action.value }
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state;
  }
};

export default postsReducer;