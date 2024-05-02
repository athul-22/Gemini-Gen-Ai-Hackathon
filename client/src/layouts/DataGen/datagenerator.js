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
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Drawer from '@mui/material/Drawer';
import './styles.css';
import Chart from 'chart.js/auto';
import CloseIcon from '@mui/icons-material/Close';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import LogisticRegressionIcon from '@mui/icons-material/SettingsEthernet';
import DecisionTreeIcon from '@mui/icons-material/AccountTree';
import RandomForestIcon from '@mui/icons-material/Groups';
import KMeansIcon from '@mui/icons-material/ScatterPlot';
import NeuralNetworkIcon from '@mui/icons-material/SettingsEthernet';

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
  algorithmData: {
    padding: 10,
    height: '100%',
    background: 'linear-gradient(to bottom right, rgba(235, 245, 255, 0.3) 25%, rgba(243, 246, 249, 0.2) 100%)',
    width: '300px',
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
  backdrop: {
    zIndex: 100000,
    color: '#fff',
  },
  drawer: {
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
  },
}));


const steps = ['Type', 'Model', 'Input Sample', 'Generate'];

function DataGenDashboard() {

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const MenuProps = {}; // Define MenuProps here
  const [uploadOption, setUploadOption] = useState('continue');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (file) => {
    if (file && file.type === 'text/csv' && file.size <= 102400) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result;
        const rows = csvData.split('\n');
        const columnNames = rows[0].split(',');
        const topRows = rows.slice(1, 4).map(row => row.split(','));
        setCsvData({ columnNames, topRows });
        console.log('Column Names:', columnNames);
        console.log('Top 3 Rows:', topRows);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a CSV file with a size less than or equal to 100KB');
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileUpload(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFileUpload(droppedFile);
  };


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

  // const [analysisData, setAnalysisData] = useState({})


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
  // const handleGenerateData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/generate-data');
  //     const responseData = await response.json(); // Parse response as JSON
  //     const generatedDataString = responseData.data.replace(/```json\n|```/g, ''); // Remove triple backticks
  //     const generatedData = JSON.parse(generatedDataString); // Parse JSON data
  //     setGeneratedData(generatedData);
  //   } catch (error) {
  //     console.error('Error generating synthetic data:', error);
  //   }
  // };

  const handleGenerateData = async () => {
    try {
      console.log("FUNCTION CALLED")
      const response = await fetch('http://localhost:3000/generate-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Send an empty body for no CSV data
      });

      if (!response.ok) {
        throw new Error('Failed to generate synthetic data.');
      }

      const responseData = await response.json(); // Parse response as JSON
      const generatedDataString = responseData.data.replace(/```json\n|```/g, ''); // Remove triple backticks
      const generatedData = JSON.parse(generatedDataString); // Parse JSON data
      setGeneratedData(generatedData);
      console.log('Synthetic data generated successfully.');
      handleAnalysis();

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

  // const handleNext = async () => {
  //   if (activeStep === 2) {
  //     handleToggleBackdrop();
  //     await handleGenerateData();
  //     setLoading(false);
  //   }
  //   const newActiveStep = isLastStep() && !allStepsCompleted()
  //     ? steps.findIndex((step, i) => !(i in completed))
  //     : activeStep + 1;
  //   setActiveStep(newActiveStep);
  // };

  const dataset = [
    [59, 57, 86, 21, 'Jan'],
    [50, 52, 78, 28, 'Fev'],
    // Add more data items as needed
  ].map(([x1, x2, y1, y2, month]) => ({
    x: x1,
    y: y1,
    month,
  }));

  const valueFormatter = (value) => `${value}mm`;

  const chartSetting = {
    series: [{ dataKey: 'y', label: 'Y feature', valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };

  const handleNext = async () => {
    if (activeStep === 2) {
      if (uploadOption === 'continue') {
        if (!csvData) {
          alert('Please upload a CSV file first.');
          return;
        }
        handleToggleBackdrop();
        // Extract column names and top 3 rows from csvData
        const { columnNames, topRows } = csvData;

        // Create an object containing column names and top 3 rows
        const dataToSend = {
          columnNames,
          topRows,
        };

        try {
          // Send the data to the backend
          const response = await fetch('http://localhost:3000/generate-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });

          if (!response.ok) {
            throw new Error('Failed to upload CSV data.');
          }

          // Parse response as JSON
          const responseData = await response.json();

          const generatedDataString = responseData.data.replace(/```json\n|```/g, ''); // Remove triple backticks
          const generatedData = JSON.parse(generatedDataString); // Parse JSON data
          setGeneratedData(generatedData);

          console.log('Synthetic data generated successfully.');
          setLoading(false);
          handleAnalysis();
        } catch (error) {
          console.error('Error uploading CSV data:', error);
        }
      } else {
        handleToggleBackdrop();
        await handleGenerateData();
        setLoading(false);
        handleAnalysis();
      }
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


  const handleToggleBackdrop = () => {
    setLoading(!loading);
  };

  const handleCloseBackdrop = () => {
    setLoading(false);
  };

  // ANALYSIS SECTION

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  // BOTTOM DRAWER ANALYSIS SECTIONS API ENDPOINT
  const handleAnalysis = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/analyze-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ generatedData }), // Send generated data to backend
      });

      if (!response.ok) {
        throw new Error('Failed to analyze data.');
      }

      const analysisDataString = await response.text(); // Parse response as text
      const analysisDataCleaned = analysisDataString.replace(/```json\n|```/g, ''); // Remove triple backticks
      const analysisData = JSON.parse(analysisDataCleaned); // Parse cleaned JSON data

      console.log('Analysis Data:', analysisData);

      // Check if analysisData contains the expected properties
      if (analysisData && analysisData.parts) {
        const { parts } = analysisData;
        if (parts.length > 0) {
          // Initialize an object to store the parsed analysis data
          const parsedAnalysis = {
            dataTypes: {},
            potentialUsers: [],
            models: [],
            graphDataSample: {
              x: [],
              y: []
            }
          };
          parts.forEach(part => {
            const text = part.text;
            if (text.includes('data_types')) {
              const dataTypesStart = text.indexOf('{');
              const dataTypesEnd = text.lastIndexOf('}');
              const dataTypesStr = text.substring(dataTypesStart, dataTypesEnd + 1);
              parsedAnalysis.dataTypes = JSON.parse(dataTypesStr);
            } else if (text.includes('potential_users')) {
              const usersStart = text.indexOf('[');
              const usersEnd = text.lastIndexOf(']');
              const usersStr = text.substring(usersStart, usersEnd + 1);
              parsedAnalysis.potentialUsers = JSON.parse(usersStr);
            } else if (text.includes('models')) {
              const modelsStart = text.indexOf('[');
              const modelsEnd = text.lastIndexOf(']');
              const modelsStr = text.substring(modelsStart, modelsEnd + 1);
              parsedAnalysis.models = JSON.parse(modelsStr);
            } else if (text.includes('graph_data_sample')) {
              const graphDataStart = text.indexOf('{');
              const graphDataEnd = text.lastIndexOf('}');
              const graphDataStr = text.substring(graphDataStart, graphDataEnd + 1);
              const graphData = JSON.parse(graphDataStr);
              parsedAnalysis.graphDataSample.x = graphData.x;
              parsedAnalysis.graphDataSample.y = graphData.y;
            }
          });

          //setAnalysisData(parsedAnalysis);
        } else {
          console.error('Analysis data parts is empty or not structured as expected.');
        }
      } else {
        console.error('Analysis data is not structured as expected.');
      }
    } catch (error) {
      console.error('Error analyzing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const scatterChartData = Array.from({ length: 30 }, (_, index) => ({
  //   id: `data-${index}`,
  //   x: Math.random() * 100,
  //   y: Math.random() * 100,
  // }));


  // const lineChartData = [4, 9.5, 7, 8.5, 9.1, 9.8];
  // // const lineChartSeries = [
  // //   {
  // //     data: [2, 5.5, 7, 8.5, 16.7, 10],
  // //   },
  // // ];

  // const barChartData = [
  //   { london: 38, paris: 22, newYork: 45, seoul: 12, month: 'A' },
  //   { london: 49, paris: 35, newYork: 30, seoul: 17, month: 'B' },
  //   { london: 28, paris: 47, newYork: 18, seoul: 41, month: 'C' },
  //   { london: 33, paris: 12, newYork: 29, seoul: 37, month: 'D' },
  //   { london: 46, paris: 19, newYork: 40, seoul: 48, month: 'E' },
  //   { london: 21, paris: 41, newYork: 35, seoul: 29, month: 'F' },
  //   { london: 47, paris: 29, newYork: 17, seoul: 30, month: 'G' },
  //   { london: 30, paris: 38, newYork: 42, seoul: 24, month: 'H' },
  //   { london: 45, paris: 11, newYork: 20, seoul: 13, month: 'I' },
  //   { london: 15, paris: 34, newYork: 27, seoul: 49, month: 'J' },
  //   { london: 24, paris: 47, newYork: 14, seoul: 39, month: 'K' },
  //   { london: 40, paris: 16, newYork: 32, seoul: 45, month: 'L' },
  //   { london: 29, paris: 48, newYork: 13, seoul: 33, month: 'M' },
  //   { london: 32, paris: 25, newYork: 46, seoul: 18, month: 'N' },
  //   { london: 17, paris: 31, newYork: 38, seoul: 42, month: 'O' },
  //   { london: 44, paris: 13, newYork: 21, seoul: 27, month: 'P' },
  //   { london: 39, paris: 26, newYork: 39, seoul: 35, month: 'Q' },
  //   { london: 19, paris: 45, newYork: 26, seoul: 16, month: 'R' },
  //   { london: 36, paris: 42, newYork: 36, seoul: 22, month: 'S' },
  //   { london: 25, paris: 18, newYork: 45, seoul: 14, month: 'T' },
  // ];

  // const lineChartSeries = [
  //   {
  //     data: lineChartData,
  //     label: 'Approx Accuracy',
  //   },
  // ];

  const generateScatterChartData = () => {
    return Array.from({ length: 20 }, (_, index) => ({
      id: `data-${index}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  };

  const generateBarChartData = () => {
    return Array.from({ length: 20 }, (_, index) => ({
      london: Math.floor(Math.random() * 40) + 10,
      paris: Math.floor(Math.random() * 40) + 10,
      newYork: Math.floor(Math.random() * 40) + 10,
      seoul: Math.floor(Math.random() * 40) + 10,
      month: String.fromCharCode(65 + index), // Generate alphabet labels
    }));
  };

  const generateLineChartData = () => {
    return Array.from({ length: 30 }, () => Math.random() * 10);
  };

  const scatterChartData = generateScatterChartData();
  const barChartData = generateBarChartData();
  const lineChartData = generateLineChartData();


  const lineChartSeries = [
    {
      data: lineChartData,
      label: 'Approx Accuracy',
    },
  ];


  const algorithmData = [
    { icon: <LogisticRegressionIcon style={{ color: '#0073E6' }} />, title: 'Logistic Regression' },
    { icon: <DecisionTreeIcon />, title: 'Decision Tree' },
    { icon: <RandomForestIcon />, title: 'Random Forest' },
    { icon: <KMeansIcon />, title: 'K-Means Clustering' },
    { icon: <NeuralNetworkIcon />, title: 'Neural Networks' },
  ];


  return (
    <>
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
                      {uploadOption === 'continue' &&
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
                      }

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
                          onClick={handleOpenBottomSheet}
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
        <Backdrop className={classes.backdrop} open={loading} onClick={handleCloseBackdrop} style={{ zIndex: 10000 }}>
          <CircularProgress color="inherit" />
          <center><p>Generating Data! Please wait</p></center>
        </Backdrop>
      </DashboardLayout >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Drawer
          anchor="bottom"
          open={bottomSheetOpen}
          onClose={handleCloseBottomSheet}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          PaperProps={{
            style: { width: '1450px', margin: 'auto', marginBottom: '20px' },
          }}
        >
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '15px', textAlign: 'center', margin: 'auto' }}>Synthetic Data Analysis</Typography>
            <IconButton onClick={handleCloseBottomSheet} style={{ color: 'red' }}>
              <CloseIcon style={{ fontSize: 100, fontWeight: 'bold' }} />
            </IconButton>
          </div>

          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {generatedData && generatedData.length > 0 ? (
              <div style={{ overflowX: 'auto', width: '90%' }}>
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
          <br />
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Suitable ML Algorithms</h3>
          </div>
          <Grid container spacing={3} style={{ width: '1100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '170px' }} >
            {algorithmData.map((item, index) => (
              <Grid key={index} item xs={12} sm={4}>
                <Box className={classes.algorithmData} onClick={() => handleCardClick(item.title)}>
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

          <br />
          <div>
            <h3 style={{ textAlign: 'center' }}>Technical Graphs</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ScatterChart
              width={600}
              height={300}
              series={[
                {
                  label: 'Feature Data Points',
                  data: scatterChartData.map((point) => ({ x: point.x, y: point.y, id: point.id })),
                  color: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                },
              ]}
            />

            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  label: 'Accuracy Points',
                  data: [2, 3.5, 4.7, 6.5, 7.8, 9.9],
                },
              ]}
              colors={['#000000', '#000000']}
              width={500}
              height={300}
            />

            <BarChart
              dataset={barChartData}
              width={700}
              series={[{ dataKey: 'seoul', label: 'Loss Function', valueFormatter: (value) => `${value}mm` }]}
              height={300}
              sx={{
                '& .MuiXAxis-root .MuiXAxis-label': {
                  transform: 'translateX(-10px)',
                },
              }}
              colors={['linear-gradient(195deg, #49a3f1, #1A73E8)']} // Customize the color here
            />

          </div>
        </Drawer>
      </div>
    </>
  );
}


export default DataGenDashboard;
