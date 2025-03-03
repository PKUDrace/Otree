from otree.api import Bot, Submission
from . import *

class PlayerBot(Bot):

    def play_round(self):
        # 首先，bot会访问 GameIntro 页面
        yield Submission(GameIntro, check_html=False)

        # 然后，bot会访问 Survey 页面并填写表单
        yield Survey, {
            'gender': 'male',
            'age': 25,
            'is_student': True,
            'grade': 'undergrad3',
            'discipline': 'science',
            'major': 'Physics'
        }

