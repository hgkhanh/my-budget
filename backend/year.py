from backend import month
import database as db


def total():
    # TEST
    THIS_YEAR = 2022

    df = db.fetch_all()
    df_year_selection = df.query(
        'year == 2022'
    )

    # All months
    expense_by_year = df.query(
        "transfer_type == 'expense'"
    ).groupby(["year"]).sum(numeric_only=True)[["amount"]]

    income_by_year = df.query(
        "transfer_type == 'income'"
    ).groupby(["year"]).sum(numeric_only=True)[["amount"]]

    year_income_avg = int(income_by_year.mean())
    year_expense_avg = int(expense_by_year.mean())
    year_cash_flow_avg = int(year_income_avg - year_expense_avg)

    # Selected year
    df_selection_income = df_year_selection.query(
        "transfer_type == 'income'"
    )
    year_income = int(df_selection_income["amount"].sum(numeric_only=True))
    df_selection_expense = df_year_selection.query(
        "transfer_type == 'expense'"
    )
    year_expense = int(df_selection_expense["amount"].sum(numeric_only=True))
    year_cash_flow = year_income - year_expense

    # Monthly avg
    monthly_avg = month.get_monthly_avg(df_year_selection)
    print(f'year_income {year_income}')
    print(f'year_expense {year_expense}')

    return {
        "year": {
            "income": year_income,
            "expense": year_expense,
            "cash_flow": year_cash_flow,
        },
        "monthly_avg": {
            "income": monthly_avg["income"],
            "expense": monthly_avg["expense"],
            "cash_flow": int(monthly_avg["income"] - monthly_avg["expense"]),
        }
    }
