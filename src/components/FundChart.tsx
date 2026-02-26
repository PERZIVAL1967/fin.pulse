import React from 'react'

const FundChart: React.FC = () => {
  const values = [1.12, 1.13, 1.14, 1.14, 1.15, 1.16]

  return (
    <div className="bg-stone-100 dark:bg-gray-700 p-4 rounded-xl">
      <p className="text-sm text-stone-600 dark:text-gray-300 mb-2">
        Динамика стоимости пая (за последние 6 месяцев):
      </p>
      <div className="h-24 flex items-end space-x-1">
        {values.map((val, i) => (
          <div
            key={i}
            className="w-8 bg-emerald-400 dark:bg-emerald-500 rounded-t"
            style={{ height: `${(val - 1.12) * 200 + 20}px` }}
          />
        ))}
      </div>
      <p className="text-xs text-stone-500 dark:text-gray-400 mt-2">
        Плавный рост без резких скачков (иллюстрация)
      </p>
    </div>
  )
}

export default FundChart
