from django import forms


class SaveScoreForm(forms.Form):
    user = forms.CharField(max_length=20, disabled=True)
    score = forms.IntegerField(disabled=True)
    game = forms.CharField(max_length=30, disabled=True)


