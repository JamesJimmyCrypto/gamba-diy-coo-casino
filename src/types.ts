import { IdlAccounts } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { StoreApi } from 'zustand'
import { GambaEventEmitter } from './events'
import { Gamba } from './idl'

export interface GambaConfig {
  /**
   * The name of the game
   */
  name: string
  /**
   * The address that receives fees
   */
  creator: PublicKey
}

export type GambaConfigInput = Omit<GambaConfig, 'creator'> & {
  /**
   * The address that receives fees
   */
  creator: PublicKey | string
  /**
   * Maximum number of recent games to fetch at start. Default is 20.
   */
  recentGamesFetchLimit?: number
}

export interface SettledGameEvent {
  /**
   * The address for the App Creator
   */
  creator: PublicKey
  /**
   * Who played the game
   */
  player: PublicKey
  /**
   * Amount of lamports that was wagered
   */
  wager: number
  /**
   * Amount of lamports that was won
   */
  payout: number
  /**
   *
   */
  multiplier: number
  /**
   * The resulting number of the game
   */
  resultIndex: number
  /**
   * Approximate time of when the game occured
   */
  estimatedTime: number
  /**
   *
   */
  nonce: number
  /**
   *
   */
  clientSeed: string
  /**
   *
   */
  rngSeed: string
}

export interface GameResult {
  /**
   * The player who made the bet
   */
  player: PublicKey
  /**
   * Amount of lamports the player bet
   */
  wager: number
  /**
   * Amount of lamports the player received
   */
  payout: number
  /**
   * The hashed RNG seed. Should be equal to sha256(result.rngSeed)
   */
  rngSeedHashed: string
  /**
   * The RNG seed
   */
  rngSeed: string
  /**
   * The seed that the was generated by the player
   */
  clientSeed: string
  /**
   *
   */
  nonce: number
  /**
   * The game configuration array
   */
  options: number[]
  /**
   * The index that the bet landed on
   */
  resultIndex: number
}

export interface GambaAccounts {
  /**
   * The Gamba user account address for the connected user
   */
  user: PublicKey | null
  /**
   * Gamba's house wallet
   */
  house: PublicKey | null
  /**
   * The web3 wallet address for the connected user
   */
  wallet: PublicKey | null
}

export type HouseState = IdlAccounts<Gamba>['house']
export type UserState = IdlAccounts<Gamba>['user']
export type UserStatus = keyof UserState['status']

export interface House {
  /** */
  state: HouseState | null
  /**
   * Account balance available in the House wallet
   */
  balance: number
  /**
   * The maximum number of lamports a User can win in a bet
   */
  maxPayout: number
  /**
   * For every bet a certain % is rewarded to the House and Game creator
   */
  fees: {
    /** Fee to the Game creator (1% = 0.01) */
    creator: number
    /** Fee to the House treasury (1% = 0.01) */
    house: number
  }
}

export interface User {
  /**
   * The raw on-chain state of the account
   */
  state: UserState | null
  /**
   * If the account has been created and exists
   */
  created: boolean
  /**
   * Account balance available to the player
   */
  balance: number
  /**
   * Total account balance in lamports (Including rent)
   */
  _accountBalance: number
  /**
   *
  */
  status: UserStatus
}

export interface Wallet {
  /**
   * Lamports in the players wallet
   */
  balance: number
}

export interface GambaStore {
  accounts: GambaAccounts
  eventEmitter: GambaEventEmitter
  set: StoreApi<GambaStore>['setState']
  config: GambaConfig
  seed: string
  user: User
  house: House
  wallet: Wallet
  recentGames: SettledGameEvent[]
  addRecentGames: (bets: SettledGameEvent[]) => void
}
