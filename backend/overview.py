from backend import month


def foo():
    return 'bar'


def get_by_date(date, resolution):
    if resolution == 'month':
        current_overview = month.get_overview(date)
        transactions = month.get_transactions(date)
        categories = month.get_categories(date)

    return {
        'overview': {
            'date': date,
            'resolution': resolution,
            'income': current_overview['income'],
            'expense': current_overview['expense'],
            'cashflow': current_overview['income'] - current_overview['expense']
        },
        'income': {
            'transactions': transactions['income'],
            'categories': categories['income'],
        },
        'expense': {
            'transactions': transactions['expense'],
            'categories': categories['expense'],
        },
        # 'referenceMonths': month.get_references(date)
    }
