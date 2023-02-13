import pandas as pd
from datetime import datetime, date
import calendar
import constants as const


def start_of_month(date):
    return date.replace(day=1)


def last_month():
    today = datetime.date.today()
    return today.replace(day=1, month=today.month - 1)


def category_sorter(column):
    correspondence = {category: order for order, category in enumerate(const.expenses)}
    return column.map(correspondence)


def to_percent(value):
    return f'{value * 100}%'


def group_by_category(df):
    return df.groupby(by=["category"]).sum(numeric_only=True)[["amount"]].sort_index(
            key=category_sorter)


def date_to_year(date):
    return pd.to_datetime(date).year


def deduct_months(source_date, months):
    source_date = pd.to_datetime(source_date)
    month = source_date.month - 1 - months
    year = source_date.year + month // 12
    month = month % 12 + 1
    day = min(source_date.day, calendar.monthrange(year, month)[1])
    return date(year, month, day).isoformat()

