/* eslint-disable prettier/prettier */
// @mui material components
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Footer from "examples/Footer";

import DataTable from "examples/Tables/DataTable";
import CriminalData from "./data/criminals";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import AddCriminal from "layouts/AddCriminalForm/addCriminal";
import Slide from "@mui/material/Slide";
import './criminaltablesidebar.css'
import SearchBar from '@mkyy/mui-search-bar';
import CircularProgress from "@mui/material/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function CriminalsTable() {
  const { loading,columns, rows } = CriminalData();

  //SEARCH BAR STATES
  const [textFieldValue, setTextFieldValue] = useState("");
  const [filteredRows, setFilteredRows]  =useState("");

  //SEARCH BAR FUNCTION
  const handleSearch = () => {
    console.log("test")
    // if (textFieldValue.trim() === "") {
    //   setFilteredRows(rows);
    // } else {
    //   const filteredData = rows.filter(row => {
    //     return (
    //       row.name.props.children?.toLowerCase().includes(textFieldValue.toLowerCase()) ||
    //       row.criminalId.props.children?.toLowerCase().includes(textFieldValue.toLowerCase())
    //     );
    //   });
    //   setFilteredRows(filteredData);
    // }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //SIDENAV FUNCTION
  function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
  }
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Criminals List
                </MDTypography>
                <div style={{ float: "right", marginTop: "-30px" }}>
                  <Button onClick={handleClickOpen}
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    Add New Criminal
                    {/* {popupshow && <CrimeDilog/>} */}
                  </Button>
                </div>

                <div style={{ paddingRight: '20px', float: "right", marginTop: "-30px" }}>
                  <SearchBar
                    value={textFieldValue}
                    onChange={newValue => setTextFieldValue(newValue)}
                    onSearch={handleSearch}
                    className="searchbar"
                  />
                </div>
              </MDBox>
              <MDBox pt={3}>
              {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />)}

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <br />
          <AddCriminal />
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default CriminalsTable;
