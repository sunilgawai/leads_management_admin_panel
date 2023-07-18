/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'components/MainCard';
import { useParams } from 'react-router-dom';

import { Button, Divider, Typography, TextField, Grid, InputLabel, OutlinedInput, Stack, Select, MenuItem } from '@mui/material';

// project import
import Loader from 'components/Loader';

// State Management Inputs.
import ApiService from 'services/ApiService';

const ComponentView = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    //
    ApiService.viewCustomer(id)
      .then((results) => {
        console.log(results);
        setCustomer(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!customer) {
    return <Loader />;
  }
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <MainCard title="Customer Details">
        <Button component={Link} sx={{ mb: 2 }} to="/customer" color="success" size="lg" variant="outlined" my={4}>
          Go Back
        </Button>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <OutlinedInput
                id="first_name-login"
                type="first_name"
                readOnly={true}
                value={customer.first_name || ''}
                name="first_name"
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="last_name-signup">Last Name*</InputLabel>
              <OutlinedInput
                fullWidth
                id="last_name-signup"
                type="last_name"
                readOnly={true}
                value={customer.last_name || ''}
                name="last_name"
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel id="country-signup">Country</InputLabel>
              <OutlinedInput
                fullWidth
                id="country-signup"
                readOnly={true}
                value={customer?.Country?.name || ''}
                name="country"
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel id="department-signup">State</InputLabel>
              <OutlinedInput fullWidth id="state-signup" readOnly={true} value={customer?.State?.name || ''} name="state" inputProps={{}} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel id="department-signup">City</InputLabel>
              <OutlinedInput
                fullWidth
                id="department-signup"
                readOnly={true}
                value={customer?.City?.name || ''}
                name="department"
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phone-signup">Shop</InputLabel>
              <OutlinedInput
                fullWidth
                id="shop-signup"
                readOnly={true}
                value={customer.shop?.name || ''}
                name="shop"
                // placeholder={customer.shop?.name || 'Not Available'}
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel id="kyc-signup">KYC</InputLabel>
              <OutlinedInput
                fullWidth
                id="kyc-signup"
                type="email"
                readOnly={true}
                value={customer.kyc?.type || ''}
                name="kyc"
                disabled={true}
                // placeholder={customer.kyc?.type || 'Not Available'}
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phone-signup">Phone</InputLabel>
              <OutlinedInput
                fullWidth
                id="phone-signup"
                readOnly={true}
                value={customer.phone || ''}
                name="phone"
                placeholder="Phone No."
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
              <OutlinedInput
                fullWidth
                id="email-login"
                type="email"
                readOnly={true}
                value={customer.email || ''}
                name="email"
                // disabled={true}
                // placeholder={customer.email}
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default ComponentView;
