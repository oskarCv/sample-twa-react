import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import styled from "styled-components";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 90VW;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();

  return (
    <StyledApp>
      <AppContainer>
        <TonConnectButton />
        <div>
          {console.log('network >> ', network)}
          {network
            ? network === "mainnet"
              ? "mainnet"
              : "testnet"
            : "Disconnected"}
        </div>
      </AppContainer>
    </StyledApp>
  );
}

export default App;