import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { Button, Divider, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Select, MenuItem } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets

// State Management Inputs.
import ApiService from 'services/ApiService';
// import { setAuth } from 'store/reducers/userSlice';

// Component imports.
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../components-overview/ComponentSkeleton';
import Loader from 'components/Loader';

// Notification import.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerCreate = () => {
  const notify = () => toast('customer updated successfully.');
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    ApiService.viewCustomer(id)
      .then((results) => {
        // console.log(results.data);
        setCustomer(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  // for customer location.
  const [location, setLocation] = useState({
    countries: [],
    states: [],
    cities: []
  });
  const [kyc, setKyc] = useState([]);

  useEffect(() => {
    ApiService.getKycList()
      .then((results) => {
        setKyc(results.data);
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

  if (Object.keys(customer).length === 0) {
    // Render a loading state or return null until customer data is fetched
    return <Loader />;
  }
  return (
    <>
      <ComponentSkeleton>
        <MainCard>
          <Button component={Link} sx={{ mb: 2 }} to="/customer" color="success" size="lg" variant="outlined" my={4}>
            Go Back
          </Button>
          <ToastContainer />
          <Divider sx={{ mb: 2 }} />
          <Formik
            initialValues={{
              first_name: customer.first_name || '',
              last_name: customer.last_name || '',
              phone: customer.phone || '',
              email: customer.email || '',
              country: customer.country || '',
              state: customer.state || '',
              city: customer.city || '',
              shop: customer.shop || '',
              kyc: customer.kyc || '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string().max(255).required('First Name is required'),
              last_name: Yup.string().max(255).required('Last Name is required'),
              phone: Yup.string().max(12).required('Phone No. is required'),
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              country: Yup.string().max(255).required('Country is required'),
              state: Yup.string().max(255).required('State is required'),
              city: Yup.string().max(255).required('City is required'),
              shop: Yup.string().max(255).required('Shop is required'),
              kyc: Yup.string().max(255).required('KYC is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setStatus({ success: false });
                setSubmitting(true);
                const response = await ApiService.updateCustomer({ id, ...values });
                console.log('response', response);
                if (response.request.status === 200) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  console.log('response', response);
                  notify();
                }
              } catch (err) {
                console.error(err);
                setErrors({ submit: response.data.message });
                setStatus({ success: false });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="first_name-signup">First Name*</InputLabel>
                      <OutlinedInput
                        id="first_name-login"
                        type="first_name"
                        value={values.first_name}
                        name="first_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="John"
                        fullWidth
                        error={Boolean(touched.first_name && errors.first_name)}
                      />
                      {touched.first_name && errors.first_name && (
                        <FormHelperText error id="helper-text-first_name-signup">
                          {errors.first_name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="last_name-signup">Last Name*</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.last_name && errors.last_name)}
                        id="last_name-signup"
                        type="last_name"
                        value={values.last_name}
                        name="last_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Doe"
                        inputProps={{}}
                      />
                      {touched.last_name && errors.last_name && (
                        <FormHelperText error id="helper-text-last_name-signup">
                          {errors.last_name}
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
                        <FormHelperText error id="helper-text-last_name-signup">
                          {errors.country}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
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
                        <FormHelperText error id="helper-text-last_name-signup">
                          {errors.state}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
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
                        <FormHelperText error id="helper-text-last_name-signup">
                          {errors.city}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="phone-signup">Shop</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.shop && errors.shop)}
                        id="shop-signup"
                        value={values.shop}
                        name="shop"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Shop Name"
                        inputProps={{}}
                      />
                      {touched.shop && errors.shop && (
                        <FormHelperText error id="helper-text-phone-signup">
                          {errors.shop}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel id="kyc-signup">KYC</InputLabel>
                      <Select
                        fullWidth
                        labelId="kyc-signup"
                        id="kyc-signup"
                        type="kyc"
                        name="kyc"
                        label="Kyc"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.kyc}
                        error={Boolean(touched.kyc && errors.kyc)}
                      >
                        {kyc.map((kyc) => (
                          <MenuItem key={kyc.id} value={kyc.id}>
                            {kyc.type}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.kyc && errors.kyc && (
                        <FormHelperText error id="helper-text-last_name-signup">
                          {errors.kyc}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
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
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Update Customer
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </MainCard>
      </ComponentSkeleton>
    </>
  );
};

export default CustomerCreate;
