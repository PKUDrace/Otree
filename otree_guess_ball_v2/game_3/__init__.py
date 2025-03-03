from otree.api import *

class C(BaseConstants):
    NAME_IN_URL = 'box_game_3'
    PLAYERS_PER_GROUP = 2  
    NUM_ROUNDS = 10
    INITIAL_AMOUNT = NUM_ROUNDS
    MAX_ATTEMPTS = 9
    COIN_TYPES = ['Gold', 'Silver', 'Copper']

    MAGIC_BOX_PROBABILITIES = [0.6, 0.4, 0]  # Gold=White, Silver=Black, Copper=0
    MUNDANE_BOX_PROBABILITIES = [0.4, 0.6, 0]  # Gold=White, Silver=Black, Copper=0


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    box_type = models.StringField()


class Player(BasePlayer):
    attempts = models.IntegerField(initial=0)
    coin_sequence = models.StringField()  
    guess = models.StringField()
    outcome = models.StringField()
    earnings = models.IntegerField(initial=0)
    total_earnings = models.IntegerField(initial=0)

# FUNCTIONS
import random

def creating_session(subsession: Subsession):
    for group in subsession.get_groups():
        group.box_type = random.choice(['偏白箱', '偏黑箱'])
        coin_sequence = generate_coin_sequence(group.box_type)
        for player in group.get_players():
            player.coin_sequence = coin_sequence  
    

def generate_coin_sequence(box_type):
    if box_type == '偏白箱':
        return ','.join(random.choices(C.COIN_TYPES, C.MAGIC_BOX_PROBABILITIES, k=C.MAX_ATTEMPTS))
    else:
        return ','.join(random.choices(C.COIN_TYPES, C.MUNDANE_BOX_PROBABILITIES, k=C.MAX_ATTEMPTS))


def set_payoff(player: Player):
    if player.guess == player.group.box_type:
        player.earnings = 1
        player.outcome = "正确"
    else:
        player.earnings = -1
        player.outcome = "错误"


def final_adjustment(group: Group):
    p1, p2 = group.get_players()
    if p1.attempts == p2.attempts: 
        return
    elif p1.attempts < p2.attempts:  
        p2.earnings = 0
    else:  
        p1.earnings = 0
 
    
def set_game3_earnings(player: Player): 
    if player.round_number == C.NUM_ROUNDS: 
        player.participant.game3_earnings = player.total_earnings

def sum_earnings(player: Player):
    return sum([p.earnings for p in player.in_all_rounds()])
    

# PAGES
class Introduction(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1


class DecisionInfo(Page):
    form_model = 'player'
    form_fields = ['guess']
        
    @staticmethod
    def vars_for_template(player: Player):
        # Gather past rounds data for both players in the group
        past_rounds_data = []
        for round_number in range(1, player.round_number):
            past_data = {}
            past_data['round_number'] = round_number
            past_data['player'] = player.in_round(round_number)
            other_player = player.get_others_in_group()[0].in_round(round_number)
            past_data['other_player'] = other_player
            past_rounds_data.append(past_data)

        # 将数据按轮次倒序排列
        past_rounds_data.reverse()
        
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
            'box_type': player.group.box_type,
            'round_number': player.round_number,
            'open_number': player.attempts,
            'coins': coins_list,
            'show_wait_button': not is_last_round,
            'attempt_numbers': list(range(1, C.MAX_ATTEMPTS + 1)),
            'empty_cells': empty_cells,
            'past_rounds_data': past_rounds_data,
        }
    
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        if player.guess: 
            set_payoff(player)

class WaitForOtherPlayers(WaitPage):
    @staticmethod
    def after_all_players_arrive(group: Group):
        final_adjustment(group) 
        

class Results(Page):   
    @staticmethod
    def vars_for_template(player: Player):
        player.total_earnings = sum_earnings(player) + C.INITIAL_AMOUNT

        if player.round_number == C.NUM_ROUNDS:
            set_game3_earnings(player)

        return {
            'round_number': player.round_number,
            'open_number': player.attempts,
            'guess': player.guess,
            'outcome': player.outcome,
            'earnings': player.earnings,
            'total_earnings': player.total_earnings,
        } 

page_sequence = [Introduction, DecisionInfo, WaitForOtherPlayers, Results]
