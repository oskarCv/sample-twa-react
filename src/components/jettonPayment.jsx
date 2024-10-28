// jettonService.js
import { TonClient, TonConnectSender, JettonMinter, JettonWallet, Address, DefaultContentResolver } from 'ton-community/assets-sdk';

// Initialize TonClient with the appropriate endpoint
const client = new TonClient({
  endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
});

export async function sendJetton(provider, senderWalletAddress, recipientWalletAddress, jettonAddress, amount) {
  try {
    const sender = new TonConnectSender(provider);

    const jettonMaster = client.open(
      JettonMinter.createFromAddress(
        Address.parse(jettonAddress),
        new DefaultContentResolver()
      )
    );

    const jettonWalletAddress = await jettonMaster.getWalletAddress(senderWalletAddress);

    const jettonContent = await jettonMaster.getContent();
    const jettonDecimals = jettonContent.decimals ?? 9;

    const jetton = client.open(JettonWallet.createFromAddress(jettonWalletAddress));

    await jetton.send(
      sender,
      Address.parse(recipientWalletAddress),
      BigInt(amount * 10 ** jettonDecimals)
    );

    console.log('Jetton transaction successful');
  } catch (error) {
    console.error('Jetton transaction failed:', error);
    throw error; // Re-throw the error for handling elsewhere
  }
}