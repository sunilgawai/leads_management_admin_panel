import * as React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Paper';

// State Import.
import { useSelector, useDispatch } from 'react-redux';
import { removeCustomer } from 'store/reducers/customerSlice';
import Loader from 'components/Loader';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import ApiService from 'services/ApiService';

export default function CustomersTable() {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customerSlice);
  if (!customers) {
    return <Loader />;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email:</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Country&nbsp;(g)</TableCell>
            <TableCell align="right">Shop&nbsp;(g)</TableCell>
            <TableCell align="right">KYC&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers &&
            customers.map((customer) => (
              <TableRow key={customer.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {customer.name}
                </TableCell>
                <TableCell align="right">{customer.Country.name}</TableCell>
                <TableCell align="right">{customer.shop?.name}</TableCell>
                <TableCell align="right">{customer.kyc?.type}</TableCell>
                <TableCell align="right">
                  <Button component={Link} to={`/customer/${customer.id}`} sx={{ mb: 2 }}>
                    View
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button component={Link} to={`/customer/update/${customer.id}`} sx={{ mb: 2 }}>
                    Update
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      ApiService.deleteCustomer(customer.name)
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
                    sx={{ mb: 2 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
      </Table>
    </TableContainer>
  );
}
