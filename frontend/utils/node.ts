
interface Node {
  name: string
  rpc: string
  chainId: number
  chainIdHex: string
}

export function node(name: string): Node {
  switch (name) {
    case 'bsc_testnet':
      return {
        name: 'Binance Smart Chain Testnet',
        rpc: 'https://indulgent-solemn-patina.bsc-testnet.discover.quiknode.pro/8e90f7864625ff49df6c95bf18c12719842d4322/',
        chainId: 97,
        chainIdHex: '0x61',
      }
    case 'localhost':
      return {
        name: 'localhost',
        rpc: 'http://127.0.0.1:8545/',
        chainId: 1337,
        chainIdHex: '0x1337',
      }
  }
  return {} as Node
}
