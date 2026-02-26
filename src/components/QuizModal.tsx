import React, { useState } from 'react'
import type { QuizAnswers } from '../types'

interface QuizModalProps {
  isOpen: boolean
  onComplete: (answers: QuizAnswers) => void
  onClose: () => void
}

const questions = [
  {
    key: 'age',
    question: 'Ваш возраст?',
    options: [
      { value: '18-30', label: '18–30 лет' },
      { value: '31-45', label: '31–45 лет' },
      { value: '46-60', label: '46–60 лет' },
      { value: '60+', label: 'Старше 60' },
    ],
  },
  {
    key: 'horizon',
    question: 'На какой срок вы готовы не трогать деньги?',
    options: [
      { value: '<1', label: 'Меньше года' },
      { value: '1-3', label: '1–3 года' },
      { value: '3+', label: 'Более 3 лет' },
    ],
  },
  {
    key: 'risk',
    question: 'Как вы относитесь к риску?',
    options: [
      { value: 'avoid', label: 'Избегаю риска' },
      { value: 'preserve', label: 'Главное — не потерять' },
      { value: 'moderate', label: 'Готов к небольшим колебаниям' },
      { value: 'high', label: 'Готов к полноценному риску' },
    ],
  },
  {
    key: 'depositSize',
    question: 'Размер вашего вклада?',
    options: [
      { value: '<500k', label: 'До 500 000 ₽' },
      { value: '500k-1m', label: '500 000 – 1 000 000 ₽' },
      { value: '>1m', label: 'Более 1 000 000 ₽' },
    ],
  },
  {
    key: 'knowledge',
    question: 'Как вы оцениваете свои знания в инвестициях?',
    options: [
      { value: 'none', label: 'Ничего не знаю' },
      { value: 'basic', label: 'Могу отличить акцию от облигации' },
      { value: 'intermediate', label: 'Понимаю работу биржи, но не углублялся' },
      { value: 'advanced', label: 'Имею багаж знаний в инвестировании' },
    ],
  },
  {
    key: 'experience',
    question: 'Есть ли у вас опыт инвестирования?',
    options: [
      { value: 'none', label: 'Нет' },
      { value: 'tried', label: 'Приобретал бумаги, но быстро продал' },
      { value: 'occasional', label: 'Периодически покупаю, держу несколько месяцев' },
      { value: 'active', label: 'Да, активно инвестирую' },
    ],
  },
  {
    key: 'willingPercent',
    question: 'Какую часть сбережений готовы инвестировать?',
    options: [
      { value: '<10', label: 'Менее 10%' },
      { value: '10-20', label: '10–20%' },
      { value: '20-40', label: '20–40%' },
      { value: '40-60', label: '40–60%' },
      { value: '>60', label: 'Более 60%' },
    ],
  },
]

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onComplete, onClose }) => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})

  if (!isOpen) return null

  const currentQuestion = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value }
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      onComplete(newAnswers as QuizAnswers)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-stone-900/60 dark:bg-gray-900/80"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-white mb-4">
            Поможем подобрать стратегию
          </h2>
          <div className="mb-5">
            <div className="h-2 bg-stone-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-stone-500 dark:text-gray-400 mt-1.5">
              Вопрос {step + 1} из {questions.length}
            </p>
          </div>
          <p className="text-lg text-stone-800 dark:text-white mb-4">{currentQuestion.question}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left px-4 py-3 bg-stone-50 dark:bg-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-600 border border-stone-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700 rounded-xl transition text-stone-800 dark:text-white"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-4 text-sm text-stone-500 dark:text-gray-400 hover:text-stone-700 dark:hover:text-gray-300 transition"
          >
            Пропустить
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizModal
