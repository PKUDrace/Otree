const survey3_timeline = [];

const survey3HTML = `
<div class="survey3-container" style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: left;">

    <h3>问卷3</h3>
    <p><b>请完成下面 8 组问题。</b></p>
    <form id="survey3-form">
        <div class="radio-option">
            <label>1. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice1" value="A" required>
                    <span style="width:95%">你有<b>63%</b>的概率获得100元，有<b>37%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice1" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>低于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>

        <div class="radio-option">
            <label>2. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice2" value="A" required>
                    <span style="width:95%">你有<b>50%</b>的概率获得100元，有<b>50%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice2" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>低于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>

        <div class="radio-option">
            <label>3. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice3" value="A" required>
                    <span style="width:95%">你有<b>25%</b>的概率获得100元，有<b>75%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice3" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>低于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>

        <div class="radio-option">
            <label>4. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice4" value="A" required>
                    <span style="width:95%">你有<b>10%</b>的概率获得100元，有<b>90%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice4" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>低于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>

        <div class="radio-option">
            <label>5. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice5" value="A" required>
                    <span style="width:95%">你有<b>37%</b>的概率获得100元，有<b>63%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice5" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>高于或等于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>

        <div class="radio-option">
            <label>6. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice6" value="A" required>
                    <span style="width:95%">你有<b>50%</b>的概率获得100元，有<b>50%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice6" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>高于或等于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>

        <div class="radio-option">
            <label>7. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice7" value="A" required>
                    <span style="width:95%">你有<b>75%</b>的概率获得100元，有<b>25%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice7" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>高于或等于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>

        <div class="radio-option">
            <label>8. 以下两个选项中你更偏好哪一项？</label>
            <div class="option-group">
                <label>
                    <input type="radio" name="choice8" value="A" required>
                    <span style="width:95%">你有<b>90%</b>的概率获得100元，有<b>10%</b>的概率获得0元。</span>
                </label><br>
                <label>
                    <input type="radio" name="choice8" value="B">
                    <span style="width:95%">如果三个工作日后收盘时，美国股票-道琼斯指数与今日收盘相比，波动幅度<b>高于或等于</b>300点，你将获得100元；否则获得0元。</span>
                </label>
            </div>
        </div>
        <br>
        <button id="survey3_button" type="submit" class="survey3-btn" style="margin-top: 20px;">提交</button>
        <br>
    </form>
</div>
<style>
    .survey3-btn {
        background-color: rgb(49, 108, 244);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        margin: 0 auto; /* 添加居中对齐 */
        display: block; /* 使按钮成为块级元素 */
    }
</style>
`;

survey3_timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: survey3HTML,
    choices: "NO_KEYS",
    trial_duration: null,
    
    on_load: function() {
        const form = document.getElementById('survey3-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const responseData = {
                choice1: formData.get('choice1'),
                choice2: formData.get('choice2'),
                choice3: formData.get('choice3'),
                choice4: formData.get('choice4'),
                choice5: formData.get('choice5'),
                choice6: formData.get('choice6'),
                choice7: formData.get('choice7'),
                choice8: formData.get('choice8')
            };
            
            jsPsych.data.addProperties(responseData);
            jsPsych.finishTrial();
        });
    }
});