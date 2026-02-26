import React, { useState } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  amount: number
  fundName: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  fundName,
}) => {
  const [step, setStep] = useState(1)

  if (!isOpen) return null

  const handleBack = () => {
    if (step === 2) setStep(1)
    else onClose()
  }

  const handleNext = () => {
    if (step === 1) setStep(2)
    else {
      onConfirm()
      onClose()
    }
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(n)

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-stone-900/60 dark:bg-gray-900/80 transition-opacity"
          onClick={onClose}
        />
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-5 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-semibold text-stone-900 dark:text-white">
                  {step === 1 ? 'Подтвердите перевод' : 'Последний шаг'}
                </h3>
                <div className="mt-4 text-stone-700 dark:text-gray-200">
                  {step === 1 ? (
                    <div>
                      <p>
                        Вы собираетесь перевести{' '}
                        <span className="font-bold">{formatCurrency(amount)}</span> в фонд{' '}
                        <span className="font-bold">{fundName}</span>.
                      </p>
                      <p className="mt-2 text-sm text-stone-600 dark:text-gray-300">
                        Для этого мы откроем брокерский счёт (если его ещё нет) и сразу купим паи. Вы
                        сможете продать их в любой момент без штрафов.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-amber-600 dark:text-amber-400">Внимание!</p>
                      <p>
                        Инвестиции не застрахованы государством. Вы подтверждаете, что ознакомлены с
                        рисками и хотите продолжить?
                      </p>
                      <p className="mt-2 text-sm text-stone-600 dark:text-gray-300">
                        Средства будут списаны с вашего вклада после его окончания и инвестированы в
                        фонд.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-stone-50 dark:bg-gray-700 px-5 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleNext}
              className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-5 py-2.5 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition"
            >
              {step === 1 ? 'Продолжить' : 'Подтвердить'}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="mt-3 w-full inline-flex justify-center rounded-xl border border-stone-300 dark:border-gray-600 shadow-sm px-5 py-2.5 bg-white dark:bg-gray-800 text-base font-medium text-stone-700 dark:text-gray-200 hover:bg-stone-50 dark:hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition"
            >
              {step === 1 ? 'Отмена' : 'Назад'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
