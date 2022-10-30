export interface YearAPIResponse {
  monthly_avg: PeriodOverview;
  year: PeriodOverview
}

export interface PeriodOverview {
  cash_flow: number;
  expense: number;
  income: number;
}
