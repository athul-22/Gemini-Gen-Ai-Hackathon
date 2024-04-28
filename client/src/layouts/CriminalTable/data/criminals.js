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
import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Axios } from "Config/Axios/Axios";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import "../criminaltablesidebar.css";
import $ from 'jquery'
import { Divider } from "@mui/material";
import CriminalData from "layouts/CrimeTable/data";
import CircularProgress from "@mui/material/CircularProgress";


function useCriminalData() {

  const [criminals, setCriminals] = useState([]);
  const [selectKey, setSelectedKey] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState("");

  const [loading, setLoading] = useState(false);

  const [filteredRows, setFilteredRows] = useState([]);

  const handleShowDetails = (key) => {
    document.getElementById("mySidenav").style.width = "400px";
    openNav()
    setSelectedKey(key);
    openNav(); // Explicitly open the sidebar after setting the selected key
  };

  function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
  }
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  var date = new Date("2013-03-10T02:00:00Z");
  date.toISOString().substring(0, 10);

  // SIDE NAV

  {
    /* <!-- Use any element to open the sidenav --> */
  }
  // <span onClick={openNav} >SIDENAV.</span>
  {
    /* <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page --> */
  }
  // <div id="main">

  // </div>

  

  const Name = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>

      {/* SIDEBAR */}
      <div
        id="mySidenav"
        className="sidenav"
      >

        <a className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <center>
          <img id="avatar" src={
            selectKey?.criminalPhotoFileName
              ? selectKey.criminalPhotoFileName
              : "https://www.svgrepo.com/download/295402/user-profile.svg"
          } />
        </center>
        <h3 id="fulld">{selectKey?.name} | #{selectKey?.criminalId}</h3>
        <Divider />
        <div className="detailsz">
          <p id="labz">Criminal Details</p>
          <p id="info">Gender : {selectKey?.gender}</p>
          <br />
          <p id="info">Age : {new Date().getFullYear() - new Date(selectKey?.dob)?.getFullYear()}</p>
          <br />
          <p id="info">DOB: {selectKey?.dob?.split("T")[0]}</p>
          {/* <p id="info">DOB : {selectKey?.dob.split("T")[0]}</p> */}
          <br />
          <p id="info">Address : {selectKey?.address}</p>
          <br />
          <Divider />
          <p id="labz">Crime Details</p>
          <p id="info">Arrested On : {selectKey?.arrestedOn}</p>
          <br />
          <p id="info">Court Info. : {selectKey?.courtInformation}</p>
          <br />
          <p id="info">Crime Details : {selectKey?.crimeDetails}</p>
          <br />
          <p id="info">Case ID : {selectKey?.criminalId}</p>
          <br />
          <p id="info">Court Info. : {selectKey?.courtInformation}</p>
          <br />
          <p id="info">Probation Status : {selectKey?.probationStatus}</p>
          <br />
          <Divider />
          <p id="labz">physicalCharacteristics</p>
          <br />
          <p id="info">Height : {selectKey?.height}</p>
          <br />
          <p id="info">Height : {selectKey?.weight}</p>
          <br />
        </div>

      </div>

    </MDBox>
  );

  const Crime = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );

  useEffect(() => {
    setLoading(true);
    Axios.get("/api/v1/app/criminal/getAll")
      .then((res) => {
        setLoading(false);
        setCriminals(res.data.criminals);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const rows = criminals.map((criminal) => {
    return {
      
      name: (
        <Name
          image={
            criminal?.criminalPhotoFileName
              ? criminal.criminalPhotoFileName
              : "https://www.svgrepo.com/download/295402/user-profile.svg"
          }
          name={criminal.name}
          id={criminal.criminalId}
        />
      ),
      gender: <Crime title="male" />,
      age: (
        <Crime title={new Date().getFullYear() - new Date(criminal?.dob)?.getFullYear()} />
        // <MDBox ml={-1}>
        //   <Name badgeContent={new Date().getFullYear()- new Date(criminal?.dob)?.getFullYear()}  />
        //   {/* <MDBadge title="hello" badgeContent={new Date().getFullYear()- new Date(criminal?.dob)?.getFullYear()} color="error" variant="gradient" size="sm" /> */}
        // </MDBox>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {criminal.probationStatus}
        </MDTypography>
      ),
      action: (
        <MDTypography 
          onClick={() => handleShowDetails(criminal)}
          component="a"
          href="#"
          variant="p"
          color="white"
          style={{backgroundColor:'#4CAF50',height:'50px',width:'100px',paddingTop:'5px',paddingBottom:'5px',paddingLeft:'10px',paddingRight:'10px',borderRadius:'20px'}}
          fontWeight="medium"
        >
          View
        </MDTypography>
      ),
    };
    
  });
 
  return {
    loading,
    columns: [
      { Header: "Name", accessor: "name", width: "20%", align: "left" },
      { Header: " Gender", accessor: "gender", align: "left" },
      { Header: "Age", accessor: "age", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "Action", accessor: "action", align: "left" },
    ],
    rows: filteredRows.length > 0 ? filteredRows : rows, // Use filteredRows if available
  };
};

export default useCriminalData;


