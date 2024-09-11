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
  const [amount, setAmount] = useState('');
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setAmount(value);
    }
  };

  const sendAirdrop = async () => {
    if (wallet.publicKey) {
      toast.loading("Sending airdrop");
      try {
        const airdropSignature = await connection.requestAirdrop(
          wallet.publicKey,
          100
        );
        toast.success("Successfully sent airdrop");
        toast.dismiss();
        console.log(airdropSignature);
      } catch (err: any) {
        console.log(err);
        toast.error("Error sending airdrop");
        toast.dismiss();
      }
    }
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
            placeholder="Enter amount of tokens"
            value={amount}
            onChange={handleAmountChange}
          />
          <Button onClick={sendAirdrop}>Send Airdrop</Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
