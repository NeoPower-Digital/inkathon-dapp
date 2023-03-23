import { astar, UseInkathonProvider } from "@scio-labs/use-inkathon";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UseInkathonProvider appName="inkathon-dApp" defaultChain={astar}>
      <Component {...pageProps} />
    </UseInkathonProvider>
  );
};

export default MyApp;
