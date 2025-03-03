from otree.api import Bot, SubmissionMustFail,Submission
from . import *

class PlayerBot(Bot):

    def play_round(self):
        if self.round_number == 1:
            yield Introduction
            yield CalculationQuestions, {
            'answer1': '1',
            'answer2': '1',
            'answer3': '-1',
            'answer4': '0',}
            yield Feedback

        # 模拟玩家的猜测行为
        guess = '神奇宝箱' if self.player.round_number % 2 == 0 else '平庸宝箱'
        
        # 提交猜测
        yield Decision, dict(guess=guess)

        if self.round_number == C.NUM_ROUNDS:
            yield AttentionTest, {
                'answer1': '1',
                'answer2': '-1',
                'answer3': '1',
                'answer4': '0',
            }

        yield Submission(Results,check_html=False)

        
