import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, registerUserFailure } from "../../store/actions/usersActions";
import { useNavigate } from "react-router-dom";
import { Avatar, Container, Typography, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
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

const Register = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [dublicate, setDublicate] = useState('The Login exists')
  const dispatch = useDispatch();
  const { registerError } = useSelector(state => state.users);
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
    await dispatch(registerUser(state));
    navigate("/home");
    if (!registerError) {
      await dispatch(loginUser(state));
      navigate("/home");
    }
  };

  const getFieldError = (fieldName) => {
    return registerError?.errors?.[fieldName]?.message;
  };

  const dublicateHandler = async (e) => {
    e.preventDefault();
    await dispatch(registerUserFailure());
    setState();
    navigate('/sign-in')
  }

  return <>
    <StyledContainer component={"section"} maxWidth={"xs"}>
      <Avatar sx={{ m: "0 auto 30px" }}>
        <LockIcon />
      </Avatar>
      <StyledTitle variant={"h1"}>
        Sign Up
      </StyledTitle>
      {registerError !== undefined ?
        (<div><p style={{ marginLeft: '140px', color: 'red' }}>{dublicate}</p>
          <p > <Button
            to="/sign-in"
            sx={{ mt: "30px" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={dublicateHandler}
          >
            Go to Sign In
          </Button></p>
        </div>)
        : null}
      <UserForm
        onSubmit={submitHandler}
        state={state}
        onChange={inputChangeHandler}
        btnText={"Sign Up"}
        getFieldError={getFieldError}
      />
    </StyledContainer>
  </>
};

export default Register;
