import { useEffect, useState } from 'react'
import Header from './components/Header'
import DepositCard from './components/DepositCard'
import NudgeCard from './components/NudgeCard'
import ConfirmationModal from './components/ConfirmationModal'
import InvestmentCard from './components/InvestmentCard'
import NextSteps from './components/NextSteps'
import { getUser, updateUserInvestments, getFunds, getFundBySymbol } from './services/dataService'
import type { User, Fund } from './types'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [funds, setFunds] = useState<Fund[]>([])
  const [loading, setLoading] = useState(true)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
        const fundsData = await getFunds()
        setFunds(fundsData)
      } catch (error) {
        console.error('Failed to load data', error)
      } finally {
        setLoading(false)
      }
    }
    void loadData()
  }, [])

  const handleTryClick = async () => {
    const fund = await getFundBySymbol('LQDT')
    setSelectedFund(fund ?? null)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmInvestment = async () => {
    if (!user || !selectedFund) return
    const amountToInvest = user.deposit.amount * 0.1
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        Загрузка...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        Ошибка загрузки данных
      </div>
    )
  }

  const tenPercent = user.deposit.amount * 0.1

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <Header userName={user.name} />
      <main className="max-w-4xl mx-auto py-8 px-4">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 rounded-lg">
            {successMessage}
          </div>
        )}
        <DepositCard deposit={user.deposit} />
        <NudgeCard user={user} onTryClick={handleTryClick} />
        <InvestmentCard investments={user.investments} funds={funds} />
        {user.investments.length > 0 && <NextSteps />}
      </main>
      {selectedFund && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmInvestment}
          amount={tenPercent}
          fundName={selectedFund.name}
        />
      )}
    </div>
  )
}

export default App
