import { Contract, providers } from 'ethers'
import { node } from './node'

import nftaccess from "../../contract/deployments/bsc_testnet/NFTACCESSPASS.json"

import {NFTACCESSPASS} from '../../contract/typechain-types/contracts/NFT_Authentication.sol/NFTACCESSPASS'

import { Chain } from '../src/stores/info'

export async function safe(promise: Promise<any>) {
    try {
      const result = await promise
      return [result, null]
    } catch (error) {
      return [null, error]
    }
  }
  
  export function useContracts(chainId: Chain) {
    // const provider = new providers.JsonRpcProvider('https://indulgent-solemn-patina.bsc-testnet.discover.quiknode.pro/8e90f7864625ff49df6c95bf18c12719842d4322/')
    const provider = new providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')
    return {
      nftaccess: new Contract(nftaccess.address, nftaccess.abi, provider) as NFTACCESSPASS,
    }
  }

