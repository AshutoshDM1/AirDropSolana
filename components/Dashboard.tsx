"use client";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Input } from "./ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [amount, setAmount] = useState<string>("");
  const wallet = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const sendAirdrop = async () => {
    if (!wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    const retryCount = 3; // Number of retry attempts
    let retries = 0;

    setIsLoading(true); // Set loading state to true

    while (retries < retryCount) {
      try {
        toast.loading("Sending airdrop");
        const signature = await connection.requestAirdrop(
          wallet.publicKey,
          parsedAmount * 1e9
        );
        // Wait for confirmation
        // const latestBlockhash = await connection.getLatestBlockhash();
        
        // await connection.confirmTransaction(
        //   { signature, ...latestBlockhash },
        //   'confirmed'
        // );
        // setAmount("");
        toast.success("Successfully sent airdrop");
        setIsLoading(false);
        console.log(signature);
        const balance = await connection.getBalance(wallet.publicKey);
        console.log(`Balance: ${balance} lamports`);
        return; // Exit after successful airdrop
      } catch (error) {
        console.error(`Airdrop attempt ${retries + 1} failed:`, error);
        retries++;
        if (retries >= retryCount) {
          toast.error(`Airdrop failed after ${retryCount} attempts. Please try again later.`);
        } else {
          toast.warning(`Airdrop attempt failed. Retrying... (${retries}/${retryCount})`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        }
      } finally {
        toast.dismiss();
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="h-[92vh] w-full flex flex-col justify-start items-center ">
        <div className="flex justify-center items-center h-[10vh] gap-5 ">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
        <div className="flex flex-col justify-center items-center w-[50%] h-[10vh]  gap-5 ">
          <Input
            type="number"
            placeholder="Enter amount of tokens"
            value={amount}
            onChange={handleAmountChange}
          />
          <Button onClick={sendAirdrop} disabled={isLoading}>Send Airdrop</Button> {/* Disable button while loading */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
