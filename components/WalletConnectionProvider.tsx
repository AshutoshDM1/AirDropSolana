import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export default function WalletConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/4NSpj9on5wY7lpENeMx5SZLDujUFm6aH"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
