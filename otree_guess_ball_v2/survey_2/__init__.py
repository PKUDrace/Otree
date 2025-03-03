from otree.api import *

class C(BaseConstants):
    NAME_IN_URL = 'survey_2'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1
    SCENARIOS = [
        ('coin1', '硬币1'),
        ('coin2', '硬币2'),
        ('coin3', '硬币3'),
        ('coin4', '硬币4'),
        ('coin5', '硬币5'),
        ('coin6', '硬币6')
    ]

class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    chosen_scenario = models.StringField(
        label="你想要抛掷哪枚硬币？",
        choices=C.SCENARIOS,
        widget=widgets.RadioSelectHorizontal
    )

class Survey(Page):
    form_model = 'player'
    form_fields = ['chosen_scenario']
        
page_sequence = [Survey]
