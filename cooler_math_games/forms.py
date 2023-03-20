from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(max_length=20)
    password = forms.CharField(widget=forms.PasswordInput())


class SaveScoreForm(forms.Form):
    user = forms.CharField(max_length=20)
    score = forms.IntegerField()
    game = forms.CharField(max_length=30)


