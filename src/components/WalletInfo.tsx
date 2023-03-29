import { useInkathon } from "@scio-labs/use-inkathon";
import { FC } from "react";
import AccountSelector from "./AccountSelector";
import InfoCard, { InfoCardData } from "./InfoCard";

const WalletInfo: FC = () => {
  const { activeChain, activeAccount } = useInkathon();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      <InfoCard
        cardTitle="Chain Info"
        cardContent={[
          { title: "Name", content: activeChain?.name || "" },
          { title: "Network", content: activeChain?.network || "" },
          {
            title: "Is TestNet",
            content: activeChain?.testnet ? "🟢️" : "🔴️",
          },
        ]}
      />

      {activeAccount && (
        <InfoCard
          cardTitle="Account Info"
          cardContent={[
            {
              title: "Address",
              content: activeAccount?.address.slice(0, 5) + "...",
            },
            { title: "Type", content: activeAccount?.type || "" },
            {
              title: "Name",
              content: activeAccount?.meta.name || "",
            },
            {
              title: "Source",
              content: activeAccount?.meta.source || "",
            },
          ]}
          customChildren={<AccountSelector />}
        />
      )}
    </div>
  );
};

export default WalletInfo;
