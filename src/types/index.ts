export interface User {
  id: string
  name: string
  age: number
  city: string
  occupation: string
  monthlyIncome: number
  deposit: Deposit
  brokerageAccount: boolean
  investments: Investment[]
  preferences: Preferences
  investmentProfile?: InvestmentProfile
}

export interface Deposit {
  amount: number
  termMonths: number
  rate: number
  startDate: string
  maturityDate: string
}

export interface Investment {
  fundSymbol: string
  amount: number
  purchaseDate: string
  shares: number
}

export interface Fund {
  symbol: string
  name: string
  type: 'money_market' | 'bond' | 'etf'
  description: string
  currentPrice: number
  dailyChange: number
  annualReturnEstimate: number
  riskLevel: string
  insurance?: string
  coupon?: number
  maturity?: string
}

export interface Preferences {
  riskTolerance: string
  investmentGoals: string[]
}

export interface QuizAnswers {
  age: string
  horizon: string
  risk: string
  depositSize: string
  knowledge: string
  experience: string
  willingPercent: string
}

export type InvestmentProfile =
  | 'conservative_short'
  | 'conservative_medium'
  | 'conservative_long'
  | 'moderate_short'
  | 'moderate_medium'
  | 'moderate_long'
  | 'aggressive_short'
  | 'aggressive_medium'
  | 'aggressive_long'

