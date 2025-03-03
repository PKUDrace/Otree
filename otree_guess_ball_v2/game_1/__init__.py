from otree.api import *
import random

class C(BaseConstants):
    NAME_IN_URL = 'box_game_1'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 5
    INITIAL_AMOUNT = NUM_ROUNDS
    MAX_ATTEMPTS = 9
    COIN_TYPES = ['Gold', 'Silver', 'Copper']

    MAGIC_BOX_PROBABILITIES = [0.6, 0.4, 0]  # Gold=White, Silver=Black, Copper=0
    MUNDANE_BOX_PROBABILITIES = [0.4, 0.6, 0]  # Gold=White, Silver=Black, Copper=0

class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    pass

class Player(BasePlayer):
    box_type = models.StringField()
    coin_sequence = models.StringField()
    attempts = models.IntegerField(initial=0)  
    guess = models.StringField()
    outcome = models.StringField()
    earnings = models.IntegerField(initial=0)
    total_earnings = models.IntegerField(initial=0)


# FUNCTIONS
def creating_session(subsession: Subsession): 
    for player in subsession.get_players():
        player.box_type = random.choice(['偏白箱', '偏黑箱'])
        player.coin_sequence = generate_coin_sequence(player.box_type)

def generate_coin_sequence(box_type):
    if box_type == '偏白箱':
        return ','.join(random.choices(C.COIN_TYPES, C.MAGIC_BOX_PROBABILITIES, k=C.MAX_ATTEMPTS))
    else:
        return ','.join(random.choices(C.COIN_TYPES, C.MUNDANE_BOX_PROBABILITIES, k=C.MAX_ATTEMPTS))


def set_payoff(player: Player):
    if player.guess == player.box_type:
        player.earnings = 1
        player.outcome = "正确"
    else:
        player.earnings = -1
        player.outcome = "错误"
    player.total_earnings = sum([player.earnings for player in player.in_all_rounds()]) + C.INITIAL_AMOUNT
    if player.round_number == C.NUM_ROUNDS:  
        player.participant.game1_earnings = player.total_earnings 


# PAGES
class Introduction1(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1

class Introduction2(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1

class Decision(Page):
    form_model = 'player'
    form_fields = ['guess']
        
    @staticmethod
    def vars_for_template(player: Player):
        if player.attempts is None:
            player.attempts = 0
        if player.attempts < C.MAX_ATTEMPTS:  
            player.attempts += 1
            coins_list = player.coin_sequence.split(',')[:player.attempts]   
        if player.attempts == C.MAX_ATTEMPTS:  
            coins_list = player.coin_sequence.split(',')

        is_last_round = player.attempts == C.MAX_ATTEMPTS
        empty_cells_count = C.MAX_ATTEMPTS - len(coins_list)
        empty_cells = [''] * empty_cells_count  

        return {
            'box_type':player.box_type,
            'round_number': player.round_number, 
            'open_number': player.attempts,
            'coins': coins_list,
            'is_last_round': is_last_round,
            'show_wait_button': not is_last_round,
            'attempt_numbers': list(range(1, C.MAX_ATTEMPTS+1)),
            'empty_cells': empty_cells,     
        }
    
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        if player.attempts >= C.MAX_ATTEMPTS or player.guess:
            set_payoff(player)


class Results(Page):
    @staticmethod
    def vars_for_template(player: Player):
        return {
            'round_number': player.round_number, 
            'open_number': player.attempts,
            'guess': player.guess,
            'outcome': player.outcome,
            'earnings': player.earnings,
            'total_earnings': player.total_earnings, 
        }


page_sequence = [Introduction1, Introduction2, Decision, Results]