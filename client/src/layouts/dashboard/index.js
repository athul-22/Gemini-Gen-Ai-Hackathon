/* eslint-disable prettier/prettier */
// Dashboard.js

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// Custom CSS for Skeleton
import "./Dashboard.css";

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;

  const [feeds, setFeeds] = useState(null);

  const [graph, setGraph] = useState({
    graph1: {},
    graph2: {},
    graph3: {}
  })

  // useEffect(() => {
  //   Axios.get("/api/v1/app/dashboard/getFeeds")
  //     .then((res) => {
  //       console.log(res);
  //       setFeeds(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });


  //   Axios.get("/api/v1/app/dashboard/getCharts")
  //     .then((response) => {
  //       setGraph({
  //         graph1: response?.data?.graph1,
  //         graph2: response?.data?.graph2,
  //         graph3: response?.data?.graph3
  //       })
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  color="dark"
                  icon="report_gmail_icon"
                  title="Today's Crimes"
                  count={feeds?.todaysCrimes}
                  percentage={{
                    color: "success",
                    amount: `${feeds?.todaysCrimesIncrease?.toFixed(2)}%`,
                    label: "than yesterday",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} animation="wave" className="custom-skeleton" />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Total Crimes"
                  count={feeds?.totalCrimes}
                  percentage={{
                    color: "success",
                    amount: `${feeds?.crimesThisMonth}`,
                    label: "cimes this month",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} animation="wave" className="custom-skeleton" />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  color="error"
                  icon="priority_high"
                  title="Total Criminals"
                  count={feeds?.totalCriminals}
                  percentage={{
                    color: "success",
                    amount: `${feeds?.criminalsThisMonth}`,
                    label: "criminals this month",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} animation="wave" className="custom-skeleton" />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Open Cases"
                  count={feeds?.unClosedCases}
                  percentage={{
                    color: "success",
                    amount: feeds?.inProgressCases,
                    label: "in progress cases",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} animation="wave" className="custom-skeleton" />
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {feeds ? (
                <ReportsBarChart
                  color="info"
                  title="Crimes"
                  description="Last 5 years"
                  date="just updated"
                  chart={{
                    labels: graph?.graph1?.key,
                    datasets: { label: "Crimes", data: graph?.graph1?.data },
                  }}
                // chart={reportsBarChartData}
                />
              ) : (
                <Skeleton variant="rectangular" height={200} animation="wave" className="custom-skeleton" />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {feeds ? (
                <ReportsLineChart
                  color="success"
                  title="Crimes"
                  description={
                    <>
                      Last 5 months
                    </>
                  }
                  date="just updated"
                  chart={{
                    labels: graph?.graph2?.key,
                    datasets: { label: "Crimes", data: graph?.graph2?.data },
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={200} animation="wave" className="custom-skeleton" />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {feeds ? (
                <ReportsLineChart
                  color="dark"
                  title="Inprogress Cases"
                  description="Last 5 months"
                  date="just updated"
                  chart={{
                    labels: graph?.graph3?.key,
                    datasets: { label: "Crimes", data: graph?.graph3?.data },
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={200} animation="wave" className="custom-skeleton" />
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            {feeds ? (
              <OrdersOverview />
            ) : (
              <Skeleton variant="rectangular" height={400} animation="wave" className="custom-skeleton" />
            )}
          </Grid>
        </Grid>
      </MDBox> */}
    </DashboardLayout>
  );
}

export default Dashboard;
