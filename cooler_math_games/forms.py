from django import forms


class SaveScoreForm(forms.Form):
    user = forms.CharField(max_length=20)
    score = forms.IntegerField()
    game = forms.CharField(max_length=30)


