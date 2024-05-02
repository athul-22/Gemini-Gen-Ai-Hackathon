import Dashboard from "layouts/dashboard";
import DataGenator from 'layouts/DataGen/datagenerator'

// @mui icons
//TO GET ICONS FROM MATERIALICONS
import Icon from "@mui/material/Icon";

// import  from '@mui/icons-material/ClearAllOutlined';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Data Generator",
    key: "data-generator",
    icon: <Icon fontSize="medium">insert_chart</Icon>,
    route: "/data-generator",
    component: <DataGenator />,
  },
];

export default routes;
