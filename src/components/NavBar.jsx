import React from 'react';
import { TonConnectButton } from "@tonconnect/ui-react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from 'react-router-dom'; // Import Link if using React Router
import { ROUTES } from '../routes';

export default function NavBar({ network }) { // Ensure network is passed as a prop
  return (
    <AppBar position="sticky" sx={{ marginBottom: 4 }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {/* Conditionally Render Based on Mainnet */}
        {network === "mainnet" && (
          <>
            <Button color="inherit" component={Link} to={ROUTES.HOME}>
              home
            </Button>
            <Button color="inherit" component={Link} to={ROUTES.SUBSCRIPTION}>
              subscription
            </Button>
            <Button color="inherit" component={Link} to={ROUTES.ABOUT}>
              about
            </Button>
          </>
        )}
        {/* TonConnectButton */}
        <TonConnectButton />
      </Toolbar>
    </AppBar>
  );
}
