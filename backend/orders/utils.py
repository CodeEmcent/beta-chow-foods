import random
import string


def generate_order_no(prefix="BC"):
    # e.g. BC-8F3K2A
    code = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"{prefix}-{code}"
