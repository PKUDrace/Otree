from otree.api import Bot, Submission
from . import *

class PlayerBot(Bot):

    def play_round(self):
       
        yield Results, {
            'payment_choice': 'A',
            'feedback': '999',
        }

        yield Submission(End, check_html=False)

