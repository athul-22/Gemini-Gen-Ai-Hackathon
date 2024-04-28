/* eslint-disable prettier/prettier */
// @mui material components
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeblurIcon from '@mui/icons-material/Deblur';
import { makeStyles } from '@mui/styles'; // Import makeStyles directly

const useStyles = makeStyles((theme) => ({
  cardContainer: {
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
}));

const steps = ['Type', 'Model', 'Input Sample', 'Generate', 'Output'];

function DataGenDashboard() {

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
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
    // Toggle background color when a card is clicked
    // You can add your logic here
  };

  return (
    <DashboardLayout>
      <Grid item xs={12} mt={2} style={{borderRadius:'30px'}}>
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
                    <Grid container spacing={3}>
                      {[
                        { icon: <TipsAndUpdatesIcon style={{color:'#0073E6'}}/>, title: 'Gemini SyntheticGAN' },
                        { icon: <DataUsageIcon />, title: 'Image Augmentation' },
                        { icon: <AutoGraphIcon />, title: 'Transform' },
                      ].map((item, index) => (
                        <Grid key={index} height={150} item xs={12} sm={4}>
                          <Paper className={classes.cardContainer} onClick={handleCardClick}>
                            <Box display="flex" justifyContent="center" className={classes.iconSection}>
                              <IconButton>
                                {item.icon}
                              </IconButton>
                            </Box>
                            <Typography variant="h6" align="center"  className={classes.title}>
                              {item.title}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}
                {activeStep === 1 && (
                  <div>
                    <Typography variant="body1">Content for Model Section</Typography>
                    {/* Add content and images for the Model Section */}
                  </div>
                )}
                {/* Add similar div blocks for other sections */}
              </div>
              <div style={{ padding: '0px 20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    style={{border:'1px solid grey',color:'grey'}}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }} style={{color:'white',backgroundColor:'black'}}>
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
