import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useState, useEffect, useMemo } from 'react';
import CustomerTable from './Table';
// material-ui
import { Box, Card, Grid, Stack, Typography, Button } from '@mui/material';
// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../components-overview/ComponentSkeleton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCustomers } from 'store/reducers/customerSlice';

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <>
      <ComponentSkeleton>
        <MainCard>
          <Button component={Link} to="/customer/create" color="success" size="lg" variant="outlined" my={4}>
            + Customer
          </Button>
          <Grid container spacing={3} variant="outlined">
            <Box
              sx={(theme) => ({
                minHeight: '100vh',
                padding: theme.spacing(4)
              })}
            >
              {/* <Button component={Link} to="create" sx={{ mb: 2 }}>
                Available Customers...
              </Button> */}

              <CustomerTable />
            </Box>
          </Grid>
        </MainCard>
      </ComponentSkeleton>
    </>
  );
};

export default CustomersPanel;
