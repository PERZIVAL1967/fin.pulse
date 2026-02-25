import React, { useState } from 'react'
import InfoModal from './InfoModal'

const NextSteps: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: JSX.Element } | null>(
    null,
  )

  const openModal = (title: string, content: JSX.Element) => {
    setModalContent({ title, content })
  }

  const closeModal = () => setModalContent(null)

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Следующие шаги</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Вы уже начали инвестировать! Вот что можно рассмотреть дальше:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => openModal('Индивидуальный инвестиционный счёт (ИИС)', <IISContent />)}
          className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 p-4 rounded-lg text-left transition border border-red-200 dark:border-red-800"
        >
          <h3 className="font-medium text-red-800 dark:text-red-400">ИИС</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Верните до 52 000 ₽ в год налогов
          </p>
        </button>
        <button
          onClick={() => openModal('Облигации федерального займа (ОФЗ)', <OFZContent />)}
          className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 p-4 rounded-lg text-left transition border border-green-200 dark:border-green-800"
        >
          <h3 className="font-medium text-green-800 dark:text-green-400">ОФЗ</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Доходность выше вклада с надёжностью государства
          </p>
        </button>
        <button
          onClick={() => openModal('Фонды широкого рынка', <IndexFundContent />)}
          className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 p-4 rounded-lg text-left transition border border-purple-200 dark:border-purple-800"
        >
          <h3 className="font-medium text-purple-800 dark:text-purple-400">Индексные фонды</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Диверсификация одним паем</p>
        </button>
      </div>

      {modalContent && (
        <InfoModal isOpen={!!modalContent} onClose={closeModal} title={modalContent.title}>
          {modalContent.content}
        </InfoModal>
      )}
    </div>
  )
}

const IISContent = () => (
  <div className="space-y-3 text-gray-700 dark:text-gray-200">
    <p>
      Индивидуальный инвестиционный счёт (ИИС) — специальный брокерский счёт с налоговыми льготами.
    </p>
    <p>
      <strong>Тип А:</strong> возврат 13% от внесённой суммы (до 52 000 ₽ в год), если вы платите
      НДФЛ.
    </p>
    <p>
      <strong>Тип Б:</strong> освобождение от налога на прибыль от инвестиций.
    </p>
    <p>Чтобы получить вычет, нужно держать счёт открытым не менее 3 лет (с 2024 года — 5 лет).</p>
  </div>
)

const OFZContent = () => (
  <div className="space-y-3 text-gray-700 dark:text-gray-200">
    <p>
      Облигации федерального займа (ОФЗ) — это государственные ценные бумаги. Вы даёте деньги в долг
      государству, а оно платит вам купоны (проценты) и возвращает номинал в конце срока.
    </p>
    <p>Считаются одним из самых надёжных инструментов в рублях, доходность часто выше вкладов.</p>
  </div>
)

const IndexFundContent = () => (
  <div className="space-y-3 text-gray-700 dark:text-gray-200">
    <p>
      Индексные фонды (например, на индекс МосБиржи) покупают сразу все акции из индекса в тех же
      пропорциях. Вы получаете готовую диверсификацию одной покупкой.
    </p>
    <p>
      Риск ниже, чем покупка отдельных акций, потому что падение одной компании компенсируется
      ростом других.
    </p>
  </div>
)

export default NextSteps

