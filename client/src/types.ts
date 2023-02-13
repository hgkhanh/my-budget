export interface AnalyticsAPIResponse {
  overview: PeriodOverview
  transactions: {
    income: TransactionItem[]
    expense: TransactionItem[]
  }
  categories: {
    income: CategoryItem[]
    expense: CategoryItem[]
  }
  referenceMonths: PeriodOverview[]
}

export interface PeriodOverview {
  transactions: {
    expense: TransactionItem[]
    income: TransactionItem[]
  }
  date: string
  cashFlow: number
  expense: number
  income: number
  needToHave: number
  niceToHave: number
  categories: CategoryItem[]
}

export interface CategoryItem {
  category: string
  amount: number
  average?: number
  from_avg?: number
}

export interface TransactionItem {
  key: string
  account: string
  amount: number
  category: string
  comment: string
  date: string
  real_amount: number
  year: number
  transfer_type: string
}
