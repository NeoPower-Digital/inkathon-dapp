import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  allSubstrateChains,
  SubstrateChain,
  useInkathon,
} from "@scio-labs/use-inkathon";
import { FC } from "react";

const ConnectionButton: FC<{
  connectionHandler: (() => Promise<void>) | (() => void) | undefined;
  buttonText: string;
  isConnecting: boolean | undefined;
}> = ({ connectionHandler, buttonText, isConnecting }) => {
  return (
    <button
      className="min-w-[12em] rounded-full bg-white/10 py-3 text-lg font-bold text-white hover:bg-white/20 disabled:cursor-not-allowed"
      onClick={connectionHandler}
      disabled={isConnecting}
    >
      {buttonText}
    </button>
  );
};

const WalletConnection: FC<any> = () => {
  const {
    connect,
    disconnect,
    switchActiveChain,
    activeChain,
    isConnected,
    isConnecting,
  } = useInkathon();
  const connectionText = isConnected ? "Disconnect" : "Connect";
  const connectionHandler = isConnected ? disconnect : connect;

  const handleSwitchChain = (event: SelectChangeEvent) => {
    const selectedChain: SubstrateChain | undefined = allSubstrateChains.find(
      (chain) => chain.network === event.target.value
    );

    if (selectedChain && switchActiveChain) {
      switchActiveChain(selectedChain);
    }
  };

  return (
    <div className="flex gap-10">
      <ConnectionButton
        connectionHandler={connectionHandler}
        buttonText={connectionText}
        isConnecting={isConnecting}
      ></ConnectionButton>

      <FormControl fullWidth className="min-w-[12em]">
        <InputLabel id="switch-chain-select-label">Switch chain</InputLabel>
        <Select
          labelId="switch-chain-select-label"
          id="switch-chain-select"
          value={activeChain?.network}
          label="Switch chain"
          onChange={handleSwitchChain}
        >
          {allSubstrateChains.map((chain: SubstrateChain) => (
            <MenuItem
              value={chain.network}
              disabled={chain.network == activeChain?.network}
            >
              {chain.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default WalletConnection;
