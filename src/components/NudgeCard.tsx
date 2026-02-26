import React, { useEffect, useState } from 'react'
import type { User, Fund, InvestmentProfile } from '../types'
import { getFundBySymbol, calculateMaturityCountdown } from '../services/dataService'
import ComparisonBox from './ComparisonBox'
import InfoModal from './InfoModal'
import FundChart from './FundChart'
import { getRecommendedFirstStep, getProfileDisplayName } from '../utils/profileCalculator'

interface NudgeCardProps {
  user: User
  profile: InvestmentProfile
  onTryClick: () => void
}

const NudgeCard: React.FC<NudgeCardProps> = ({ user, profile, onTryClick }) => {
  const [fund, setFund] = useState<Fund | null>(null)
  const [daysLeft, setDaysLeft] = useState<number>(0)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  const recommendation = getRecommendedFirstStep(profile)

  useEffect(() => {
    const loadFund = async () => {
      const f = await getFundBySymbol(recommendation.fundSymbol)
      setFund(f ?? null)
    }
    void loadFund()
    setDaysLeft(calculateMaturityCountdown(user.deposit.maturityDate))
  }, [user.deposit.maturityDate, profile, recommendation.fundSymbol])

  if (daysLeft > 14) return null
  if (!fund) return null

  const recommendedAmount = user.deposit.amount * (recommendation.percent / 100)
  const fundAnnualReturn = fund.annualReturnEstimate

  return (
    <>
      <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-stone-800 dark:text-white">
            Персональная рекомендация
          </h2>
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full">
            {getProfileDisplayName(profile)}
          </span>
        </div>
        <p className="text-stone-700 dark:text-gray-200 mb-4">
          <span className="font-medium">{user.name},</span> ваш вклад{' '}
          <span className="font-medium">{user.deposit.amount.toLocaleString()} ₽</span> под{' '}
          {user.deposit.rate}% заканчивается через{' '}
          <span className="font-medium">{daysLeft} дней</span>.
        </p>
        <p className="text-stone-700 dark:text-gray-200 mb-4">
          {recommendation.message} Мы рекомендуем{' '}
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            {recommendation.percent}% ({recommendedAmount.toLocaleString()} ₽)
          </span>{' '}
          в фонд <span className="font-medium">{fund.name}</span>.
        </p>

        <ComparisonBox
          depositAmount={user.deposit.amount}
          depositRate={user.deposit.rate}
          depositTermMonths={user.deposit.termMonths}
          fundAmount={recommendedAmount}
          fundAnnualReturn={fundAnnualReturn}
        />

        <div className="mt-6 flex space-x-3">
          <button
            onClick={onTryClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-6 rounded-xl transition shadow-sm"
          >
            Попробовать {recommendation.percent}%
          </button>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="bg-white dark:bg-gray-700 border border-stone-300 dark:border-gray-600 hover:bg-stone-50 dark:hover:bg-gray-600 text-stone-700 dark:text-gray-200 font-medium py-2.5 px-6 rounded-xl transition"
          >
            Подробнее
          </button>
        </div>
      </div>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title={`Что такое ${fund.name}?`}
      >
        <div className="space-y-4">
          <p>{fund.description}</p>
          <p>
            Доходность фонда оценочно {fund.annualReturnEstimate}% годовых.
            {fund.insurance && ` Фонд ${fund.insurance}.`} Риск {fund.riskLevel}.
          </p>
          {fund.type === 'money_market' && (
            <>
              <p>
                Вы можете продать паи в любой торговый день без штрафов — ликвидность как у вклада.
              </p>
              <FundChart />
            </>
          )}
          {fund.type === 'bond' && (
            <p>
              Облигации приносят регулярный купонный доход. При досрочной продаже цена может немного
              колебаться.
            </p>
          )}
          {fund.type === 'etf' && (
            <p>
              Индексный фонд повторяет состав биржевого индекса, снижая риск отдельных акций.
            </p>
          )}
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              ⚠️ Инвестиции на фондовом рынке не застрахованы государством (АСВ).
            </p>
          </div>
        </div>
      </InfoModal>
    </>
  )
}

export default NudgeCard
