import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link if using React Router
import { ROUTES } from "../routes";
import { isConnectedMainNet } from "../utils/validations";

export default function NavBar({ network, isConnected }) {
    const shouldDisplaySubscription = () => isConnectedMainNet(isConnected, network);
  return (
    <AppBar position="sticky" sx={{ marginBottom: 4 }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <>
          <Button color="inherit" component={Link} to={ROUTES.HOME}>
            home
          </Button>
          { shouldDisplaySubscription && ( 
            <Button color="inherit" component={Link} to={ROUTES.SUBSCRIPTION}>
              subscription
            </Button>
          )}
          <Button color="inherit" component={Link} to={ROUTES.ABOUT}>
            about
          </Button>
        </>
        {/* TonConnectButton */}
        <TonConnectButton />
      </Toolbar>
    </AppBar>
  );
}
