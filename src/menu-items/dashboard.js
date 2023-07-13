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
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'leads',
      title: 'Leads',
      type: 'item',
      url: '/dashboard/leads',
      icon: icons.RiseOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
