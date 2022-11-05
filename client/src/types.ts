export interface YearAPIResponse {
  monthly_avg: PeriodOverview;
  year: PeriodOverview
}

export interface PeriodOverview {
  cash_flow: number;
  expense: number;
  income: number;
  need_to_have: number;
  nice_to_have: number;
  categories: CategoryExpense[]
}

export interface CategoryExpense {
  amount: number;
  category: string;
}
