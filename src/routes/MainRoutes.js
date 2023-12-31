import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
// Custom.
const CustomersPanel = Loadable(lazy(() => import('pages/customers')));
const CustomerCreate = Loadable(lazy(() => import('pages/customers/CustomerCreate')));
const CustomerUpdate = Loadable(lazy(() => import('pages/customers/CustomerUpdate')));
const CustomerView = Loadable(lazy(() => import('pages/customers/CustomerView')));

// Dashboard routes.
const Leads = Loadable(lazy(() => import('pages/customers')));
const Users = Loadable(lazy(() => import('pages/users')));
const Orders = Loadable(lazy(() => import('pages/orders')));
const Quotations = Loadable(lazy(() => import('pages/quotations')));
const Cms = Loadable(lazy(() => import('pages/cms')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/customer',
      element: <CustomersPanel />
    },
    {
      path: '/customer/:id',
      element: <CustomerView />
    },
    {
      path: '/customer/create',
      element: <CustomerCreate />
    },
    {
      path: '/customer/update/:id',
      element: <CustomerUpdate />
    },
    {
      path: '/users',
      element: <Users />
    },
    {
      path: '/leads',
      element: <Leads />
    },
    {
      path: '/orders',
      element: <Orders />
    },
    {
      path: '/quotations',
      element: <Quotations />
    },
    {
      path: '/cms',
      element: <Cms />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'customers',
          element: <CustomersPanel />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
