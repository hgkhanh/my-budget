import database as db


def get_by_month(date):
    df = db.fetch_all()

    df_month = df.query(
        "date == @date"
    )
    # Selected month
    df_income = df_month.query(
        "transfer_type == 'income'"
    )
    month_income = int(df_income["amount"].sum(numeric_only=True))
    df_expense = df_month.query(
        "transfer_type == 'expense'"
    )
    month_expense = int(df_expense["amount"].sum(numeric_only=True))
    month_cash_flow = month_income - month_expense

    return {
        "income": month_income,
        "expense": month_expense,
        "cash_flow": month_cash_flow,
    }


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
