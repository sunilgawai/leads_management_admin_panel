// assets
import { DashboardOutlined, RiseOutlined, UserOutlined, ShoppingOutlined, DatabaseOutlined, SnippetsOutlined, FileTextOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  RiseOutlined,
  UserOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
  SnippetsOutlined,
  FileTextOutlined
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
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UserOutlined,
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
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.ShoppingOutlined,
      breadcrumbs: false
    },
    {
      id: 'quotations',
      title: 'Quotations',
      type: 'item',
      url: '/quotations',
      icon: icons.FileTextOutlined,
      breadcrumbs: false
    },
    {
      id: 'cms',
      title: 'CMS',
      type: 'item',
      url: '/cms',
      icon: icons.SnippetsOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
