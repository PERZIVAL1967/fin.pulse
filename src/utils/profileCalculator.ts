import type { QuizAnswers, InvestmentProfile } from '../types'

export const calculateProfile = (answers: QuizAnswers): InvestmentProfile => {
  let riskCategory: 'conservative' | 'moderate' | 'aggressive'
  if (answers.risk === 'avoid' || answers.risk === 'preserve') {
    riskCategory = 'conservative'
  } else if (answers.risk === 'moderate') {
    riskCategory = 'moderate'
  } else {
    riskCategory = 'aggressive'
  }

  let horizonCategory: 'short' | 'medium' | 'long'
  if (answers.horizon === '<1') {
    horizonCategory = 'short'
  } else if (answers.horizon === '1-3') {
    horizonCategory = 'medium'
  } else {
    horizonCategory = 'long'
  }

  return `${riskCategory}_${horizonCategory}` as InvestmentProfile
}

interface Recommendation {
  fundSymbol: string
  percent: number
  message: string
}

const recommendations: Record<InvestmentProfile, Recommendation> = {
  conservative_short: {
    fundSymbol: 'LQDT',
    percent: 5,
    message:
      'С коротким горизонтом и низкой толерантностью к риску начните с 5% в фонд денежного рынка.',
  },
  conservative_medium: {
    fundSymbol: 'LQDT',
    percent: 10,
    message: 'Средний срок и консервативный подход — 10% в БПИФ для плавного старта.',
  },
  conservative_long: {
    fundSymbol: 'OFZ',
    percent: 15,
    message: 'Долгий горизонт позволяет добавить ОФЗ: 15% в государственные облигации.',
  },
  moderate_short: {
    fundSymbol: 'LQDT',
    percent: 10,
    message:
      'Короткий срок, но готовность к риску — начните с 10% в БПИФ, позже можно добавить облигации.',
  },
  moderate_medium: {
    fundSymbol: 'OFZ',
    percent: 20,
    message: 'Умеренный риск и средний срок — 20% в ОФЗ для баланса доходности и надёжности.',
  },
  moderate_long: {
    fundSymbol: 'IIS',
    percent: 20,
    message:
      'Долгосрочный умеренный инвестор — откройте ИИС и вложите 20% в облигации с налоговым вычетом.',
  },
  aggressive_short: {
    fundSymbol: 'LQDT',
    percent: 15,
    message:
      'Короткий срок, но вы готовы рисковать — можно начать с 15% в БПИФ, но держать недолго.',
  },
  aggressive_medium: {
    fundSymbol: 'INDEX',
    percent: 20,
    message: 'Средний срок и высокая толерантность — 20% в индексный фонд для роста.',
  },
  aggressive_long: {
    fundSymbol: 'INDEX',
    percent: 30,
    message:
      'Долгий горизонт и агрессивный подход — 30% в индексный фонд для максимального потенциала.',
  },
}

export const getRecommendedFirstStep = (profile: InvestmentProfile): Recommendation => {
  return recommendations[profile]
}

const profileDisplayNames: Record<InvestmentProfile, string> = {
  conservative_short: 'Консервативный / короткий срок',
  conservative_medium: 'Консервативный / средний срок',
  conservative_long: 'Консервативный / долгий срок',
  moderate_short: 'Умеренный / короткий срок',
  moderate_medium: 'Умеренный / средний срок',
  moderate_long: 'Умеренный / долгий срок',
  aggressive_short: 'Агрессивный / короткий срок',
  aggressive_medium: 'Агрессивный / средний срок',
  aggressive_long: 'Агрессивный / долгий срок',
}

export const getProfileDisplayName = (profile: InvestmentProfile): string => {
  return profileDisplayNames[profile]
}
