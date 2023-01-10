import ReactDOM from 'react-dom';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import usersReducer from "./store/reducers/usersReducer";
import postsReducer from "./store/reducers/postsReducer";
import profileReducer from "./store/reducers/profileReducer";
import "./index.css";

const localStorageMiddleware = ({ getState }) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("user", JSON.stringify(getState().users.user));
  return result;
};

const loadFromLocalStorage = () => {
  if (localStorage.getItem("user") !== null) {
    return { users: { user: JSON.parse(localStorage.getItem("user")) } }
  }
  return undefined;
};

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    profile: profileReducer
  },
  preloadedState: loadFromLocalStorage(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);