/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import React,{useState,useEffect} from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Axios } from "Config/Axios/Axios";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import Button from "@mui/material/Button";
export default function CriminalData() {
  const Name = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Crime = ({ title, description }) => (

    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    // Fetch user data from the JSON API
    // fetch('http://localhost:3000/testusers.json')
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error('Error fetching data:', error));

    Axios.get('/api/v1/app/crime/getAll')
      .then(res => {
        setCrimes(res.data.crimes);
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  return {
    // ✅ END
    columns: [
      { Header: "Name", accessor: "name", width: "20%", align: "left" },
      { Header: "Date", accessor: "date", align: "left" },
      { Header: "Age", accessor: "age", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        name: <Name image={team3} name="John Michael" id="#10299" />,
        function: <Crime title="murder" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="OPEN" color="error" variant="gradient" size="lg" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      //END OF DATA PART
      {
        author: <Name image={team2} name="John Michael" id="#10299" />,
        function: <Crime title="murder" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="CLOSED" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
    }
}
