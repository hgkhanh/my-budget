from backend import month, year
import constants as const


def get_by_date(date, resolution):
    current_overview = {}
    transactions = {}
    categories = {}
    reference_months = {}

    if resolution == 'year':
        current_overview = year.get_overview(date)
        categories = year.get_categories(date)
        reference_months = year.get_all_months(date)

    if resolution == 'month':
        current_overview = month.get_overview(date)
        transactions = month.get_transactions(date)
        categories = month.get_categories(date)
        reference_months = month.get_references(date, const.reference_range)
        reference_months.append(current_overview)

    result = {
        'overview': current_overview,
        'categories': categories,
        'referenceMonths': reference_months
    }
    if resolution == 'month':
        result['transactions'] = transactions

    return result
