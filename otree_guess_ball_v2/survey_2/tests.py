from otree.api import Bot, Submission
from . import *

class PlayerBot(Bot):

    def play_round(self):
        yield Survey, {
            'chosen_scenario': 'coin2',
        }

