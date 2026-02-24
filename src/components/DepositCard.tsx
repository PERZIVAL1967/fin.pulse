import React, { useEffect, useState } from 'react'
import type { Deposit } from '../types'
import { calculateMaturityCountdown } from '../services/dataService'

interface DepositCardProps {
  deposit: Deposit
}

const DepositCard: React.FC<DepositCardProps> = ({ deposit }) => {
  const [daysLeft, setDaysLeft] = useState<number>(0)

  useEffect(() => {
    setDaysLeft(calculateMaturityCountdown(deposit.maturityDate))
    const interval = setInterval(() => {
      setDaysLeft(calculateMaturityCountdown(deposit.maturityDate))
    }, 1000 * 60 * 60 * 24)
    return () => clearInterval(interval)
  }, [deposit.maturityDate])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const pluralizeDays = (days: number) => {
    const absDays = Math.abs(days)
    const lastDigit = absDays % 10
    const lastTwoDigits = absDays % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'дней'
    if (lastDigit === 1) return 'день'
    if (lastDigit >= 2 && lastDigit <= 4) return 'дня'
    return 'дней'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Ваш вклад</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Сумма</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(deposit.amount)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ставка</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{deposit.rate}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Срок</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {deposit.termMonths} месяца
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">До окончания</p>
          <p
            className={`text-lg font-medium ${
              daysLeft <= 14 ? 'text-red-500 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {daysLeft} {pluralizeDays(daysLeft)}
          </p>
        </div>
      </div>
      {daysLeft <= 14 && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-700 dark:text-red-400 text-sm">
            ⏰ Ваш вклад скоро закончится. Посмотрите персональную рекомендацию ниже.
          </p>
        </div>
      )}
    </div>
  )
}

export default DepositCard

