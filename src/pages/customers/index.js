/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useState, useEffect, useMemo } from 'react';
// import CustomerTable from './Table';
// material-ui
import { Box, Card, Grid, Stack, Typography, Button } from '@mui/material';
// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../components-overview/ComponentSkeleton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, removeCustomer } from 'store/reducers/customerSlice';
import Loader from 'components/Loader';

// Customers table Components.
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// Delete action notifications.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from 'services/ApiService';

// ===============================|| COLOR BOX ||=============================== //

function ColorBox({ bgcolor, title, data, dark, main }) {
  return (
    <>
      <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2.5,
            bgcolor,
            color: dark ? 'grey.800' : '#ffffff',
            border: main ? '1px dashed' : '1px solid transparent'
          }}
        >
          {title && (
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item>
                {data && (
                  <Stack spacing={0.75} alignItems="center">
                    <Typography variant="subtitle2">{data.label}</Typography>
                    <Typography variant="subtitle1">{data.color}</Typography>
                  </Stack>
                )}
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="inherit">
                  {title}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Card>
    </>
  );
}

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool,
  main: PropTypes.bool
};

// ===============================|| COMPONENT - CUSTOMERS ||=============================== //

const CustomersPanel = () => {
  const notify = () => toast('Customer Deleted.');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const { customers } = useSelector((state) => state.customerSlice);

  if (!customers) {
    // Render a loading state or return null until customer data is fetched
    return <Loader />;
  }
  console.log(customers);
  return (
    <>
      <ComponentSkeleton>
        <MainCard>
          <Button component={Link} to="/customer/create" color="success" size="lg" variant="outlined" my={4}>
            + Customer
          </Button>
          <ToastContainer />
          <Grid container spacing={3} variant="outlined">
            <Box
              sx={(theme) => ({
                minHeight: '100vh',
                padding: theme.spacing(4)
              })}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Email:</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Country</TableCell>
                      <TableCell align="right">Shop</TableCell>
                      <TableCell align="right">KYC</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers &&
                      customers.map((customer, idx) => (
                        <TableRow key={idx}>
                          {/* {JSON.stringify(customer)} */}
                          <TableCell component="th" scope="row">
                            {customer.email}
                          </TableCell>
                          <TableCell align="right">{customer.first_name}</TableCell>
                          <TableCell align="right">{customer.Country?.name}</TableCell>
                          <TableCell align="right">{customer.shop || 'Shop'}</TableCell>
                          <TableCell align="right">{customer.kyc?.type}</TableCell>
                          <TableCell>
                            <Button variant="outlined" component={Link} to={`/customer/${customer.id}`} size="medium" color="primary">
                              View
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              component={Link}
                              to={`/customer/update/${customer.id}`}
                              size="medium"
                              variant="contained"
                              color="success"
                            >
                              Update
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => {
                                ApiService.deleteCustomer(customer.id)
                                  .then((results) => {
                                    // console.log(results);
                                    if (results.status === 200) {
                                      dispatch(removeCustomer(customer.id));
                                      notify();
                                    }
                                  })
                                  .catch((err) => {
                                    console.log('Error', err);
                                  });
                              }}
                              variant="contained"
                              color="error"
                              size="medium"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <CustomersTable />
              <CustomerTable /> */}
            </Box>
          </Grid>
        </MainCard>
      </ComponentSkeleton>
    </>
  );
};

export default CustomersPanel;
