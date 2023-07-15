import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  MenuItem
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// State Management Inputs.
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ApiService from 'services/ApiService';
import { setAuth } from 'store/reducers/userSlice';

const AuthRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, []);

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const [location, setLocation] = useState({
    countries: [],
    states: [],
    cities: []
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    ApiService.getDepartments()
      .then((results) => {
        setDepartments(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getCountries()
      .then((results) => {
        setLocation({
          ...location,
          countries: results.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          firstname: 'John',
          lastname: 'Doe',
          phone: '1234567890',
          email: 'johndoe69@gmail.com',
          department: '',
          country: '',
          state: '',
          city: '',
          password: 'john123',
          repeat_password: 'john123',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          phone: Yup.string().max(12).required('Phone No. is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          department: Yup.string().max(255).required('Department is required'),
          country: Yup.string().max(255).required('Country is required'),
          state: Yup.string().max(255).required('State is required'),
          city: Yup.string().max(255).required('City is required'),
          password: Yup.string().max(255).required('Password is required'),
          repeat_password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log('values', values);
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
          <form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel id="department-signup">Department</InputLabel>
                  <Select
                    fullWidth
                    labelId="department-signup"
                    id="department-signup"
                    type="department"
                    name="department"
                    label="Department"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.department}
                    error={Boolean(touched.department && errors.department)}
                  >
                    {departments.map((dep) => (
                      <MenuItem key={dep.id} value={dep.id}>
                        {dep.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.department && errors.department && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.department}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel id="country-signup">Country</InputLabel>
                  <Select
                    fullWidth
                    labelId="country-signup"
                    id="country-signup"
                    type="country"
                    name="country"
                    label="country"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      ApiService.getStates(e.target.value)
                        .then((response) => {
                          setLocation({
                            ...location,
                            states: response.data
                          });
                        })
                        .catch((errors) => {
                          console.log(errors);
                        });
                    }}
                    value={values.country}
                    error={Boolean(touched.country && errors.country)}
                  >
                    {location.countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.country && errors.country && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.country}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* Location State  */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel id="department-signup">State</InputLabel>
                  <Select
                    fullWidth
                    labelId="state-signup"
                    id="state-signup"
                    type="state"
                    name="state"
                    label="state"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      ApiService.getCities(e.target.value)
                        .then((response) => {
                          setLocation({
                            ...location,
                            cities: response.data
                          });
                        })
                        .catch((errors) => {
                          console.log(errors);
                        });
                    }}
                    value={values.state}
                    error={Boolean(touched.state && errors.state)}
                  >
                    {location.states.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.state && errors.state && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.state}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* end of State  */}
              {/* Location City  */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel id="department-signup">City</InputLabel>
                  <Select
                    fullWidth
                    labelId="city-signup"
                    id="city-signup"
                    type="city"
                    name="city"
                    label="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    error={Boolean(touched.city && errors.city)}
                  >
                    {location.cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.city && errors.city && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.city}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* end of City  */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">Phone</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone-signup"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Phone No."
                    inputProps={{}}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@phone.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Repeat Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.repeat_password && errors.repeat_password)}
                    id="repeat_password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.repeat_password}
                    name="repeat_password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.repeat_password && errors.repeat_password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.repeat_password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      // handleSubmit();
                      ApiService.register(values)
                        .then((response) => {
                          if (response.status === 200) {
                            const { data } = response;
                            dispatch(setAuth({ data }));
                            navigate('/');
                          }
                          // Setting Errors
                          console.log('res', response);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
