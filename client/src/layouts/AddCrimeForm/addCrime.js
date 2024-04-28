/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LoopIcon from '@mui/icons-material/Loop';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Axios } from "Config/Axios/Axios";
import './selectpopup.css';
import $ from 'jquery';
import DataTable from "examples/Tables/DataTable";
import CircularProgress from "@mui/material/CircularProgress";
import AddCriminal from "layouts/AddCriminalForm/addCriminal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
// import SearchBar from "material-ui-search-bar";
import SearchBar from '@mkyy/mui-search-bar';
import { ImageList } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddCrime() {

  //✅ REQUIRED FIELD ERROR MESSAGE
  const [errorMessage, setErrorMessage] = useState("");


  //✅ SUSPECT IMAGE SET
  const [suspectImg, setSuspectImg] = useState("");

  const [selectedSuspect, setSelectedSuspect] = useState(null);


  //✅ SEARCH BAR STATES
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleSearch = labelOptionValue => {
    //...
    console.log(labelOptionValue);
  };


  //✅ SELECT CRIMINAL POPUP CONTENT
  const [loading, setLoading] = useState(false);
  const [criminals, setCriminals] = useState([]);

  useEffect(() => {
    setLoading(true); // Start loading
    Axios.get("/api/v1/app/criminal/getAll")
      .then((res) => {
        setCriminals(res.data.criminals);
        console.log(res);
        setLoading(false); // Data loaded, set loading to false

      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Data loaded, set loading to false

      });
  }, []);

  var date = new Date("2013-03-10T02:00:00Z");
  date.toISOString().substring(0, 10);

  const rows = criminals.filter((criminal) => criminal.name.toLowerCase().includes(textFieldValue.toLowerCase())).map((criminal) => ({
    image: (
      <img
        src={
          criminal?.criminalPhotoFileName
            ? criminal.criminalPhotoFileName
            : "https://www.svgrepo.com/download/295402/user-profile.svg"
        }
        alt="photo"
        width="50px" // Set the width of the image
        height="50px" // Set the height of the image
      />
    ),
    name: criminal.name,
    age: new Date().getFullYear() - new Date(criminal?.dob)?.getFullYear(),
    option: (
      <Button className="viewmore"
        onClick={() => handleSelectCriminal(criminal)}
        style={{ backgroundColor: '#4CAF50', color: 'white', height: '30px', width: '10px', borderRadius: '20px' }}
      >
        Select
      </Button>
    ),
  }));


  const [open, setOpen] = React.useState(false);

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //✅ BACKEND
  const [crimeData, setCrimeData] = useState({
    caseId: "",
    incidentDetails: "",
    date: "",
    location: "",
    type: "",
    status: "",
    victim: {
      name: "",
      age: "",
      gender: "",
      address: ""
    },
    suspect: "",
    witness: {
      name: "",
      contact: "",
      statement: "",
    },
    policeReport: {
      details: "",
      filename: ""
    },
    mediaReport: {
      details: "",
      filename: ""
    },
    dayMetaData: {
      day: "",
      year: "",
      dayOfWeek: "",
      week: ""
    }
  })


  //✅ SELECT CRIMINAL POPUP FN
  function handleSelectCriminal(criminal) {
    //TO DISPLAY SUSPECT PROFILE AFTER SELECTING FROM THE LIST
    setSelectedSuspect(criminal);
    setCrimeData({
      ...crimeData,
      suspect: criminal.criminalId
    })
    $(".custom-model-main").removeClass('model-open');

  }

  console.log(crimeData);

  const [loader, setLoader] = useState(false)

  const [policeReportFile, setPoliceReportFile] = useState(null)
  const [mediaReportFile, setMediaReportFile] = useState(null)

  const submitFunction = async () => {
    setLoader(true)
    var filename = ""
    var data = crimeData

    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August", "September",
      "October", "November", "December"
    ];

    const currentDate = new Date(crimeData.date);

    // Get the day, month, year, and day of the week
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.getDay();

    if (
      !crimeData.status ||
      !crimeData.date ||
      !crimeData.incidentDetails
    ) {
      setErrorMessage("Please fill out all the required fields.");
      setLoader(false)
      return;
    }

    else {

      data = {
        ...data,
        stringDate: crimeData.date?.split("T")[0].split("-").reverse().join("-"),
        caseId: new Date().getTime(),
        dateMetaData: {
          day: day,
          month: month,
          year: year,
          dayOfWeek: dayOfWeek,
          week: ""
        }
      }



      if (policeReportFile != null) {
        filename = await uploadFile(policeReportFile, "policeReport")
        data = {
          ...data,
          policeReport: {
            details: crimeData.policeReport.details,
            filename: filename
          }
        }
      }

      if (mediaReportFile != null) {
        filename = await uploadFile(mediaReportFile, "mediaReport")
        data = {
          ...data,
          mediaReport: {
            details: crimeData.mediaReport.details,
            filename: filename
          }
        }
      }

      Axios.post('/api/v1/app/crime/add', data)
        .then((res) => {
          console.log(res);
          setLoader(false)
          window.location.reload();

        })
        .catch(err => {
          console.log(err);
          setLoader(false)
        })

    }
  }


  const uploadFile = async (fileData, folder) => {
    // e.preventDefault();

    const formData = new FormData();
    formData.append('file', fileData);

    const file = await Axios.post(`/api/v1/app/file/add?location=${folder}`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("filename : ", response.data);
        return response.data
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      })
    return file
  }

  //SELECT CRIMINAL FILE
  $("#selectcriminal").on('click', function () {
    $(".custom-model-main").addClass('model-open');
  });
  $(".close-btn, .bg-overlay").click(function () {
    $(".custom-model-main").removeClass('model-open');
  });




  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <MDBox pt={6} pb={3}>
    //     <Grid container spacing={10}>
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
            Add New Crime
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <Card>
            <br />
            {/* ✅ CASE DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Case Details :</label>

            {/* <MDInput label="ID" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                caseId: e.target.value,
              }))}
            />
            <br /> */}
            <MDInput label="Incident Details (Required)" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                incidentDetails: e.target.value,
              }))}
            />
            <br />
            <InputLabel style={{ width: '600px', height: '20px', justifyContent: 'center', alignSelf: 'center' }}>Date (Required)</InputLabel>
            <MDInput type="date" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                date: e.target.value,
              }))}
            />
            <br />
            <MDInput size="large" type="time" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                time: e.target.value,
              }))} />
            <br />
            <MDInput label="Crime Type" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                type: e.target.value,
              }))} />
            <br />
            <MDInput label="Location" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                location: e.target.value,
              }))} />
            <br />
            {/* <MDInput label="Status" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br /> */}

            {/* <div style={{justifyContent:'center', display: 'inline-flex',selfAlign:'center'}}>
                    <MDButton  variant="outlined" color="error"><Icon><PriorityHighIcon/></Icon>&nbsp;OPEN</MDButton> &nbsp;
                    <MDButton  variant="outlined" color="warning"><Icon><LoopIcon/></Icon>&nbsp;INPROGRESS</MDButton>&nbsp;
                    <MDButton  variant="outlined" color="success"><DoneIcon/><Icon></Icon>&nbsp;CLOSED</MDButton>&nbsp;
                  </div> */}
            {/* ✅ STATUS */}
            <InputLabel style={{ width: '600px', height: '20px', justifyContent: 'center', alignSelf: 'center' }}>Case Status (Required)</InputLabel>
            <Select placeholder="Select current status" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                status: e.target.value,
              }))}>
              <MenuItem style={{ background: 'red', color: 'white' }} value="Open">Open</MenuItem>
              <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
              <MenuItem style={{ background: 'orange', color: 'white' }} value="Inprogress">Inprogress</MenuItem>
              <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
              <MenuItem style={{ background: 'green', color: 'white' }} value="Closed">Closed</MenuItem>
            </Select>

            <br />
            <Divider />
            {/* ✅ VICTIMS DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Victims Information : </label>
            <MDInput label="Name" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                victim: {
                  name: e.target.value,
                  age: crimeData.victim.age,
                  address: crimeData.victim.address,
                }
              }))}
            />
            <br />
            <MDInput label="Address" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} onChange={e => setCrimeData(pre => ({
              ...pre,
              victim: {
                name: e.target.value,
                age: crimeData.victim.age,
                address: crimeData.victim.address,
              }
            }))} />
            <br />
            <MDInput label="Age" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                victim: {
                  name: e.target.value,
                  age: crimeData.victim.age,
                  address: crimeData.victim.address,
                }
              }))}
            />
            <br />
            <Divider />
            {/* ✅ SUSPECT DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Suspect Information : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
            <div style={{ display: 'inline-flex', justifyContent: 'center' }}>
              <Button id="selectcriminal" variant="contained" size="medium" style={{ color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >Select</Button>&nbsp;&nbsp;
              <Button onClick={handleClickOpen} variant="outlined" color="success" size="medium" style={{ backgroundColor: '#4CAF50', color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }}>Add New</Button>
            </div>
            <br />

            {/* <center><div className="suspect_profile">
             <img height="auto" width="100px" id="suspect_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZKTSTsxuO1oniA3yHQJsphf_01yYw6fs04Kwzzr2Sx50-8chw6wwuSNT4tns8RRb8eNY&usqp=CAU" />
             <p id="suspect_name" > SUSPECT NAME</p>
             <p id="suspect_id">SUSPECT ID</p>
            </div>
            </center> */}

            {selectedSuspect && (
              <center>
                <div className="suspect_profile">
                  <img
                    height="auto"
                    width="100px"
                    id="suspect_img"
                    src={
                      selectedSuspect?.criminalPhotoFileName
                        ? selectedSuspect.criminalPhotoFileName
                        : "https://www.svgrepo.com/download/295402/user-profile.svg"
                    }
                    alt="Suspect"
                  />
                  <hr className="profile-line" />
                  <div className="right-column">
                    <p id="suspect_name">{selectedSuspect.name}</p>
                    <p id="suspect_id">#{selectedSuspect.criminalId}</p>
                  </div>
                </div>
              </center>
            )}

            <br />
            <Divider />
            {/* ✅ WITHNESS DETAILS */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Witness Details : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

            <MDInput label="Name" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                witness: {
                  name: e.target.value,
                  contact: crimeData.witness.contact,
                  statement: crimeData.witness.statement,
                }
              }))} />
            <br />
            <MDInput label="Statement" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} onChange={e => setCrimeData(pre => ({
              ...pre,
              witness: {
                name: e.target.value,
                contact: crimeData.witness.contact,
                statement: crimeData.witness.statement,
              }
            }))} />
            <br />
            <MDInput label="Mobile NUmber" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                witness: {
                  name: e.target.value,
                  contact: crimeData.witness.contact,
                  statement: crimeData.witness.statement,
                }
              }))} />
            <br />
            <Divider />
            {/* ✅ POLICE REPORT */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Police Report : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

            <MDInput label="Report" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                policeReport: {
                  details: e.target.value,
                  filename: crimeData.policeReport.filename
                }
              }))} />
              <Button
              className="w-full bg-green-500 hover:bg-sky-700 text-white py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-300">
              <MDInput style={{ width: '600px', justifyContent: 'center', alignSelf: 'center',backgroundColor:'black',color:'white'}} type="file" onChange={e => setPoliceReportFile(e.target.files[0])}/>
            </Button>
            <br />

            {/* ✅ MEDIA REPORT */}
            <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Media Reports : </label>
            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

            <MDInput label="Report" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
              onChange={e => setCrimeData(pre => ({
                ...pre,
                mediaReport: {
                  details: e.target.value,
                  filename: crimeData.mediaReport.filename
                }
              }))} />
            <Button
              className="w-full bg-green-500 hover:bg-sky-700 text-white py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-300">
              <MDInput style={{ width: '600px', justifyContent: 'center', alignSelf: 'center',backgroundColor:'black',color:'white'}} type="file" onChange={e => setMediaReportFile(e.target.files[0])}/>
            </Button>
            <br />
            {/* ✅ SUBMIT BUTTON - END */}
            <Button onClick={submitFunction} variant="contained" size="medium" style={{ color: 'white', width: '600px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >
              {loader ? <CircularProgress color="white" size={24} /> : "Submit"}
            </Button>
            <Snackbar anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }} open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
              <MuiAlert onClose={() => setErrorMessage("")} severity="error" elevation={6} variant="filled">
                {errorMessage}
              </MuiAlert>
            </Snackbar>
            <br />
          </Card>
        </MDBox>
      </Card>
      {/* ✅ SELECT NEW CRIMINAL */}
      <div className="custom-model-main">
        <div className="custom-model-inner">
          <div className="close-btn">×</div>
          <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">
              {/* <SearchBar
          // value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        /> */}
              <SearchBar
                value={textFieldValue}
                onChange={newValue => setTextFieldValue(newValue)}
                onSearch={handleSearch}
                className="searchbar"
              />
              <MDBox pt={3}>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  <DataTable
                    table={{
                      columns: [
                        { Header: "Profile", accessor: "image", width: "15%" },
                        { Header: "Name", accessor: "name", width: "15%" },
                        // { Header: "Status", accessor: "status", width: "15%" },
                        { Header: "Age", accessor: "age", width: "15%" },
                        // { Header: "Viewmore", accessor: "EDIT", width: "12%" },
                        { Header: "Option", accessor: "option", width: "15%" },
                      ],
                      rows: rows,
                    }}
                  />
                )}
              </MDBox>
            </div>
          </div>
        </div>
        <div className="bg-overlay"></div>

        {/*✅  ADD NEW CRIMINAL  */}
      </div>
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              {/* <Button autoFocus color="inherit" onClick={handleClose}>
              
            </Button> */}
            </Toolbar>
          </AppBar>
          <br />
          <AddCriminal />
        </Dialog>

      </div>
    </Grid>
    //     </Grid>
    //   </MDBox>
    // </DashboardLayout>
  );
}

export default AddCrime;
