// assets
import { DashboardOutlined, RiseOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  RiseOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: '/customer',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'leads',
      title: 'Leads',
      type: 'item',
      url: '/leads',
      icon: icons.RiseOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'customers',
    //   title: 'Leads',
    //   type: 'item',
    //   url: '/customers',
    //   icon: icons.RiseOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'examples1',
      title: 'Example',
      type: 'item',
      url: '/examples1',
      icon: icons.RiseOutlined,
      breadcrumbs: false
    },
    {
      id: 'examples2',
      title: 'Example',
      type: 'item',
      url: '/examples2',
      icon: icons.RiseOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
