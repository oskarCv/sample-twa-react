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
      <Toolbar sx={{ justifyContent: "flex-end", flexWrap: "wrap" }}>
        <div className="nav-container">
          <Button color="inherit" component={Link} to={ROUTES.HOME}>
            <span className="nav-text">home</span>
          </Button>
          { shouldDisplaySubscription && isConnected ? ( 
            <Button color="inherit" component={Link} to={ROUTES.SUBSCRIPTION}>
              <span className="nav-text">subscription</span>
            </Button>
          ) : ''}
          { isConnected ? <Button color="inherit" component={Link} to={ROUTES.SUBSCRIPPTIONVALIDATION}>
            <span className="nav-text">Verify_Subscription</span>
          </Button> : ''}
        </div>
        <TonConnectButton />
      </Toolbar>
    </AppBar>
  );
}
