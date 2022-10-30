export interface YearAPIResponse {
  monthly_avg: PeriodOverview;
  year: PeriodOverview
}

interface PeriodOverview {
  cash_flow: number;
  expense: number;
  income: number;
}
