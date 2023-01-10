import { Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

const FormElement = ({name, label, state, error, onChange, type="text"}) => {
  let input = <TextField
    name={name}
    id={name}
    type={type}
    label={label}
    variant="outlined"
    value={state?.[name]}
    error={!!error}
    helperText={error}
    fullWidth
    onChange={onChange}
  />;

  return <Grid item xs={12}>
    {input}
  </Grid>
};

FormElement.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};


export default FormElement;