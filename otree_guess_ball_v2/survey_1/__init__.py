from otree.api import *

cu = cu
doc = ''


class C(BaseConstants):
    NAME_IN_URL = 'survey_1'
    PLAYERS_PER_GROUP = None
    NUM_ROUNDS = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    
    gender = models.StringField(
        label="1. 你的性别",
        choices=[('male', '男'), ('female', '女')],
        widget=widgets.RadioSelect
    )
    age = models.IntegerField(label="2. 你的年龄（填写整数）", min=12, max=99)
    phone_number = models.StringField(
        label="3. 你的手机号（11位）",
    )
    is_student = models.BooleanField(
        label="4. 你现在是一名学生吗？",
        choices=[(True, '是'), (False, '否')],
        widget=widgets.RadioSelect
    )
    student_id = models.StringField(
        label="5. 你的学号",
        blank=True #True 允许表单留空。不是学生则空，因此这里只能设置为允许留空
    )
    grade = models.StringField(
        label="6. 你的年级是",
        choices=[
            ('undergrad1', '本科一年级'),
            ('undergrad2', '本科二年级'),
            ('undergrad3', '本科三年级'),
            ('undergrad4', '本科四年级'),
            ('masters', '硕士研究生'),
            ('phd', '博士研究生')
        ],
        widget=widgets.RadioSelect,
        blank=True  
    )
    discipline = models.StringField(
        label="7. 请选择你的专业所属的学科类别",
        choices=[
            ('culture', '文科类'),
            ('science', '理科类'),
            ('engineering', '工科类'),
            ('business', '商科类'),
            ('medicine', '医学类'),
            ('agriculture', '农学类'),
            ('arts', '艺术类'),
            ('social_sciences', '社会科学类'),
            ('interdisciplinary', '交叉学科')
        ],
        widget=widgets.RadioSelect,
        blank=True
    )
    major = models.StringField(
        label="8. 请具体填写你的专业名称（必填）",
        blank=True
    )


# PAGES
class GameIntro(Page):
    pass

class Survey(Page):
    form_model = 'player'
    form_fields = ['gender', 'age', 'phone_number','is_student', 'student_id', 'grade', 'discipline', 'major']
    
    def error_message(self, values):
        # 检查手机号是否为11位数字
        if values['phone_number'] and not (values['phone_number'].isdigit() and len(values['phone_number']) == 11):
            return '手机号必须为11位数字'
        
    def student_id_choices(self):
        if not self.player.is_student:
            return ''
        
    def grade_choices(self):
        if not self.player.is_student:
            return []
        return Player._meta.get_field('grade').choices

    def discipline_choices(self):
        if not self.player.is_student:
            return []
        return Player._meta.get_field('discipline').choices

    def major_choices(self):
        if not self.player.is_student:
            return ''

page_sequence = [GameIntro, Survey]
