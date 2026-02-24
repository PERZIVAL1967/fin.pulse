import React from 'react'

interface ComparisonBoxProps {
  depositAmount: number
  depositRate: number
  depositTermMonths: number
  fundAmount: number
  fundAnnualReturn: number
}

const ComparisonBox: React.FC<ComparisonBoxProps> = ({
  depositAmount,
  depositRate,
  depositTermMonths,
  fundAmount,
  fundAnnualReturn,
}) => {
  const depositReturn = depositAmount * (depositRate / 100) * (depositTermMonths / 12)
  const fundReturn = fundAmount * (fundAnnualReturn / 100) * (depositTermMonths / 12)

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(n)

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
      <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200">
        <span>Вклад ({depositTermMonths} мес.):</span>
        <span className="font-medium">{formatCurrency(depositReturn)}</span>
      </div>
      <div className="flex justify-between py-1 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
        <span>Фонд (10% от вклада):</span>
        <span className="font-medium text-green-600 dark:text-green-400">
          {formatCurrency(fundReturn)}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        * Доходность фонда оценочная, не гарантирована. Фонд не застрахован, но риски минимальны.
      </p>
    </div>
  )
}

export default ComparisonBox

