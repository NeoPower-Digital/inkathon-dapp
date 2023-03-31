import { useInkathon } from "@scio-labs/use-inkathon";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import WalletConnection from "~/components/WalletConnection";
import WalletInfo from "~/components/WalletInfo";

const Home: NextPage = () => {
  const { error } = useInkathon();

  useEffect(() => {
    if (!error) return;

    toast.error(error.message);
  }, [error]);

  return (
    <>
      <Head>
        <title>inkathon dApp</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1b1e32] to-[#3b949f]">
        <div className="container flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="align-self-start ml-auto flex-1 pr-0">
            <WalletConnection></WalletConnection>
          </div>

          <h1 className="flex-1 text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            ink<span className="text-[#4f94da] text-opacity-50">!</span>athon
            dApp
          </h1>

          <div className="flex-2">
            <WalletInfo></WalletInfo>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
