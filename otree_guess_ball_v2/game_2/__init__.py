from otree.api import *
import random
import json

class C(BaseConstants):
    NAME_IN_URL = 'box_game_2'
    PLAYERS_PER_GROUP = 2  
    NUM_ROUNDS = 10
    INITIAL_AMOUNT = NUM_ROUNDS
    MAX_ATTEMPTS = 9
    COIN_TYPES = ['Gold', 'Silver', 'Copper']
    
    MAGIC_BOX_PROBABILITIES = [0.6, 0.4, 0]  # Gold=White, Silver=Black, Copper=0
    MUNDANE_BOX_PROBABILITIES = [0.4, 0.6, 0]  # Gold=White, Silver=Black, Copper=0

    SCENARIOS = [
        ('-1', '-1'),
        ('0', '0'),
        ('1', '+1'),
    ]
    CORRECT_ANSWERS = {'answer1': '1', 'answer2': '1', 'answer3': '-1', 'answer4': '0'}  # Adjust these values as needed
    

class Subsession(BaseSubsession):
    pass

class Group(BaseGroup):
    box_type = models.StringField()
    round_data = models.LongStringField()  

class Player(BasePlayer):
    attempts = models.IntegerField(initial=0)
    coin_sequence = models.StringField()  
    guess = models.StringField()
    total_earnings = models.IntegerField(initial=0)  
    answer1 = models.StringField(label="玩家 1 的收益：", choices=C.SCENARIOS,
        widget=widgets.RadioSelectHorizontal)
    answer2 = models.StringField(label="玩家 2 的收益：", choices=C.SCENARIOS,
        widget=widgets.RadioSelectHorizontal)
    answer3 = models.StringField(label="玩家 1 的收益：", choices=C.SCENARIOS,
        widget=widgets.RadioSelectHorizontal)
    answer4 = models.StringField(label="玩家 2 的收益：", choices=C.SCENARIOS,
        widget=widgets.RadioSelectHorizontal)
    answer_question1 = models.StringField()
    answer_question2 = models.StringField()

# FUNCTIONS

def creating_session(subsession: Subsession): 
    for group in subsession.get_groups():
        group.box_type = random.choice(['偏白箱', '偏黑箱'])
        coin_sequence = generate_coin_sequence(group.box_type)
        for player in group.get_players():
            player.coin_sequence = coin_sequence  # same sequence for each player
        # Initialize round_data for each round
        round_data = [{'guesses': ['', ''], 'times': [0, 0], 'box_type': ''}]
        group.round_data = json.dumps(round_data) 
        

def generate_coin_sequence(box_type):
    if box_type == '偏白箱':
        return ','.join(random.choices(C.COIN_TYPES, C.MAGIC_BOX_PROBABILITIES, k=C.MAX_ATTEMPTS))
    else:
        return ','.join(random.choices(C.COIN_TYPES, C.MUNDANE_BOX_PROBABILITIES, k=C.MAX_ATTEMPTS))


def update_round_data(group: Group, player: Player):
    round_data = json.loads(group.round_data)
    round_data[0]['box_type'] = group.box_type  
    round_data[0]['guesses'][player.id_in_group - 1] = player.guess
    round_data[0]['times'][player.id_in_group - 1] = player.attempts
    group.round_data = json.dumps(round_data)


def calculate_final_earnings(group: Group):
    if group.subsession.round_number == C.NUM_ROUNDS:
        for round_number in range(1, C.NUM_ROUNDS + 1):
            # Save current rounds data 
            round_data = group.in_round(round_number).round_data
            if round_data:
                round_info = json.loads(round_data)
                guesses = round_info[0]['guesses']
                times = round_info[0]['times']
                box_type = round_info[0]['box_type'] 
                outcomes = [1 if guess == box_type else -1 for guess in guesses]
            
                if times[0] == times[1]:  
                    group.get_player_by_id(1).total_earnings += outcomes[0]
                    group.get_player_by_id(2).total_earnings += outcomes[1]
                elif times[0] < times[1]:  # player 1 submitted first
                    group.get_player_by_id(1).total_earnings += outcomes[0]
                    group.get_player_by_id(2).total_earnings += 0
                else:  # player 2 submitted first
                    group.get_player_by_id(1).total_earnings += 0
                    group.get_player_by_id(2).total_earnings += outcomes[1]

        player1 = group.get_player_by_id(1)
        player2 = group.get_player_by_id(2)
        player1.participant.game2_earnings = player1.total_earnings + C.INITIAL_AMOUNT
        player2.participant.game2_earnings = player2.total_earnings + C.INITIAL_AMOUNT
        

def check_question1(player: Player):
    correct = 0
    for answer_field in ['answer1', 'answer2']:
        if getattr(player, answer_field) == C.CORRECT_ANSWERS[answer_field]:
            correct += 1
    return correct

def check_question2(player: Player):
    correct = 0
    for answer_field in ['answer3', 'answer4']:
        if getattr(player, answer_field) == C.CORRECT_ANSWERS[answer_field]:
            correct += 1
    return correct


# PAGES
class Introduction(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1


class CalculationQuestions(Page):
    form_model = 'player'
    form_fields = ['answer1', 'answer2', 'answer3', 'answer4']

    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1

    @staticmethod
    def vars_for_template(player: Player):
        return {
            'round_number': player.round_number
        }

    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        if check_question1(player) == 2:
            player.answer_question1 = "正确"
        else:
            player.answer_question1 = "错误"
        if check_question2(player) == 2:
            player.answer_question2 = "正确"
        else:
            player.answer_question2 = "错误"


class Feedback(Page):
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == 1
    def vars_for_template(player: Player):
        return {
            'feedback1': player.answer_question1,
            'feedback2': player.answer_question2,
        }
      

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
            'box_type': player.group.box_type,
            'round_number': player.round_number,
            'open_number': player.attempts,
            'coins': coins_list,
            'show_wait_button': not is_last_round,
            'attempt_numbers': list(range(1, C.MAX_ATTEMPTS + 1)),
            'empty_cells': empty_cells,
        }
    
    @staticmethod
    def before_next_page(player: Player, timeout_happened):
        update_round_data(player.group, player)


class AttentionTest(Page):
    form_model = 'player'
    form_fields = ['answer1', 'answer2','answer3', 'answer4']
    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == C.NUM_ROUNDS
    

class WaitForGroup(WaitPage):
    wait_for_all_groups = False  # Wait only for players in this group

    @staticmethod
    def is_displayed(player: Player):
        return player.round_number == C.NUM_ROUNDS 

    @staticmethod
    def after_all_players_arrive(group: Group):
        calculate_final_earnings(group)  


class Results(Page):
    @staticmethod
    def vars_for_template(player: Player):
        return {
            'round_number': player.round_number,
            'open_number': player.attempts,
            'guess': player.guess,
            'total_earnings': player.total_earnings + C.INITIAL_AMOUNT,
        }
    
page_sequence = [Introduction, CalculationQuestions, Feedback, Decision, AttentionTest, WaitForGroup, Results]
