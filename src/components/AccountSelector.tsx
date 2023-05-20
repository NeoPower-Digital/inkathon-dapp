import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useInkathon } from "@scio-labs/use-inkathon";
import { FC } from "react";

const AccountSelector: FC = () => {
  const { setActiveAccount, accounts, activeAccount, isConnected } =
    useInkathon();

  const handleSwitchAccountChange = (event: SelectChangeEvent) => {
    const selectedAccount = accounts?.find(
      (account) => account.address === event.target.value
    );

    if (selectedAccount && setActiveAccount) setActiveAccount(selectedAccount);
  };

  return (
    <Select
      id="switch-account-select"
      className="flex h-[2em] w-[2.4em] justify-center rounded-full bg-none font-bold text-white hover:bg-white/5"
      value={activeAccount?.meta.name}
      size="small"
      onChange={handleSwitchAccountChange}
      disabled={!isConnected}
    >
      {accounts?.map((account: InjectedAccountWithMeta, index: number) => (
        <MenuItem
          key={index}
          value={account.address}
          disabled={account.address == activeAccount?.address}
        >
          {account.meta.name} - {account.address.slice(0, 10)}...
          {account.address.slice(account.address.length - 10)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AccountSelector;
