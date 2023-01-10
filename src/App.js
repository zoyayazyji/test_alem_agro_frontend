import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import { Container, Slide, Snackbar } from "@mui/material";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import Profile from "./containers/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "./store/actions/commonActions";

const ProtectedRoute = ({ isAllowed, redirectUrl, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectUrl} />
  }
  return children || <Outlet />
};

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const App = () => {
  const {
    user,
    notificationOpened
  } = useSelector(state => state.users);
  const dispatch = useDispatch();

  return <>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={notificationOpened}
      autoHideDuration={5000}
      TransitionComponent={TransitionLeft}
      onClose={() => {
        dispatch(hideNotification())
      }}
    >
    </Snackbar>
    <Routes>
      <Route element={<>
        <AppToolbar />
        <main>
          <Container>
            <Outlet />
          </Container>
        </main>
      </>}>
        <Route path={"/"} element={<Register />} />

        <Route path={"/home"} element={<ProtectedRoute
          isAllowed={!!user}
          redirectUrl={"/sign-in"}
        >
          <Home />
        </ProtectedRoute>} />
        <Route path={"/profile"} element={<ProtectedRoute
          isAllowed={!!user}
          redirectUrl={"/sign-in"}
        >
          <Profile />
        </ProtectedRoute>} />
        <Route path={"/sign-up"} element={<ProtectedRoute
          isAllowed={!user}
          redirectUrl={"/"}
        >
          <Register />
        </ProtectedRoute>} />
        <Route path={"/sign-in"} element={<ProtectedRoute
          isAllowed={!user}
          redirectUrl={"/"}
        >
          <Login />
        </ProtectedRoute>} />
      </Route>
    </Routes>
  </>
};

export default App;