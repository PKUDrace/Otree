from otree.api import *

class C(BaseConstants):
    NAME_IN_URL = 'survey_4'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1

class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    total_payment = models.IntegerField()
    payment_choice = models.StringField(
        choices=[('A','本月获得实验报酬'), ('B','下个月获得实验报酬 + 额外2元')],
        label='本次实验报酬的转账方式，你选择哪一个？',
        widget=widgets.RadioSelect
    )
    feedback = models.LongStringField(
        label='请描述你关于本实验的感受或建议：',
        blank=False,
    )

def calculate_total_payoff(player: Player):
    participant = player.participant
    player.total_payment = participant.game1_earnings + participant.game2_earnings + participant.game3_earnings + 10

class Results(Page):
    form_model = 'player'
    form_fields = ['payment_choice', 'feedback']
    @staticmethod
    def vars_for_template(player: Player):
        calculate_total_payoff(player)

        participant = player.participant
        return{
            'game1_earnings': participant.game1_earnings,
            'game2_earnings': participant.game2_earnings,
            'game3_earnings': participant.game3_earnings,
            'total_payment': player.total_payment,
        }

        
class End(Page):
    pass

page_sequence = [Results, End]
