/* eslint-disable prettier/prettier */
import React from "react";
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

export function PositionedSnackbar(){
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
};

function AddCrime() {

  // ✅ SNACK BAR ALERTS
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={10}>
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

                  <MDInput label="ID" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <MDInput label="Incident Details" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} />
                  <br />
                  <MDInput type="date" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <MDInput size="large" type="time" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <MDInput label="Crime Type" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <MDInput label="Location" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  {/* <MDInput label="Status" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br /> */}

                  {/* <div style={{justifyContent:'center', display: 'inline-flex',selfAlign:'center'}}>
                    <MDButton  variant="outlined" color="error"><Icon><PriorityHighIcon/></Icon>&nbsp;OPEN</MDButton> &nbsp;
                    <MDButton  variant="outlined" color="warning"><Icon><LoopIcon/></Icon>&nbsp;INPROGRESS</MDButton>&nbsp;
                    <MDButton  variant="outlined" color="success"><DoneIcon/><Icon></Icon>&nbsp;CLOSED</MDButton>&nbsp;
                  </div> */}
                  {/* ✅ STATUS */}
                  <InputLabel style={{ width: '600px', height: '20px', justifyContent: 'center', alignSelf: 'center' }}>Case Status</InputLabel>
                  <Select placeholder="Select current status" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}>
                    <MenuItem style={{ background: 'red', color: 'white' }} value={1}>Open</MenuItem>
                    <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                    <MenuItem style={{ background: 'orange', color: 'white' }} value={2}>Inprogress</MenuItem>
                    <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                    <MenuItem style={{ background: 'green', color: 'white' }} value={3}>Closed</MenuItem>
                  </Select>

                  <br />
                  <Divider />
                  {/* ✅ VICTIMS DETAILS */}
                  <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Victims Information : </label>
                  <MDInput label="Name" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <MDInput label="Address" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} />
                  <br />
                  <MDInput label="Age" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <Divider />
                  {/* ✅ SUSPECT DETAILS */}
                  <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Suspect Information : </label>
                  <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                  <div style={{ display: 'inline-flex', justifyContent: 'center' }}>
                    <Button variant="contained" size="medium" style={{ color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >Select</Button>&nbsp;&nbsp;
                    <Button variant="outlined" color="success" size="medium" style={{ backgroundColor: '#4CAF50', color: 'white', width: '200px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }}>Add New</Button>
                  </div>
                  <br />
                  <Divider />
                  {/* ✅ WITHNESS DETAILS */}
                  <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Witness Details : </label>
                  <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

                  <MDInput label="Name" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <MDInput label="Statement" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} />
                  <br />
                  <MDInput label="Mobile NUmber" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }} />
                  <br />
                  <Divider />
                  {/* ✅ POLICE REPORT */}
                  <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Police Report : </label>
                  <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

                  <MDInput label="Report" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} />
                  <br />

                  {/* ✅ MEDIA REPORT */}
                  <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Media Reports : </label>
                  <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

                  <MDInput label="Report" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5} />
                  <br />
                    {/* ✅ SUBMIT BUTTON - END */}
                  <Button onClick={PositionedSnackbar({ vertical: 'top', horizontal: 'center' })} variant="contained" size="medium" style={{ color: 'white', width: '600px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >Sumbit</Button>
                  <br />
                </Card>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddCrime;
