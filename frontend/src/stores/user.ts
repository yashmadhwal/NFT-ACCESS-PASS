import { defineStore } from "pinia";
import { ethers, providers } from "ethers";

import { useInfo } from "./info";


// import { useToken } from './contract/token'
export const useUser = defineStore("user", {
  state: () => {
    return {
      wallet: "",
      shortWallet: "",
      loading: false,
      login: false,
      chainId: 97,
      userRole: '',
      _signer: () => null as null | providers.JsonRpcSigner,
    };
  },
  getters: {
    signer: (state) => state._signer(),
  },
  actions: {
    async connect(
      wallet: string,
      signer: providers.JsonRpcSigner,
      chainId: string
    ) {
      console.log("Connect: ", wallet, chainId);
      // this.wallet = wallet;
      this.wallet = ethers.utils.getAddress(wallet);
      this.shortWallet = wallet.slice(0, 6) + "..." + wallet.slice(-4);
      this.connected = true;
      this._signer = () => signer;
      this.login = true;
      this.chainId = chainId.toString();


    },

    async connectMetamask() {
      console.log("Connecting to metamask...");
      console.log("loading", this.loading);
      console.log("chain ID", this.chainId);
      this.loading = true;
      console.log("this.loading", this.loading);

      // alert("Connect to Binance Testnet!\nRead more: https://revoke.cash/learn/wallets/add-network/bnb-chain-testnet")

      try {
        if (!(window as any).ethereum)
          throw new Error("Please set up MetaMask properly");

        const wallet = (
          await (window as any).ethereum.request?.({
            method: "eth_requestAccounts",
          })
        )[0] as string;

        const provider = new providers.Web3Provider(
          ((window as any).ethereum as any) || (window as any).web3
        );
        const signer = provider.getSigner();
        const chainId = (await provider?.getNetwork())?.chainId;
        if (chainId != this.chainId) {
          console.log('Jai Shree Ram ')
          alert("Connect to Binance Testnet!\nRead more: https://revoke.cash/learn/wallets/add-network/bnb-chain-testnet")
          this.loading = false;
          return; 
          }
          else {
            if ((await signer.getChainId()).toString() != this.chainId) {
              this.loading = false;
              // this.openConnectWindow();
              return;
            
          }
        }


        await this.connect(wallet, signer, chainId.toString());
        ((window as any).ethereum as any).once(
          "chainChanged",
          async (chainId: string) => {
            await this.connectMetamask();
          }
        );


      } catch (err: any) {
        console.log("error");
        console.log(err);
      }

      // Here All the access Info will loaded
      const userInfo = useInfo();
      await userInfo.OwnerInfo(this.wallet);

      this.loading = false;
      console.log("Loading", this.loading);
    }
  },
});
