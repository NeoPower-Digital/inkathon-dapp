import { useInkathon } from "@scio-labs/use-inkathon";
import { FC } from "react";

const WalletInfo: FC<any> = () => {
  const { activeChain, activeAccount, isConnected } = useInkathon();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      <div className="flex min-w-[20em] max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
        <h3 className="text-2xl font-bold">Chain info </h3>
        <div className="text-lg">
          <div className="flex justify-between gap-3">
            Name: <span className="font-bold">{activeChain?.name}</span>
          </div>
          <div className="flex justify-between gap-3">
            Network:
            <span className="font-bold">{activeChain?.network}</span>
          </div>
          <div className="flex justify-between gap-3">
            Is Testnet:
            <span className="font-bold">
              {activeChain?.testnet ? "👍️" : "👎️"}
            </span>
          </div>
        </div>
      </div>
      {isConnected && (
        <div className="flex min-w-[20em] max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
          <h3 className="text-2xl font-bold">Account Info</h3>
          <div className="text-lg">
            <div className="flex justify-between gap-3 overflow-ellipsis">
              Address:{" "}
              <span className="font-bold">
                {activeAccount?.address.slice(0, 5) + "..."}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              Type:
              <span className="font-bold">{activeAccount?.type}</span>
            </div>
            <div className="flex justify-between gap-3">
              Name:
              <span className="font-bold">{activeAccount?.meta.name}</span>
            </div>
            <div className="flex justify-between gap-3">
              Source:
              <span className="font-bold">{activeAccount?.meta.source}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
