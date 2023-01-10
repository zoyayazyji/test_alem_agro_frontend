import { POSTS_SUCCESS, FETCH_REQUEST, FETCH_ERROR, ONE_POST_SUCCESS } from "../actionTypes";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";

export const fetchOnePostSuccess = (value) => {
    return { type: ONE_POST_SUCCESS, value };
};

const fetchPostsSuccess = (value) => {
    return { type: POSTS_SUCCESS, value };
};

const fetchError = (error) => {
    return { type: FETCH_ERROR, error };
};

const fetchRequest = () => {
    return { type: FETCH_REQUEST };
};

export const fetchPosts = () => {
    return async dispatch => {
        dispatch(fetchRequest());
        try {
            const response = await axios.get("https://api.publicapis.org/entries");
            const array = response.data.entries;
            array.splice(50);
            const posts = Object.keys(array)?.map(itemId => {
                return { id: nanoid(5), ...array[itemId] };
            });
            dispatch(fetchPostsSuccess(posts));
        } catch (e) {
            fetchError(e);
        }
    }
};




