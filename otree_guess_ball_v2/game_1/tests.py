from otree.api import Bot, SubmissionMustFail,Submission
from . import *

class PlayerBot(Bot):

    def play_round(self):
        if self.round_number == 1:
            yield Introduction

        # 模拟玩家的猜测行为
        guess = '神奇宝箱' if self.player.round_number % 2 == 0 else '平庸宝箱'
        
        # 提交猜测
        yield Decision, dict(guess=guess)

        yield Submission(Results,check_html=False)
