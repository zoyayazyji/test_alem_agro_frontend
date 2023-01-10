import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import HasAccess from "../UI/HasAccess/HasAccess";
import { signoutUser } from "../../store/actions/usersActions";

const theme = createTheme({
  palette: {
    neutral: {
      main: '#239e87',
      contrastText: '#fff',
    },
  },
});

const AppToolbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  return <Box sx={{ flexGrow: 1, mb: "40px" }}>
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="neutral">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            <Button
              component={NavLink}
              to="/home"
              color="inherit"
            >
              The API Catalog
            </Button>
          </Typography>
          <HasAccess allowed={!!user}>
            <Button
              color="inherit"
            >
              Welcome, {user?.username}
            </Button>
            <Button
              component={NavLink}
              color="inherit"
              to="/profile"
            >
              Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => dispatch(signoutUser(navigate))}
            >
              Logout
            </Button>
          </HasAccess>
          <HasAccess allowed={!user}>
            <Button
              component={NavLink}
              color="inherit"
              to="/sign-up"
            >
              Sign Up
            </Button>
            <Button
              component={NavLink}
              color="inherit"
              to="/sign-in"
            >
              Sign in
            </Button>
          </HasAccess>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  </Box>
};

export default AppToolbar;
