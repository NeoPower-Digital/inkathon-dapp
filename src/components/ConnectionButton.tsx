import { Button, CircularProgress } from "@mui/material";
import { FC } from "react";

interface ConnectionButtonProps {
  connectionHandler: (() => Promise<void>) | (() => void) | undefined;
  buttonText: string;
  isConnecting: boolean | undefined;
}

const ConnectionButton: FC<ConnectionButtonProps> = ({
  connectionHandler,
  buttonText,
  isConnecting,
}: ConnectionButtonProps) => {
  return (
    <Button
      className="text-md min-w-full rounded-full bg-white/10 py-3 font-bold text-white hover:bg-white/20 disabled:cursor-not-allowed sm:min-w-[12em]"
      onClick={() => connectionHandler?.()}
      disabled={isConnecting}
    >
      {isConnecting ? <CircularProgress size="2em" /> : buttonText}
    </Button>
  );
};

export default ConnectionButton;
