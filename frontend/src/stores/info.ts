import { defineStore } from "pinia";
import { ethers } from "ethers";

import { safe, useContracts } from "../../utils";

import { useUser } from "./user";

export type Chain = "97"; 
export const DEFAULT_CHAINID = "97" as Chain;


export const useInfo = defineStore("info", {
  state: () => {
    return {
      infoLoaded: false,
      setting: false,
      Owner: false,
      userInfo: {
        nftId: 0,
        nftLink: '',
        status: '',
      },
      NFTPrice: {
        BASIC: {
          Price: 0,
          Link:'',
        },
        SILVER: {
          Price: 0,
          Link:''
        },
        GOLDEN: {
          Price: 0,
          Link:''
        },
      }
    };
  },
  getters: {
    // signer: (state) => state._signer(),
  },
  actions: {
    async OwnerInfo(walletAddress) {
      console.log('Getting Current Access Status')
      const { nftaccess } = useContracts(DEFAULT_CHAINID);
      const user = useUser();
      const isOwner = await nftaccess.owner();
      if(isOwner == user.wallet){
        this.owner = true;
        console.log('You are the owner');
      }

      // Getting user Info and storing
      const walletInfo = await nftaccess.getUserInfo(walletAddress);
      console.log(walletInfo);

      this.userInfo['nftId'] = walletInfo[0]
      // Setting status
      if(Number(walletInfo[1])==0){this.userInfo['status'] = 'FREE'}
      if(Number(walletInfo[1])==1){this.userInfo['status'] = 'BASIC'}
      if(Number(walletInfo[1])==2){this.userInfo['status'] = 'SILVER'}
      if(Number(walletInfo[1])==3){this.userInfo['status'] = 'GOLDEN'}
      this.userInfo['nftLink'] = walletInfo[2]
    },

    // get NFT prices
    async getNFTPrices(){
      this.infoLoaded = true;
      console.log('Fetching NFT prices')
      const { nftaccess } = useContracts(DEFAULT_CHAINID);

      // getting basicPrice
      const indexBasic = 1;
      const price1 = await nftaccess.accessPrices(indexBasic);
      this.NFTPrice['BASIC']['Price'] = ethers.utils.formatEther(price1);
      this.NFTPrice['BASIC']['Link'] = await nftaccess.tokenURIs(indexBasic)
      
      // getting silverPrice 
      const indexSilver = 2;
      const price2 = await nftaccess.accessPrices(indexSilver);
      this.NFTPrice['SILVER']['Price'] = ethers.utils.formatEther(price2);
      this.NFTPrice['SILVER']['Link'] = await nftaccess.tokenURIs(indexSilver);
      
      // getting goldenPrice 
      const indexGolden = 3;
      const price3 = await nftaccess.accessPrices(indexGolden);
      this.NFTPrice['GOLDEN']['Price'] = ethers.utils.formatEther(price3);
      this.NFTPrice['GOLDEN']['Link'] = await nftaccess.tokenURIs(indexGolden)
      this.infoLoaded = false;
    },

    // Buying NFT
    async buyPass(amount,pass){
      const user = useUser();
      const { nftaccess } = useContracts(DEFAULT_CHAINID);
      user.loading = true;
      try{
        const value = {value: ethers.utils.parseEther(amount)}
        let tx = await nftaccess.connect(user.signer!).getPASS(user.wallet,pass,value);
        await tx.wait();
      } catch(e){ 
        console.log(e)
      }
      user.loading = false;
    }

  },
});
