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
    <div className="bg-stone-50 dark:bg-gray-800 p-4 rounded-xl border border-stone-200 dark:border-gray-700 text-sm">
      <div className="flex justify-between py-1 text-stone-700 dark:text-gray-200">
        <span>Вклад ({depositTermMonths} мес.):</span>
        <span className="font-medium">{formatCurrency(depositReturn)}</span>
      </div>
      <div className="flex justify-between py-1 border-t border-stone-200 dark:border-gray-700 text-stone-700 dark:text-gray-200">
        <span>Фонд (от вклада):</span>
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          {formatCurrency(fundReturn)}
        </span>
      </div>
      <p className="text-xs text-stone-500 dark:text-gray-400 mt-2">
        * Доходность фонда оценочная, не гарантирована. Фонд не застрахован, но риски минимальны.
      </p>
    </div>
  )
}

export default ComparisonBox
