import { alephzeroTestnet, UseInkathonProvider } from "@scio-labs/use-inkathon";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { getDeployments } from "~/utils/web3/deployed-contracts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UseInkathonProvider
      appName="inkathon-dApp"
      defaultChain={alephzeroTestnet}
      connectOnInit={true}
      deployments={getDeployments()}
    >
      <Component {...pageProps} />
    </UseInkathonProvider>
  );
};

export default MyApp;
