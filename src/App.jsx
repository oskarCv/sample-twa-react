import React, { useEffect } from "react";
import { useTonConnect } from "./hooks/useTonConnect";
import { Grid2, Box, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Subscription from "./pages/Subscription";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

function App() {
  const { network, wallet } = useTonConnect(); // Get the wallet from the hook

  // Log the wallet address whenever it changes
  useEffect(() => {
    if (wallet) {
      console.warn('<ocv> Connected wallet ID:', wallet); // Log the wallet 
    }
  }, [wallet]);

  return (
    <Router>
      <Box
        sx={{
          backgroundColor: '#e8e8e8',
          color: 'black',
          minHeight: '100vh',
          minWidth: '100vw',
          padding: '20px',
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: '#999',
            color: 'white',
          },
        }}
      >
        <NavBar network={network}/>
        {/* Main Content */}
        <Grid2 container spacing={2} justifyContent="center">
          {/* Left Side - Empty but Resizable */}
          <Grid2 item xs={false} md={2} />

          {/* Main Content in the Middle */}
          <Grid2 item xs={12} md={8}>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {network
                ? network === "mainnet"
                  ? "Connected to Mainnet"
                  : "Connected to Testnet"
                : "Disconnected"}
            </Typography>
          </Grid2>

          {/* Right Side - Empty but Resizable */}
          <Grid2 item xs={false} md={2} />
        </Grid2>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
