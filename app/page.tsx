"use client";
import { ModeToggle } from "@/components/ui/Toogle";

export default function Home() {
  return (
    <>
      <div className="h-screen max-w-7xl mx-auto">
        <div className="h-[8vh] w-full flex justify-between items-center ">
          <h1 className=" text-3xl font-bold leading-[8vh]  flex justify-center items-center">
            AirDrop Solana
          </h1>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
