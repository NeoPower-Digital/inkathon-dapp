import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  allSubstrateChains,
  SubstrateChain,
  useInkathon,
} from "@scio-labs/use-inkathon";
import { FC, ReactNode } from "react";

const ConnectionButton: FC<{
  connectionHandler: (() => Promise<void>) | (() => void) | undefined;
  buttonText: string;
  isConnecting: boolean | undefined;
}> = ({ connectionHandler, buttonText, isConnecting }) => {
  return (
    <Button
      className="text-md min-w-[12em] rounded-full bg-white/10 py-3 font-bold text-white hover:bg-white/20 disabled:cursor-not-allowed"
      onClick={connectionHandler}
      disabled={isConnecting}
    >
      {isConnecting ? <CircularProgress size="2em" /> : buttonText}
    </Button>
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

  const handleSwitchChain = (
    event: SelectChangeEvent<unknown>,
    _: ReactNode
  ) => {
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

      <FormControl
        fullWidth
        className="min-w-[12em] disabled:pointer-events-none disabled:cursor-not-allowed"
        disabled={isConnecting}
      >
        <InputLabel id="switch-chain-select-label" className="text-white/75">
          Switch chain
        </InputLabel>
        <Select
          labelId="switch-chain-select-label"
          id="switch-chain-select"
          className=" rounded-full bg-white/10 pl-4 font-bold text-white hover:bg-white/20"
          value={activeChain?.network}
          label="Switch chain"
          onChange={handleSwitchChain}
          disabled={isConnecting}
        >
          {allSubstrateChains.map((chain: SubstrateChain) => (
            <MenuItem
              key={chain.network}
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
