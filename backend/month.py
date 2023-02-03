import pandas as pd

import database as db
from backend import utils
import constants as const


def count_active_months(year_input):
    df = db.fetch_all()

    df_year_selection = df.query(
        'year == @year_input'
    )

    # count all active month in year
    df_year_groupby_date = df_year_selection.groupby(["date"]).sum(numeric_only=True)[["amount"]]
    return len(df_year_groupby_date.index)


def get_by_month(date):
    df = db.fetch_all()

    df["year"] = pd.to_datetime(df["date"]).dt.year

    year_input = pd.to_datetime(date).year

    df_year_selection = df.query(
        'year == @year_input'
    )

    df_month = df.query(
        "date == @date"
    )

    # Selected month
    df_income = df_month.query(
        "transfer_type == 'income'"
    )
    month_income = int(df_income["amount"].sum())
    df_expense = df_month.query(
        "transfer_type == 'expense'"
    )
    month_expense = int(df_expense["amount"].sum())
    month_household_expense = int(df_expense["real_amount"].sum())
    month_cash_flow = month_income - month_expense

    # 50-30-20
    expense_by_category = utils.group_by_category(df_expense)
    need_to_have_expense = expense_by_category.filter(items=const.need_to_have_categories, axis=0)
    nice_to_have_expense = expense_by_category.filter(items=const.nice_to_have_categories, axis=0)

    # Category monthly avg
    df_selection_expense = df_year_selection.query(
        "transfer_type == 'expense'"
    )
    year_expense_by_category = utils.group_by_category(df_selection_expense)
    year_expense_by_category = year_expense_by_category.rename(columns={'amount': 'year_amount'})
    month_count = count_active_months(year_input)
    year_expense_by_category['average'] = \
        year_expense_by_category['year_amount'].map(lambda x: round(x / month_count))

    print('year_expense_by_category')
    print(year_expense_by_category)

    print('expense_by_category')
    print(expense_by_category)
    expense_by_category = expense_by_category.join(year_expense_by_category.drop(columns=['year_amount']))

    diffs = expense_by_category['amount'] - expense_by_category['average']
    expense_by_category['from_avg'] = diffs

    return {
        "date": date,
        "income": month_income,
        "expense": month_expense,
        "household_expense": month_household_expense,
        "cash_flow": month_cash_flow,
        "need_to_have": int(need_to_have_expense.sum()),
        "nice_to_have": int(nice_to_have_expense.sum()),
        "categories": expense_by_category.reset_index().to_dict(orient='records'),
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
