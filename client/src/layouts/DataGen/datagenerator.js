/* eslint-disable prettier/prettier */
// @mui material components
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
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

const steps = ['Type', 'Model', 'Input / Sample Section', 'Generate', 'Output'];

function DataGenDashboard() {

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

  return (
    <DashboardLayout>
      <Grid item xs={12} mt={2}>
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
                    <Typography variant="body1">DIFFERENT TYPES OF MODELS HERE</Typography>
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
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
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
