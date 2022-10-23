def get_monthly_avg(df):
    income_by_month = df.query(
        "transfer_type == 'income'"
    ).groupby(["date"]).sum(numeric_only=True)[["amount"]]

    expense_by_month = df.query(
        "transfer_type == 'expense'"
    ).groupby(["date"]).sum(numeric_only=True)[["amount"]]

    month_income_avg = int(income_by_month.mean())
    month_expense_avg = int(expense_by_month.mean())
    month_cash_flow_avg = int(month_income_avg - month_expense_avg)

    return {
        "income": month_income_avg,
        "expense": month_expense_avg,
        "cash_flow": month_cash_flow_avg,
    }

