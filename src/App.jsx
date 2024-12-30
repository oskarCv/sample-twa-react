import React, { useEffect, useState } from "react";
import { useTonConnect } from "./hooks/useTonConnect";
import { Grid2 as Grid, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import About from "./pages/About";
import Subscription from "./pages/Subscription";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import VerifySubscription from "./pages/VerifySubscription";

function App() {
  const { network, wallet, walletInstance } = useTonConnect(); // Get the wallet from the hook
  const [isConnected, setIsConnected] = useState(false);

  // Log the wallet address and set connection status
  useEffect(() => {
    if (wallet) {
      console.warn("Connected wallet ID:", wallet); // Log the wallet
      setIsConnected(true); // Set as true when the wallet is connected
    } else {
      setIsConnected(false); // Set as false when there is no wallet
    }
  }, [wallet]);

  return (
    <>
      <ToastContainer />
      <Router>
      <Box
        sx={{
          backgroundColor: "#e8e8e8",
          color: "black",
          minHeight: "100vh",
          minWidth: "100vw",
          padding: "20px",
          "@media (prefers-color-scheme: dark)": {
            backgroundColor: "#999",
            color: "white",
          },
        }}
      >
        {/* Pass the wallet to NavBar */}
        <NavBar network={network} isConnected={isConnected} />

        {/* Main Content */}
        <Grid container spacing={2} justifyContent="center">
          {/* Left Side - Empty but Resizable */}
          <Grid item xs={false} md={2} />

          {/* Main Content in the Middle */}
          <Grid item xs={12} md={8}>
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home isConnected={isConnected} />} />
              {/* <Route path="/about" element={<About />} /> */}

              {/* Protect the subscription route */}
              {isConnected ? (
                <Route
                  path="/subscription"
                  element={<Subscription isConnected={isConnected} wallet={walletInstance}/>}
                />
              ) : (
                <Route
                  path="/subscription"
                  element={<Navigate to="/" replace />}
                />
              )}
              {isConnected ? (
                <Route
                  path="/validate-subscription"
                  element={<VerifySubscription isConnected={isConnected} wallet={wallet}/>}
                />
                ):''}
            </Routes>
          </Grid>

          {/* Right Side - Empty but Resizable */}
          <Grid item xs={false} md={2} />
        </Grid>
      </Box>
    </Router>
    </>
  );
}

export default App;
