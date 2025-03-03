from os import environ
SESSION_CONFIG_DEFAULTS = dict(
    real_world_currency_per_point=0.03, participation_fee=10)  
SESSION_CONFIGS = [
    dict(name='offline_ball_experiment', num_demo_participants=None, app_sequence=[
        'survey_1','survey_2','survey_3','game_1','game_2','game_3','survey_4'],
        treatment_group="offline_experiment",
        ),]
    # dict(name='offline_ball_experiment', num_demo_participants=None, app_sequence=[
    #     'game_3'],
    #     treatment_group="offline_experiment",
    #     ),]
    
LANGUAGE_CODE = 'zh-hans' 
REAL_WORLD_CURRENCY_CODE = ''
USE_POINTS = False      #Ture-> not real money & results are rounded
# POINTS_CUSTOM_NAME = "元"
DEMO_PAGE_INTRO_HTML = ''
PARTICIPANT_FIELDS = ['game1_earnings', 'game2_earnings', 'game3_earnings']
SESSION_FIELDS = []
ROOMS = [dict(name='lab', display_name='lab',
              participant_label_file='_rooms/lab.txt'),
         dict(name="test", display_name="test",
              participant_label_file='_rooms/test.txt')]

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = environ.get('OTREE_ADMIN_PASSWORD')

SECRET_KEY = 'blahblah'

# if an app is included in SESSION_CONFIGS, you don't need to list it here
INSTALLED_APPS = ['otree']
