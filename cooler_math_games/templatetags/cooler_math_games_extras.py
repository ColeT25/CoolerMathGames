from django import template

register = template.Library()


@register.filter(name='zip')
def zip_lists(a, b):
    # https://stackoverflow.com/questions/2415865/iterating-through-two-lists-in-django-templates
    return zip(a, b)

