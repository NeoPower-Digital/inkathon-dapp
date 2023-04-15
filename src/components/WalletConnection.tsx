import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { SubstrateChain, useInkathon } from "@scio-labs/use-inkathon";
import { FC, ReactNode, useEffect, useState } from "react";
import { inkathonDappChains } from "~/constants/chains.const";
import ConnectionButton from "./ConnectionButton";

const StyledFormControl = styled(FormControl)`
  width: 12rem;

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledSelect = styled(Select)`
  opacity: 1;
  font-weight: bold;
  color: white;
  border-radius: 2em;
  background-color: rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const WalletConnection: FC = () => {
  const {
    connect,
    disconnect,
    switchActiveChain,
    activeChain,
    activeAccount,
    isConnecting,
  } = useInkathon();

  const [connectionOption, setConnectionOption] = useState<{
    text: string;
    handler: (() => Promise<void>) | (() => void) | undefined;
  }>({
    text: "Connect",
    handler: connect,
  });

  useEffect(() => {
    setConnectionOption({
      text: activeAccount ? "Disconnect" : "Connect",
      handler: activeAccount ? disconnect : connect,
    });
  }, [activeAccount, connectionOption, connect, disconnect]);

  const handleSwitchChain = (
    event: SelectChangeEvent<unknown>,
    _: ReactNode
  ) => {
    const selectedChain: SubstrateChain | undefined = inkathonDappChains.find(
      (chain) => chain.network === event.target.value
    );

    if (selectedChain && switchActiveChain) {
      switchActiveChain(selectedChain);
    }
  };

  return (
    <div className="flex w-full flex-wrap justify-end gap-6">
      <StyledFormControl disabled={isConnecting}>
        <InputLabel id="switch-chain-select-label" className="text-white/75">
          Switch chain
        </InputLabel>
        <StyledSelect
          labelId="switch-chain-select-label"
          id="switch-chain-select"
          value={activeChain?.network}
          label="Switch chain"
          onChange={handleSwitchChain}
          disabled={isConnecting}
        >
          {inkathonDappChains.map((chain: SubstrateChain, index: number) => (
            <MenuItem
              key={index}
              value={chain.network}
              disabled={chain.network == activeChain?.network}
            >
              {chain.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>

      <ConnectionButton
        connectionHandler={connectionOption.handler}
        buttonText={connectionOption.text}
        isConnecting={isConnecting}
      ></ConnectionButton>
    </div>
  );
};

export default WalletConnection;
