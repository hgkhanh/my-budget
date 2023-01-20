import pandas as pd

from backend import month
import database as db
import constants as const
from backend import utils


def get_by_year(year_input):
    df = db.fetch_all()
    df["year"] = pd.to_datetime(df["date"]).dt.year
    df_year_selection = df.query(
        'year == @year_input'
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
    year_income = int(df_selection_income["amount"].sum())
    df_selection_expense = df_year_selection.query(
        "transfer_type == 'expense'"
    )
    year_expense = int(df_selection_expense["amount"].sum())
    year_cash_flow = year_income - year_expense


    # All months overview
    month_list = list(map(lambda cur_month: str(year_input) + cur_month, const.months))
    count_of_active_months = len(list(month_list))
    monthly_overview = map(lambda date: month.get_by_month(date), month_list)

    # 50-30-20
    expense_by_category = utils.group_by_category(df_selection_expense)
    need_to_have_expense = expense_by_category.filter(items=const.need_to_have_categories, axis=0)
    nice_to_have_expense = expense_by_category.filter(items=const.nice_to_have_categories, axis=0)


    # Monthly avg
    monthly_avg = month.get_monthly_avg(df_year_selection)
    expense_by_category['average'] = \
        expense_by_category['amount'].map(lambda x: round(x/count_of_active_months))

    return {
        "year": {
            "income": year_income,
            "expense": year_expense,
            "cash_flow": year_cash_flow,
            "need_to_have": int(need_to_have_expense.sum()),
            "nice_to_have": int(nice_to_have_expense.sum()),
        },
        "monthly_avg": {
            "income": monthly_avg["income"],
            "expense": monthly_avg["expense"],
            "cash_flow": int(monthly_avg["income"] - monthly_avg["expense"]),
        },
        "months": list(monthly_overview),
        "categories": expense_by_category.reset_index().to_dict(orient='records'),
    }
