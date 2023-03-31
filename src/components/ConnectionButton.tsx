import { Button, CircularProgress, styled } from "@mui/material";
import { FC } from "react";

interface ConnectionButtonProps {
  connectionHandler: (() => Promise<void>) | (() => void) | undefined;
  buttonText: string;
  isConnecting: boolean | undefined;
}

const StyledButton = styled(Button)`
  && {
    opacity: 1;
    font-weight: bold;
    color: white;
    width: 12em;
    padding: 1em 0;
    border-radius: 2em;
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const ConnectionButton: FC<ConnectionButtonProps> = ({
  connectionHandler,
  buttonText,
  isConnecting,
}: ConnectionButtonProps) => {
  return (
    <StyledButton
      onClick={() => connectionHandler?.()}
      disabled={isConnecting}
      variant="contained"
    >
      {isConnecting ? <CircularProgress size="2em" /> : buttonText}
    </StyledButton>
  );
};

export default ConnectionButton;
