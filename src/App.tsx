import { useEffect, useState } from 'react'
import Header from './components/Header'
import DepositCard from './components/DepositCard'
import NudgeCard from './components/NudgeCard'
import ConfirmationModal from './components/ConfirmationModal'
import InvestmentCard from './components/InvestmentCard'
import NextSteps from './components/NextSteps'
import QuizModal from './components/QuizModal'
import {
  getUser,
  updateUserInvestments,
  getFunds,
  getFundBySymbol,
  sellInvestment,
} from './services/dataService'
import type { User, Fund, QuizAnswers, InvestmentProfile } from './types'
import { calculateProfile, getRecommendedFirstStep } from './utils/profileCalculator'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [funds, setFunds] = useState<Fund[]>([])
  const [loading, setLoading] = useState(true)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<InvestmentProfile | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
        const fundsData = await getFunds()
        setFunds(fundsData)
        if (userData.investmentProfile) {
          setUserProfile(userData.investmentProfile)
        } else {
          setIsQuizOpen(true)
        }
      } catch (error) {
        console.error('Failed to load data', error)
      } finally {
        setLoading(false)
      }
    }
    void loadData()
  }, [])

  const handleQuizComplete = (answers: QuizAnswers) => {
    const profile = calculateProfile(answers)
    setUserProfile(profile)
    if (user) {
      setUser({ ...user, investmentProfile: profile })
    }
    setIsQuizOpen(false)
  }

  const handleTryClick = async () => {
    if (!userProfile) return
    const recommendation = getRecommendedFirstStep(userProfile)
    const fund = await getFundBySymbol(recommendation.fundSymbol)
    setSelectedFund(fund ?? null)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmInvestment = async () => {
    if (!user || !selectedFund || !userProfile) return
    const recommendation = getRecommendedFirstStep(userProfile)
    const amountToInvest = user.deposit.amount * (recommendation.percent / 100)
    try {
      const updatedUser = await updateUserInvestments(amountToInvest, selectedFund.symbol)
      setUser(updatedUser)
      setSuccessMessage(
        `Отлично! ${amountToInvest.toLocaleString()} ₽ переведены в фонд ${selectedFund.name}.`,
      )
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (error) {
      console.error('Investment failed', error)
      alert('Что‑то пошло не так. Попробуйте позже.')
    }
  }

  const handleSell = async (fundSymbol: string) => {
    if (!user) return
    try {
      const updatedUser = await sellInvestment(fundSymbol)
      setUser(updatedUser)
      setSuccessMessage('Инвестиция продана. Средства зачислены на ваш вклад.')
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (error) {
      console.error('Sell failed', error)
      alert('Не удалось продать. Попробуйте позже.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-stone-50 dark:bg-gray-900 text-stone-900 dark:text-white">
        Загрузка...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-gray-900 text-stone-900 dark:text-white">
        Ошибка загрузки данных
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-900 text-stone-900 dark:text-white transition-colors">
      <Header userName={user.name} />
      <main className="max-w-4xl mx-auto py-8 px-4">
        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl">
            {successMessage}
          </div>
        )}
        <DepositCard deposit={user.deposit} />
        {userProfile ? (
          <NudgeCard user={user} profile={userProfile} onTryClick={handleTryClick} />
        ) : (
          <div className="mt-8 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-gray-800 dark:to-gray-800 border border-stone-200 dark:border-gray-700 rounded-2xl p-6 text-center">
            <p className="text-stone-700 dark:text-gray-200">
              Пройдите короткий опрос, чтобы получить персональную рекомендацию.
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-6 rounded-xl transition shadow-sm"
            >
              Начать опрос
            </button>
          </div>
        )}
        <InvestmentCard investments={user.investments} funds={funds} onSell={handleSell} />
        {user.investments.length > 0 && <NextSteps />}
      </main>

      <QuizModal
        isOpen={isQuizOpen}
        onComplete={handleQuizComplete}
        onClose={() => setIsQuizOpen(false)}
      />

      {selectedFund && userProfile && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmInvestment}
          amount={user.deposit.amount * (getRecommendedFirstStep(userProfile).percent / 100)}
          fundName={selectedFund.name}
        />
      )}
    </div>
  )
}

export default App
