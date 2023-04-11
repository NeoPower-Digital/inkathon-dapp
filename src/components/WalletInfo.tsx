import { useBalance, useInkathon } from "@scio-labs/use-inkathon";
import { FC, useEffect, useState } from "react";
import AccountSelector from "./AccountSelector";
import InfoCard from "./InfoCard";

const WalletInfo: FC = () => {
  const { activeChain, activeAccount, api } = useInkathon();
  const { balanceFormatted } = useBalance(activeAccount?.address);

  const [chainApiInfo, setChainApiInfo] = useState<{
    version: string;
    tokenSymbol: string;
    tokenDecimals: number;
  }>();

  const fetchChainInfo = async () => {
    if (!api) {
      setChainApiInfo(undefined);
      return;
    }

    const version = (await api.rpc.system.version()).toString();
    const properties = (await api.rpc.system.properties()).toHuman() as any;
    const tokenSymbol = properties?.tokenSymbol?.[0] || "UNIT";
    const tokenDecimals = properties?.tokenDecimals?.[0] || 12;

    setChainApiInfo({
      version,
      tokenSymbol,
      tokenDecimals,
    });
  };

  useEffect(() => {
    fetchChainInfo();
  }, [api]);

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
          {
            title: "Version",
            content: chainApiInfo?.version || "",
          },
          {
            title: "Token",
            content: chainApiInfo?.tokenSymbol || "",
          },
          {
            title: "Decimals",
            content: `${chainApiInfo?.tokenDecimals} Decimals`,
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
            {
              title: "Balance",
              content: balanceFormatted || "",
            },
          ]}
          customChildren={<AccountSelector />}
        />
      )}
    </div>
  );
};

export default WalletInfo;
