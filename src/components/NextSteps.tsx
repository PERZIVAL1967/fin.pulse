import { useState, type ReactNode } from 'react'
import InfoModal from './InfoModal'

const NextSteps = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode } | null>(
    null,
  )

  const openModal = (title: string, content: ReactNode) => {
    setModalContent({ title, content })
  }

  const closeModal = () => setModalContent(null)

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-stone-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-stone-700 dark:text-gray-200 mb-4">
        Следующие шаги
      </h2>
      <p className="text-stone-600 dark:text-gray-300 mb-4">
        Вы уже начали инвестировать! Вот что можно рассмотреть дальше:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => openModal('Индивидуальный инвестиционный счёт (ИИС)', <IISContent />)}
          className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 p-4 rounded-xl text-left transition border border-blue-200 dark:border-blue-800"
        >
          <h3 className="font-medium text-blue-800 dark:text-blue-400">ИИС</h3>
          <p className="text-sm text-stone-600 dark:text-gray-300">
            Верните до 52 000 ₽ в год налогов
          </p>
        </button>
        <button
          onClick={() => openModal('Облигации федерального займа (ОФЗ)', <OFZContent />)}
          className="bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 p-4 rounded-xl text-left transition border border-emerald-200 dark:border-emerald-800"
        >
          <h3 className="font-medium text-emerald-800 dark:text-emerald-400">ОФЗ</h3>
          <p className="text-sm text-stone-600 dark:text-gray-300">
            Доходность выше вклада с надёжностью государства
          </p>
        </button>
        <button
          onClick={() => openModal('Фонды широкого рынка', <IndexFundContent />)}
          className="bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/40 p-4 rounded-xl text-left transition border border-violet-200 dark:border-violet-800"
        >
          <h3 className="font-medium text-violet-800 dark:text-violet-400">Индексные фонды</h3>
          <p className="text-sm text-stone-600 dark:text-gray-300">Диверсификация одним паем</p>
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
  <div className="space-y-3 text-stone-700 dark:text-gray-200">
    <p>
      Индивидуальный инвестиционный счёт (ИИС) — специальный брокерский счёт с налоговыми льготами.
    </p>
    <p>
      <strong>Тип А:</strong> возврат 13% от внесённой суммы (до 52 000 ₽ в год), если вы платите
      НДФЛ.
    </p>
    <p>
      <strong>Тип Б:</strong> освобождение от налога на прибыль от инвестиций.
    </p>
    <p>Чтобы получить вычет, нужно держать счёт открытым не менее 3 лет (с 2024 года — 5 лет).</p>
  </div>
)

const OFZContent = () => (
  <div className="space-y-3 text-stone-700 dark:text-gray-200">
    <p>
      Облигации федерального займа (ОФЗ) — это государственные ценные бумаги. Вы даёте деньги в долг
      государству, а оно платит вам купоны (проценты) и возвращает номинал в конце срока.
    </p>
    <p>Считаются одним из самых надёжных инструментов в рублях, доходность часто выше вкладов.</p>
  </div>
)

const IndexFundContent = () => (
  <div className="space-y-3 text-stone-700 dark:text-gray-200">
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
