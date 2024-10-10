import { CHAIN } from "@tonconnect/protocol";
import { useTonConnectUI, useTonWallet, useTonAddress } from "@tonconnect/ui-react";

const getNetworkName = (chainId) => {
    return Object.keys(CHAIN).find(key => CHAIN[key] === chainId);
  }

export function useTonConnect() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const networkId = wallet?.account.chain ?? null;
  const network = networkId ? getNetworkName(networkId).toLocaleLowerCase() : null;
  const userFriendlyAddress = useTonAddress();
  return {
    sender: {
      send: async (args) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: !!wallet?.account.address,
    // wallet: wallet?.account.address ? base58Encode(wallet.account.address) : null,
    wallet: userFriendlyAddress? userFriendlyAddress : null,
    network: network,
    walletInstance: wallet,
  };
}
