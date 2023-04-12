import { SubstrateDeployment, alephzeroTestnet } from "@scio-labs/use-inkathon";
import abi from "~/contracts/alephzero-testnet/greeter-abi.json";

export const ContractId = {
  greeter: "greeter",
};

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  return [
    {
      contractId: ContractId.greeter,
      networkId: alephzeroTestnet.network,
      abi: abi,
      address: "5HUMq3LnzEiP9dXK8qBRjnucaezuNy1w1yzPEeNJpKe3Ttj7",
    },
  ];
};
