import boto3
from chalice import Chalice

app = Chalice(app_name='api')
dynamodb_client = boto3.client('dynamodb')
survey_table = "survey-questions-table"
hash_key = {
    "survey-name": {
        "S": "DevSurvey"
    }
}

SURVEY_NAME_STRING = "survey-name"
SURVEY_QUESTIONS_STRING = "survey-questions"

QUESTION_VALUES_STRING = "question_values"
QUESTION_TEXT_STRING = "question_text"
QUESTION_REPEATABLE_STRING = "repeatable"


@app.route('/')
def index():
    return {'hello': 'world'}


@app.route('/survey', methods=['GET'], cors=True)
def get_surveys():
    response = dynamodb_client.scan(
        TableName=survey_table
    )
    items = response['Items']
    surveys = []
    for item in items:
        surveys.append(item[SURVEY_NAME_STRING]["S"])
    return surveys


@app.route('/survey/{survey_name}', methods=['GET'], cors=True)
def get_survey_questions(survey_name, cors=True):
    survey_name = " ".join(survey_name.split("%20"))
    retrieval_key = {
        SURVEY_NAME_STRING: {
            "S": survey_name
        }
    }
    response_data = dynamodb_client.get_item(
        TableName=survey_table,
        Key=retrieval_key
    )
    try:
        response_data = response_data['Item'][SURVEY_QUESTIONS_STRING]["L"]
        questions = []
        for question in response_data:
            question = question["M"]
            parsed_question = {
                QUESTION_VALUES_STRING: [],
                QUESTION_TEXT_STRING: question[QUESTION_TEXT_STRING]["S"],
                QUESTION_REPEATABLE_STRING: question[QUESTION_REPEATABLE_STRING]["BOOL"]
            }
            question_values = question[QUESTION_VALUES_STRING]["L"]
            for value in question_values:
                parsed_question[QUESTION_VALUES_STRING].append(value["S"])

            questions.append(parsed_question)
    except Exception as e:
        return {"Failed to retrieve item": str(e)}
    return questions
