import * as React from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Label } from '@material-ui/icons';
import LinearProgress from '@mui/material/LinearProgress';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    padding: 10,
    height: '100%',
    background: 'white',
    borderRadius: 10,
    border: '1px solid grey',
    color: 'grey',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  title: {
    marginTop: 10,
  },
  iconSection: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    border: '1px solid #99CCFF',
    backgroundColor: 'linear-gradient(to bottom right, rgba(235, 245, 255, 0.3) 25%, rgba(243, 246, 249, 0.2) 100%)',
    boxShadow: '0px 1px 6px 0px rgba(0, 115, 230, 0.2), 0px 2px 12px 0px rgba(234, 237, 241, 0.3) inset',
  },
  firstCardContainer: {
    padding: 10,
    height: '100%',
    background: 'linear-gradient(to bottom right, rgba(235, 245, 255, 0.3) 25%, rgba(243, 246, 249, 0.2) 100%)',

    borderRadius: 10,
    border: '1px solid #99CCFF',
    color: '#1C2025',
    boxShadow: '0px 2px 8px #CCE5FF',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
}));


const steps = ['Type', 'Model', 'Input Sample', 'Generate'];

const FileUploader = () => {

  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv' && selectedFile.size <= 102400) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        const csvDataArray = reader.result.split('\n').map((row) => row.split(','));
        setCsvData(csvDataArray);
        console.log(csvDataArray)
      };
      reader.readAsText(selectedFile);
    } else {
      alert('Please select a CSV file with a size less than or equal to 100KB');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv' && droppedFile.size <= 102400) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = () => {
        const csvDataArray = reader.result.split('\n').map((row) => row.split(','));
        setCsvData(csvDataArray);
      };
      reader.readAsText(droppedFile);
    } else {
      alert('Please select a CSV file with a size less than or equal to 100KB');
    }
  };


  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: '1.5px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '20px',
        cursor: 'pointer',
      }}
    >
      {file ? (
        <div>
          <p>Selected File: {file.name}</p>
          <button onClick={() => {
            setFile(null);
            setCsvData(null);
          }}>Remove File</button>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '15px' }}>Drag and drop a CSV file here (maximum size: 100KB), or click to select a file</p>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};


function DataGenDashboard() {

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const MenuProps = {}; // Define MenuProps here
  const [uploadOption, setUploadOption] = useState('continue');
  const [progress, setProgress] = useState(0);

  const handleContinueWithoutFile = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep(3);
  };

  const handleUploadOptionChange = (event) => {
    setUploadOption(event.target.value);
  };
  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();
  const [generatedData, setGeneratedData] = useState([]);

  const [loading, setLoading] = useState(false);

  // MODEL SELECT 
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const handleStep = step => () => setActiveStep(step);

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleCardClick = () => {

  };

  // DATA GENERATION
  const handleGenerateData = async () => {
    try {
      const response = await fetch('http://localhost:3000/generate-data');
      const responseData = await response.json(); // Parse response as JSON
      const generatedDataString = responseData.data.replace(/```json\n|```/g, ''); // Remove triple backticks
      const generatedData = JSON.parse(generatedDataString); // Parse JSON data
      setGeneratedData(generatedData);
    } catch (error) {
      console.error('Error generating synthetic data:', error);
    }
  };

  // const handleNext = () => {
  //   const newActiveStep = isLastStep() && !allStepsCompleted()
  //     ? steps.findIndex((step, i) => !(i in completed))
  //     : activeStep + 1;
  //   setActiveStep(newActiveStep);
  // };

  const handleNext = async () => {
    if (activeStep === 2) {
      await handleGenerateData();
    }
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // FUNCTION FOR ANALYSIS SECTION
  const handleOpenBottomAppSheet = () => {
    // console.log("app bottom sheet")
  };

  // EXPORT CSV
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + generatedData.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "generated_data.csv");
    document.body.appendChild(link); // REQUIRED FOR FIREFOX
    link.click();
  };

  // EXPORT TEXT FILE
  const handleExportText = () => {
    const textContent = JSON.stringify(generatedData, null, 2);
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "generated_data.txt");
    document.body.appendChild(link); // REQUIRED FOR FIREFOX
    link.click();
    URL.revokeObjectURL(url);
  };

  // EXPORT PDF
  const handleExportPDF = () => {
    console.log("PDF EXPORT")
  };

  // EXPORT JSON FILE
  const handleExportJSON = () => {
    const jsonData = JSON.stringify(generatedData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "generated_data.json");
    document.body.appendChild(link); // REQUIRED FOR FIREFOX
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAnalysis = () => {
    console.log('Analysis');
  };



  return (
    <DashboardLayout>
      <Grid item xs={12} mt={2} style={{ borderRadius: '30px' }}>
        <Card>
          <MDBox
            mx={2}
            mt={-2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Gemini Synthetic Data GEN
            </MDTypography>
          </MDBox>
          <MDBox mx={5} mt={5} py={3} px={2}>
            <Box sx={{ width: '100%' }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div style={{ padding: '20px' }}>
                {activeStep === 0 && (
                  <div>
                    <Typography variant="h6" align="center" mt={2} mb={2} className={classes.title}>
                      Select Synthetic Data Type
                    </Typography>
                    <Grid container spacing={3}>
                      {[
                        { icon: <TipsAndUpdatesIcon style={{ color: '#0073E6' }} />, title: 'Gemini SyntheticGAN' },
                        { icon: <DataUsageIcon />, title: 'Image Augmentation' },
                        { icon: <AutoGraphIcon />, title: 'Transform' },

                      ].map((item, index) => (
                        <Grid key={index} height={150} item xs={12} sm={4}>
                          <Box className={`${classes.cardContainer} ${index === 0 ? classes.firstCardContainer : ''}`} onClick={handleCardClick}>
                            <Box display="flex" justifyContent="center" className={classes.iconSection}>
                              <IconButton>
                                {item.icon}
                              </IconButton>
                            </Box>
                            <Typography variant="h6" align="center" className={classes.title}>
                              {item.title}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}
                
                {activeStep === 1 && (
                  <div >
                    <Typography variant="h6" align="center" mt={2} mb={2} className={classes.title}>
                      Select Synthetic GAN Model
                    </Typography>
                    <FormControl fullWidth style={{ width: '300px', marginTop: '30px' }}>
                      <InputLabel id="demo-simple-select-label">Models</InputLabel>
                      <Select style={{ height: '50px' }}
                        labelId="Models"
                        label="Models"
                        id="demo-simple-select"
                        onChange={handleChange}
                        value={10}
                      >
                        <MenuItem value={10}>Gemini 1.0 Pro</MenuItem>
                        <MenuItem disabled value={20}>Gemini 1.0 Ultra</MenuItem>
                        <MenuItem disabled value={30}>Gemini 1.5 Pro</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                )}
                {activeStep === 2 && (
                  <div >
                    <Typography variant="h6" align="center" mt={2} mb={2} className={classes.title}>
                      Input Sample Data
                    </Typography>
                    <RadioGroup
                      style={{ fontSize: '20px' }}
                      aria-label="upload-option"
                      name="upload-option"
                      value={uploadOption}
                      onChange={handleUploadOptionChange}
                    >
                      <FormControlLabel value="upload" control={<Radio />} label="Continue Without Data" />
                      {uploadOption === 'upload' && <p style={{ fontSize: '15px' }}>Generate for boston House prediction with input features : CRIM   | ZN  | INDUS | CHAS | NOX  | RM   | AGE  | DIS  | RAD | TAX </p>}
                      <FormControlLabel value="continue" control={<Radio />} label="Upload Data" />
                    </RadioGroup>
                    {uploadOption === 'continue' && <FileUploader />}
                  </div>
                )}
                {activeStep === 3 && (
                  <div>
                    <Typography variant="h6" align="center" mt={2} mb={2} className={classes.title}>
                      Generated Data:

                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '10px', marginBottom: '20px' }}>
                      <Button
                        variant="outlined"
                        size="medium"
                        style={{ border: '1px solid #1A73E8', color: '#1A73E8', marginRight: '20px', transition: 'background-color 0.3s, color 0.3s' }}
                        onClick={handleAnalysis}
                        className="hoverEffect"
                      >
                        Analysis
                      </Button>
                      <Button
                        variant="outlined"
                        size="medium"
                        style={{ border: '1px solid #1A73E8', color: '#1A73E8', marginRight: '20px', transition: 'background-color 0.3s, color 0.3s' }}
                        onClick={handleExportCSV}
                        className="hoverEffect"
                      >
                        Export CSV
                      </Button>
                      <Button
                        variant="outlined"
                        size="medium"
                        style={{ border: '1px solid #1A73E8', color: '#1A73E8', marginRight: '20px', transition: 'background-color 0.3s, color 0.3s' }}
                        onClick={handleExportText}
                        className="hoverEffect"
                      >
                        Export Text
                      </Button>
                      {/* <Button
                        variant="outlined"
                        size="medium"
                        style={{ border:'1px solid #1A73E8',color: '#1A73E8', marginRight: '20px', transition: 'background-color 0.3s, color 0.3s' }}
                        onClick={handleExportPDF}
                        className="hoverEffect"
                      >
                        Export PDF
                      </Button> */}
                      <Button
                        variant="outlined"
                        size="medium"
                        style={{ border: '1px solid #1A73E8', color: '#1A73E8', transition: 'background-color 0.3s, color 0.3s' }}
                        onClick={handleExportJSON}
                        className="hoverEffect"
                      >
                        Export JSON
                      </Button>
                    </div>

                    {generatedData && generatedData.length > 0 ? (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                          <thead>
                            <tr>
                              {Object.keys(generatedData[0]).map((key) => (
                                <th key={key} style={{ fontSize: '15px', backgroundColor: 'black', color: 'white', padding: '8px' }}>{key}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {generatedData.map((row, index) => (
                              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white' }}>
                                {Object.values(row).map((value, i) => (
                                  <td key={i} style={{ fontSize: '15px', border: '1px solid #ddd', padding: '8px' }}>{value}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <Typography variant="body1" align="center">
                        No generated data available.
                      </Typography>
                    )}
                  </div>
                )}

              </div>
              <div style={{ padding: '0px 20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    style={{ border: '1px solid grey', color: 'grey' }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }} style={{ color: 'white', backgroundColor: 'black' }}>
                    {isLastStep() ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </div>
            </Box>
          </MDBox>
        </Card>
      </Grid>
    </DashboardLayout >
  );
}

export default DataGenDashboard;
