export interface YearAPIResponse {
  monthly_avg: PeriodOverview;
  year: PeriodOverview
  months: PeriodOverview[];
  categories: CategoryExpense[];
}

export interface PeriodOverview {
  date: string;
  cash_flow: number;
  expense: number;
  income: number;
  need_to_have: number;
  nice_to_have: number;
  categories: CategoryExpense[];
}

export interface CategoryExpense {
  category: string;
  amount: number;
  average?: number;
  from_avg?: number;
}
