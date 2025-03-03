from otree.api import Bot, Submission
from . import *

class PlayerBot(Bot):

    def play_round(self):
        yield SurveyPage1, {
            'choice1': 'A',
            'choice2': 'A',
            'choice3': 'A',
            'choice4': 'A',
        }
        yield SurveyPage2, {
            'choice5': 'B',
            'choice6': 'B',
            'choice7': 'B',
            'choice8': 'B',
        }
