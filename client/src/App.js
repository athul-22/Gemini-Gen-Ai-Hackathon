/* eslint-disable prettier/prettier */
import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// // Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";


// Import pages
import Dashboard from "layouts/dashboard";
import DataGenator from 'layouts/DataGen/datagenerator'

export default function App() {


  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const showSidebar = layout === "dashboard" && pathname !== "/signin";


  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      //SIGNIN PAGE
      // if (route.route === "signin") {
      //   return <Route exact path={route.route} element={route.element} key={route.key} />;
      // }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return direction === "rtl" ? (
   
    //✅ NEW 
    <CacheProvider value={rtlCache}>
    {/* <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}> */}
    <ThemeProvider>

      <CssBaseline />
      {/* Conditionally render the Sidebar based on the showSidebar variable */}
      {showSidebar && (
        <Sidenav
          color={sidenavColor}
          // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="cms"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      {/* Conditionally render the content */}
      <Configurator />
      <Routes>
        {getRoutes(routes)}
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </ThemeProvider>
  </CacheProvider>
) : (
  <ThemeProvider theme={darkMode ? themeDark : theme}>
    <CssBaseline />
    {/* Conditionally render the Sidebar based on the showSidebar variable */}
    {showSidebar && (
      <Sidenav
        color={sidenavColor}
        // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
        brandName="Crime Management System"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
    )}
    {/* Conditionally render the content */}
    <Configurator />
    <Routes>
      {getRoutes(routes)}
      {/* <Route path="/signin" element={<Signin />} /> */}
      <Route path="/*" element={<DataGenator />} />
    </Routes>
  </ThemeProvider>
  );
}
