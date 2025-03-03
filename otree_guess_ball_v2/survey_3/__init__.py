from otree.api import *

class C(BaseConstants):
    NAME_IN_URL = 'survey_3'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1

class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    choice1 = models.StringField()
    choice2 = models.StringField()
    choice3 = models.StringField()
    choice4 = models.StringField()
    choice5 = models.StringField()
    choice6 = models.StringField()
    choice7 = models.StringField()
    choice8 = models.StringField()
    

class SurveyPage1(Page):
    form_model = 'player'
    form_fields = ['choice1', 'choice2', 'choice3', 'choice4']
        
class SurveyPage2(Page):
    form_model = 'player'
    form_fields = ['choice5', 'choice6', 'choice7', 'choice8']


page_sequence = [SurveyPage1, SurveyPage2]
