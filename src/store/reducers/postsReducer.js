import { FETCH_ERROR, FETCH_REQUEST, POSTS_SUCCESS, ONE_POST_SUCCESS } from "../actionTypes";

const initialState = {
    posts: [],
    post: {},
    loading: false,
    error: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return { ...state, loading: true };
        case POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.value }
        case FETCH_ERROR:
            return { ...state, loading: false, error: action.error }
        case ONE_POST_SUCCESS:
            return { ...state, loading: false, post: action.value }
        default:
            return state;
    }
};

export default postsReducer;