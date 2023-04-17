import { SubstrateChain, allSubstrateChains } from "@scio-labs/use-inkathon";

export const acalaNetwork: SubstrateChain = {
  network: "acala",
  name: "Acala",
  rpcUrls: ["wss://acala-rpc.dwellir.com"],
  explorerUrls: [
    "https://polkadot.js.org/apps/#/explorer?rpc=wss://acala-rpc.dwellir.com",
  ],
  testnet: false,
  faucetUrls: [
    "https://polkadot.js.org/apps/#/accounts?wss://acala-rpc.dwellir.com",
  ],
};

export const inkathonDappChains: SubstrateChain[] = [
  ...allSubstrateChains,
  acalaNetwork,
];
