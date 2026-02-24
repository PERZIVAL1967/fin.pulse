import React, { useEffect, useState } from 'react'
import type { User, Fund } from '../types'
import { getFundBySymbol, calculateMaturityCountdown } from '../services/dataService'
import ComparisonBox from './ComparisonBox'
import InfoModal from './InfoModal'
import FundChart from './FundChart'

interface NudgeCardProps {
  user: User
  onTryClick: () => void
}

const NudgeCard: React.FC<NudgeCardProps> = ({ user, onTryClick }) => {
  const [fund, setFund] = useState<Fund | null>(null)
  const [daysLeft, setDaysLeft] = useState<number>(0)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  useEffect(() => {
    const loadFund = async () => {
      const lqdt = await getFundBySymbol('LQDT')
      setFund(lqdt ?? null)
    }
    void loadFund()
    setDaysLeft(calculateMaturityCountdown(user.deposit.maturityDate))
  }, [user.deposit.maturityDate])

  if (daysLeft > 14) return null
  if (!fund) return null

  const tenPercent = user.deposit.amount * 0.1
  const fundAnnualReturn = fund.annualReturnEstimate

  return (
    <>
      <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          💡 Персональная рекомендация fin.pulse
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          <span className="font-medium">{user.name},</span> ваш вклад{' '}
          <span className="font-medium">{user.deposit.amount.toLocaleString()} ₽</span> под{' '}
          {user.deposit.rate}% заканчивается через <span className="font-medium">{daysLeft} дней</span>.
        </p>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          Если вы переведёте{' '}
          <span className="font-bold text-red-600 dark:text-red-400">
            {tenPercent.toLocaleString()} ₽ (10%)
          </span>{' '}
          в фонд <span className="font-medium">{fund.name}</span>, вы можете получить{' '}
          <span className="font-bold text-green-600 dark:text-green-400">
            +
            {Math.round(
              tenPercent * (fundAnnualReturn / 100) * (user.deposit.termMonths / 12),
            ).toLocaleString()}{' '}
            ₽
          </span>{' '}
          за те же {user.deposit.termMonths} месяца – с той же ликвидностью (можно забрать в любой
          день без штрафа).
        </p>

        <ComparisonBox
          depositAmount={user.deposit.amount}
          depositRate={user.deposit.rate}
          depositTermMonths={user.deposit.termMonths}
          fundAmount={tenPercent}
          fundAnnualReturn={fundAnnualReturn}
        />

        <div className="mt-6 flex space-x-3">
          <button
            onClick={onTryClick}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Попробовать 10%
          </button>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 px-6 rounded-lg transition"
          >
            Подробнее
          </button>
        </div>
      </div>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Что такое БПИФ денежного рынка?"
      >
        <div className="space-y-4">
          <p>
            <strong>Биржевой паевой инвестиционный фонд (БПИФ) «Ликвидность»</strong> — это фонд,
            который вкладывает деньги в краткосрочные и надёжные активы: сделки репо с ОФЗ,
            краткосрочные облигации государства и крупных компаний.
          </p>
          <p>
            Доходность фонда близка к ключевой ставке (сейчас {fund?.annualReturnEstimate}% годовых),
            но{' '}
            <span className="font-semibold text-red-600 dark:text-red-400">
              не застрахована государством
            </span>
            , как вклады. Однако риск очень низкий, потому что активы высокого качества.
          </p>
          <p>
            Вы можете продать паи в любой торговый день без штрафов и комиссий — ликвидность как у
            вклада.
          </p>
          <FundChart />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              ⚠️ Инвестиции на фондовом рынке не застрахованы государством (АСВ). Но фонд денежного
              рынка считается одним из самых консервативных инструментов.
            </p>
          </div>
        </div>
      </InfoModal>
    </>
  )
}

export default NudgeCard

