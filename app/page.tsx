"use client";
import Dashboard from "@/components/Dashboard";
import { ModeToggle } from "@/components/ui/Toogle";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const wallet = useWallet();
  console.log(wallet.publicKey?.toString());
  return (
    <>
      <div className="h-screen max-w-7xl mx-auto px-10 ">
        <div className="h-[8vh] w-full flex justify-between items-center ">
          <h1 className=" text-3xl font-bold leading-[8vh]  flex justify-center items-center">
            AirDrop Solana
          </h1>
          <ModeToggle />
        </div>
        <Dashboard />
      </div>
    </>
  );
}
