import React, { useState } from 'react'
import type { Investment, Fund } from '../types'
import SellConfirmationModal from './SellConfirmationModal'

interface InvestmentCardProps {
  investments: Investment[]
  funds: Fund[]
  onSell: (fundSymbol: string) => void
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investments, funds, onSell }) => {
  const [sellModalOpen, setSellModalOpen] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState<{
    fundSymbol: string
    fundName: string
    currentValue: number
  } | null>(null)

  if (investments.length === 0) return null

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(n)

  const handleSellClick = (inv: Investment) => {
    const fund = funds.find((f) => f.symbol === inv.fundSymbol)
    if (!fund) return
    const currentValue = inv.shares * fund.currentPrice
    setSelectedInvestment({
      fundSymbol: inv.fundSymbol,
      fundName: fund.name,
      currentValue,
    })
    setSellModalOpen(true)
  }

  const handleConfirmSell = () => {
    if (selectedInvestment) {
      onSell(selectedInvestment.fundSymbol)
      setSellModalOpen(false)
      setSelectedInvestment(null)
    }
  }

  return (
    <>
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-stone-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-stone-700 dark:text-gray-200 mb-4">
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
              className="border-t border-stone-100 dark:border-gray-700 pt-4 first:border-t-0 first:pt-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-stone-900 dark:text-white">
                    {fund?.name ?? inv.fundSymbol}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-gray-400">
                    {inv.shares.toFixed(2)} паёв
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900 dark:text-white">
                    {formatCurrency(currentValue)}
                  </p>
                  <p
                    className={`text-sm ${
                      gain >= 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
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
                  onClick={() => handleSellClick(inv)}
                  className="text-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 px-3 py-1 rounded-lg transition"
                >
                  Продать
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {selectedInvestment && (
        <SellConfirmationModal
          isOpen={sellModalOpen}
          onClose={() => setSellModalOpen(false)}
          onConfirm={handleConfirmSell}
          fundName={selectedInvestment.fundName}
          currentValue={selectedInvestment.currentValue}
        />
      )}
    </>
  )
}

export default InvestmentCard
