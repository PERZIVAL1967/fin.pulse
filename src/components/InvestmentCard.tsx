import React from 'react'
import type { Investment, Fund } from '../types'

interface InvestmentCardProps {
  investments: Investment[]
  funds: Fund[]
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investments, funds }) => {
  if (investments.length === 0) return null

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(n)

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Ваши инвестиции
      </h2>
      {investments.map((inv, idx) => {
        const fund = funds.find((f) => f.symbol === inv.fundSymbol)
        const currentPrice = fund?.currentPrice ?? 0
        const currentValue = inv.shares * currentPrice
        const gain = currentValue - inv.amount
        const gainPercent = inv.amount > 0 ? (gain / inv.amount) * 100 : 0

        return (
          <div
            key={idx}
            className="border-t border-gray-100 dark:border-gray-700 pt-4 first:border-t-0 first:pt-0"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {fund?.name ?? inv.fundSymbol}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {inv.shares.toFixed(2)} паёв
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(currentValue)}
                </p>
                <p
                  className={`text-sm ${
                    gain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {gain >= 0 ? '+' : ''}
                  {formatCurrency(gain)} ({gainPercent >= 0 ? '+' : ''}
                  {gainPercent.toFixed(2)}%)
                </p>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                disabled
                className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded cursor-not-allowed"
                title="Продажа будет доступна в следующих версиях"
              >
                Продать
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InvestmentCard

