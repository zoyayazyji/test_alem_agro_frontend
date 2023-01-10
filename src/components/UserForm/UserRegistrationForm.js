import { Button, Grid } from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";

const UserRegistrationForm = ({ state, onChange, onSubmit, getFieldError, btnText }) => {
  return <form onSubmit={onSubmit}>
    <Grid container spacing={2}>
      <FormElement
        onChange={onChange}
        name="username"
        label="Username"
        state={state}
        error={getFieldError?.("username")}
      />
      <FormElement
        onChange={onChange}
        name="password"
        label="Password"
        type="password"
        state={state}
        error={getFieldError?.("password")}
      />
    </Grid>
    <Button
      sx={{ mt: "30px" }}
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
    >
      {btnText}
    </Button>
  </form>
};

export default UserRegistrationForm;