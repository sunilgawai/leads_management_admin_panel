import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Card, Grid, Stack, Typography, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../components-overview/ComponentSkeleton';

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

const students = [];
// ===============================|| COMPONENT - CUSTOMERS ||=============================== //

const CustomersPanel = () => (
  <>
    <ComponentSkeleton>
      <MainCard>
        <Button component={Link} to="/customer/create" color="success" size="lg" variant="outlined" my={4}>
          + Customer
        </Button>
        <Grid container spacing={3} variant="outlined">
          <Grid item xs={12} sm={6} md={4}>
            <Typography>Add Customer</Typography>
          </Grid>
          {/* To be Removed */}
          <Box
            sx={(theme) => ({
              minHeight: '100vh',
              padding: theme.spacing(4)
            })}
          >
            <Button component={Link} to="create" sx={{ mb: 2 }}>
              Insert New Student
            </Button>
            <Grid spacing={2} container>
              {students.map((student) => (
                <Grid key={student.id} item xs={12} sm={6} md={3} xl={2}>
                  <Card variant="outlined">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                          {student.name}
                        </Typography>
                        <Typography
                          level="body2"
                          sx={{
                            display: 'block',
                            whiteSpace: 'nowrap',
                            width: '80%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {student.address}
                        </Typography>
                      </Box>
                      <Button component={Link} to={`${student.id}/edit`} color="success">
                        Edit
                      </Button>
                    </Box>
                    <Typography>Image</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <Typography fontSize="lg" fontWeight="lg">
                          class: {student.standard}
                        </Typography>
                        <Typography level="body3">
                          Roll: {student.roll} | sec: {student.section}
                        </Typography>
                      </div>

                      <Button
                        type="submit"
                        variant="soft"
                        size="sm"
                        color="danger"
                        aria-label="Explore Bahamas Islands"
                        sx={{ fontWeight: 600 }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </MainCard>
    </ComponentSkeleton>
  </>
);

export default CustomersPanel;
