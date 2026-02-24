import db from '../../db.json'
import type { User, Fund, Investment } from '../types'

type DbSchema = {
  users: User[]
  funds: Fund[]
}

const dbData = db as DbSchema

// We'll use a copy in memory to allow updates
let currentUser: User = { ...dbData.users[0] }
const funds: Fund[] = dbData.funds

// Simulate API delay (optional)
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export const getUser = async (): Promise<User> => {
  await delay(300)
  return currentUser
}

const withSimulatedPrice = (fund: Fund): Fund => {
  const dailyChange = (fund as Fund & { dailyChange?: number }).dailyChange ?? 0
  const factor = 1 + dailyChange
  return {
    ...fund,
    currentPrice: fund.currentPrice * factor,
  }
}

export const getFunds = async (): Promise<Fund[]> => {
  await delay(300)
  return funds.map(withSimulatedPrice)
}

export const getFundBySymbol = async (symbol: string): Promise<Fund | undefined> => {
  await delay(300)
  const fund = funds.find((f) => f.symbol === symbol)
  return fund ? withSimulatedPrice(fund) : undefined
}

export const updateUserInvestments = async (
  investmentAmount: number,
  fundSymbol: string,
): Promise<User> => {
  await delay(500)

  const fund = funds.find((f) => f.symbol === fundSymbol)
  const price = fund?.currentPrice ?? 1

  const newInvestment: Investment = {
    fundSymbol,
    amount: investmentAmount,
    purchaseDate: new Date().toISOString().split('T')[0],
    shares: investmentAmount / price,
  }

  currentUser = {
    ...currentUser,
    deposit: {
      ...currentUser.deposit,
      amount: currentUser.deposit.amount - investmentAmount,
    },
    investments: [...currentUser.investments, newInvestment],
    // In a real app, you'd also open a brokerage account if needed
    brokerageAccount: true,
  }

  return currentUser
}

export const calculateMaturityCountdown = (maturityDate: string): number => {
  const today = new Date()
  const maturity = new Date(maturityDate)
  const diffTime = maturity.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

