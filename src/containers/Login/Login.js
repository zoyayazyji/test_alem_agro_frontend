import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/usersActions";
import { useNavigate } from "react-router-dom";
import { Alert, Avatar, Container, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import styled from "@emotion/styled";
import UserForm from "../../components/UserForm/UserRegistrationForm";

const StyledContainer = styled(Container)`
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 0 18px 30px 0 rgba(0, 0, 0, 0.6);
  border-radius: 6px;
`;
const StyledTitle = styled(Typography)`
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
`;

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const dispatch = useDispatch();
  const { loginError } = useSelector(state => state.users);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(state));
    navigate("/home");
  };

  const getFieldError = (fieldName) => {
    return loginError?.errors?.[fieldName]?.message;
  };

  return <>
    <StyledContainer component={"section"} maxWidth={"xs"}>
      {!!loginError && <Alert color="error">{loginError}</Alert>}
      <Avatar sx={{ m: "0 auto 30px" }}>
        <PersonIcon />
      </Avatar>
      <StyledTitle variant={"h1"}>
        Log In
      </StyledTitle>
      <UserForm
        onSubmit={submitHandler}
        state={state}
        onChange={inputChangeHandler}
        btnText={"Log in"}
        getFieldError={getFieldError}
      />
    </StyledContainer>
  </>
};

export default Login;