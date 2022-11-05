import datetime
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