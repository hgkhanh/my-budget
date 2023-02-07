export interface YearAPIResponse {
  monthly_avg: PeriodOverview
  year: PeriodOverview
  months: PeriodOverview[]
  categories: CategoryExpense[]
}

export interface PeriodOverview {
  transactions: {
    expense: TransactionItem[]
    income: TransactionItem[]
  }
  date: string
  cash_flow: number
  expense: number
  income: number
  need_to_have: number
  nice_to_have: number
  categories: CategoryExpense[]
}

export interface CategoryExpense {
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
