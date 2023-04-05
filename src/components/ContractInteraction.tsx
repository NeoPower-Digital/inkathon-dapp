import { Button, CircularProgress, TextField, styled } from "@mui/material";
import {
  contractQuery,
  contractTx,
  unwrapResultOrDefault,
  useInkathon,
  useRegisteredContract,
} from "@scio-labs/use-inkathon";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ContractId } from "~/utils/web3/deployed-contracts";
import InfoCard, { StyledCard } from "./InfoCard";
import { set } from "zod";

const StyledButton = styled(Button)`
  && {
    opacity: 1;
    font-weight: bold;
    color: white;
    padding: 1rem 2rem;
    font-size: 0.8rem;
    border-radius: 2em;
    height: fit-content;

    background-color: rgba(255, 255, 255, 0.2);

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
    opacity: 1;
    input {
      color: white;
    }
    padding: 0;
    border-radius: 2em;
    background-color: rgba(255, 255, 255, 0.2);

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
      cursor: not-allowed;
    }

    label {
      color: white;
    }
  }
`;

const ContractInteraction: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract, address: contractAddress } = useRegisteredContract(
    ContractId.greeter
  );
  const [greeterMessage, setGreeterMessage] = useState<string>();
  const [newMessage, setNewMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const fetchGreeting = async () => {
    if (!contract || !api || !contractAddress) return;

    try {
      const result = await contractQuery(api, "", contract, "greet");
      const message = unwrapResultOrDefault<string>(result, "Error");

      setGreeterMessage(message);
    } catch (error) {
      toast.error("Error while fetching greeting");
      setGreeterMessage(undefined);
    }
  };

  useEffect(() => {
    fetchGreeting();
  }, [contract, api]);

  const updateGreeting = async () => {
    if (!activeAccount || !activeSigner || !contract || !api) return;

    toast.loading("Executing transaction...", { id: "update" });
    setIsLoading(true);
    try {
      await contractTx(api, activeAccount.address, contract, "setMessage", {}, [
        newMessage,
      ]);
      toast.success(`Succesfully updated greeting!`);
    } catch {
      toast.error(`Error while updating greeting. Try again...`);
    } finally {
      fetchGreeting();
      toast.dismiss("update");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center gap-4">
      <InfoCard
        cardTitle="Greeter contract"
        cardContent={[{ title: "Message", content: greeterMessage ?? "" }]}
      />
      <StyledCard className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Contract interaction</h3>
        <div className="flex justify-center gap-2">
          <StyledTextField
            id="outlined-basic"
            label="Set greet message"
            variant="outlined"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <StyledButton onClick={updateGreeting}>
            {isLoading ? <CircularProgress size="1.5rem" /> : "Send"}
          </StyledButton>
        </div>
      </StyledCard>
    </div>
  );
};

export default ContractInteraction;
