/* eslint-disable prettier/prettier */
import React, { useState } from "react";
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
import "../AddCrimeForm/selectpopup.css";
import CircularProgress from "@mui/material/CircularProgress";


function AddCriminal() {
    function testFun() {
        console.log("Hello");
    }


    //REQUIRED FIELD ERROR MESSAGE
    const [errorMessage, setErrorMessage] = useState("");

    //✅ BACKEND
    const [criminalData, setCriminalData] = useState({
        name: "",
        gender: "",
        dob: null,
        address: "",
        physicalCharacteristics: {
            height: "",
            weight: "",
        },
        crimeDetails: "",
        arrestedOn: null,
        courtInformation: "",
        probationStatus: "",
        criminalPhotoFileName: ""
    })

    const [criminalPhoto, setCriminalPhoto] = useState("")
    const [fileErr, setFileErr] = useState("")
    const [loader, setLoader] = useState(false)

    // const Success = () => toast.success('Successfully Posted');

    const submitFunction = async () => {
            setLoader(true)
            var filename = ""
            var data = criminalData
            if (criminalPhoto != null) {
                // filename = await convertImg()
                data = {
                    ...data,
                    criminalPhotoFileName: criminalPhoto
                }
                console.log(data);
            }

            if (
                !criminalData.name ||
                !criminalData.gender ||
                !criminalData.crimeDetails
            ) {
                setErrorMessage("Please fill out all the required fields.");
                setLoader(false);
                return;
            }
            else{

            Axios.post('/api/v1/app/criminal/add', data)
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

    const uploadPhoto = async () => {
        // e.preventDefault();

        const formData = new FormData();
        formData.append('file', criminalPhoto);

        const file = await Axios.post('/api/v1/app/file/add?location=criminalPhoto', formData, {
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

    const convertToBase64 = (file) => {
        const maxSize = 50 * 1024;

        return new Promise((resolve, reject) => {
            if (file.size > maxSize) {
                setFileErr("File size should be less than 50KB")
                return;
            }

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
                console.log(error)
            };
        });
    };


    const handleFileUpload = async (e) => {
        setFileErr("")
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setCriminalPhoto(base64);
    };


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
                        Add New Criminal
                    </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                    <Card>
                        <br />
                        {/* ✅ CRIMINAL DETAILS */}
                        <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Criminal Details :</label>

                        <MDInput required label="Name (Required)" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                name: e.target.value,
                            }))}
                        />
                        <br />
                        {/* <MDInput label="Gender" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                gender: e.target.value,
                            }))}
                        />
                        <br/> */}
                        <InputLabel style={{ width: '600px', height: '20px', justifyContent: 'center', alignSelf: 'center' }}>Gender (Required)</InputLabel>
                        <Select required placeholder="Gender" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center', color: "black" }}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                gender: e.target.value,
                            }))}>
                            <MenuItem style={{ color: 'black' }} value="male">Male</MenuItem>
                            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                            <MenuItem style={{ color: 'black' }} value="female">Female</MenuItem>
                            <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                            <MenuItem style={{ color: 'black' }} value="female">Other</MenuItem>

                        </Select>
                        <br />

                        <MDInput type="date" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                dob: e.target.value,
                            }))}
                        />
                        <br />
                        <MDInput label="Address" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                address: e.target.value,
                            }))}
                        />
                        <br />
                        {/* ✅ HEIGHT WEIGHT FIELDS */}
                        <div style={{ justifyContent: 'center', display: 'inline-flex', selfAlign: 'center' }}>
                            <MDInput label="Height" size="large" style={{ width: '290px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
                                onChange={e => setCriminalData(pre => ({
                                    ...pre,
                                    physicalCharacteristics: {
                                        height: e.target.value,
                                        height: criminalData.physicalCharacteristics.height
                                    }
                                }))}
                            />
                            &nbsp; &nbsp;
                            <MDInput label="Weight" size="large" style={{ width: '290px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
                                onChange={e => setCriminalData(pre => ({
                                    ...pre,
                                    physicalCharacteristics: {
                                        weight: e.target.value,
                                        weight: criminalData.physicalCharacteristics.weight
                                    }
                                }))}
                            />

                        </div>


                        <Divider />

                        <MDInput required label="Crime Details (Required)" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                crimeDetails: e.target.value,
                            }))}
                        />
                        {/* <br />
                        <MDInput type="date" size="large" style={{ width: '600px', height: '50px', justifyContent: 'center', alignSelf: 'center' }}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                arrestedOn: e.target.value,
                            }))}
                        /> */}
                        <br />
                        <Divider />
                        {/* ✅ COURT INFORMATIOJ */}
                        <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}> Court Information : </label>
                        <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />

                        <MDInput label="Details" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }} multiline rows={5}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                courtInformation: e.target.value,
                            }))}
                        />
                        <br />
                        <MDInput label="Probation Status" style={{ width: '600px', justifyContent: 'center', alignSelf: 'center' }}
                            onChange={e => setCriminalData(pre => ({
                                ...pre,
                                probationStatus: e.target.value,
                            }))}
                        />
                        <br />
                        <Divider />
                        {/* ✅ PHOTOS UPLOAD */}
                        <label id="labmain" style={{ color: 'black', textAlign: 'center', fontSize: '18px' }}>Upload Photos : </label>
                        <hr style={{ height: '10px', color: 'transparent', border: 'none', outline: 'none' }} />
                        <div style={{ display: 'inline-flex', justifyContent: 'center' }}>

                            {
                                fileErr != "" &&
                                <b style={{ color: 'red' }}>{fileErr}</b>
                            }
                            <input id="photo" name="photo" type="file" accept="image/" onChange={handleFileUpload} />
                            {/* <Button variant="outlined" color="info" size="small" style={{ backgroundColor: '#4CAF50', color: 'white', width: '300px', height: '40px', fontSize: '14px', justifyContent: 'center', alignSelf: 'center' }}>Upload</Button> */}
                        </div>
                        <br />
                        {/* ✅ SUBMIT BUTTON - END
                        <Button onClick={submitFunction} variant="contained" size="medium" style={{ color: 'white', width: '600px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >Sumbit</Button> */}

                        {/* ✅ SUBMIT BUTTON - END */}
                        <Button onClick={submitFunction} variant="contained" size="medium" style={{ color: 'white', width: '600px', height: '50px', fontSize: '16px', justifyContent: 'center', alignSelf: 'center' }} >  {loader ? <CircularProgress color="white" size={24} /> : "Submit"}</Button>
                        <br />
                        {/* Error Snackbar */}
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
        </Grid>
        //     </Grid>
        //   </MDBox>
        // </DashboardLayout>
    );
}

export default AddCriminal;
