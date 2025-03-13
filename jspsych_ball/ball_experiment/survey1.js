const survey1_timeline = [];

const survey1HTML = `
<div class="survey1-container" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h3>问卷1</h3>
    
    <form id="survey-form">
        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">1. 你的性别</label>
            <div>
                <label><input type="radio" name="gender" value="male" required> 男</label>
                <label><input type="radio" name="gender" value="female"> 女</label>
            </div>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">2. 你的年龄（填写整数）</label>
            <input type="number" name="age" min="12" max="99" required 
                   style="width: 100%; padding: 0.5rem;">
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">3. 你的手机号（11位）</label>
            <input type="tel" name="phone_number" pattern="\\d{11}" required
                   style="width: 100%; padding: 0.5rem;">
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">4. 你现在是一名学生吗？</label>
            <div>
                <label><input type="radio" name="is_student" value="true" required> 是</label>
                <label><input type="radio" name="is_student" value="false"> 否</label>
            </div>
        </div>

        <div id="student-fields" style="display:none;">
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">5. 你的学号</label>
                <input type="text" name="student_id" style="width: 100%; padding: 0.5rem;">
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">6. 你的年级是</label>
                <select name="grade" required style="width: 100%; padding: 0.5rem;">
                    <option value="">请选择</option>
                    <option value="undergrad1">本科一年级</option>
                    <option value="undergrad2">本科二年级</option>
                    <option value="undergrad3">本科三年级</option>
                    <option value="undergrad4">本科四年级</option>
                    <option value="masters">硕士研究生</option>
                    <option value="phd">博士研究生</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">7. 请选择你的专业所属的学科类别</label>
                <select name="discipline" required style="width: 100%; padding: 0.5rem;">
                    <option value="">请选择</option>
                    <option value="culture">文科类</option>
                    <option value="science">理科类</option>
                    <option value="engineering">工科类</option>
                    <option value="business">商科类</option>
                    <option value="medicine">医学类</option>
                    <option value="agriculture">农学类</option>
                    <option value="arts">艺术类</option>
                    <option value="social_sciences">社会科学类</option>
                    <option value="interdisciplinary">交叉学科</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">8. 请具体填写你的专业名称</label>
                <input type="text" name="major" required style="width: 100%; padding: 0.5rem;">
            </div>
        </div>

        <button id="survey1_button" type="submit" class="survey1-btn" style="margin-top: 20px; display: flex; justify-content: space-between;">提交</button>
    </form>
</div>
<style>
    .survey1-btn {
        background-color: rgb(112, 1594, 138);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
    }
</style>
`;

survey1_timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: surveyHTML,
    choices: "NO_KEYS",
    trial_duration: null,
    
    on_load: function() {
        const studentFields = document.getElementById('student-fields');
        const studentRadios = document.getElementsByName('is_student');
        
        function toggleStudentFields() {
            const isStudent = document.querySelector('input[name="is_student"]:checked')?.value === 'true';
            
            // 控制显示/隐藏
            studentFields.style.display = isStudent ? 'block' : 'none';
            
            // 获取所有学生相关字段
            const studentInputs = [
                document.querySelector('[name="student_id"]'),
                document.querySelector('[name="grade"]'),
                document.querySelector('[name="discipline"]'),
                document.querySelector('[name="major"]')
            ];

            // 设置字段状态
            studentInputs.forEach(input => {
                if (input) {
                    input.required = isStudent;
                    input.disabled = !isStudent;
                    if (!isStudent) input.value = '';
                }
            });
        }

        // 初始化执行
        toggleStudentFields();
        
        // 添加事件监听
        studentRadios.forEach(radio => {
            radio.addEventListener('change', toggleStudentFields);
        });
    },
    
    on_finish: function(data) {
        // 解除所有禁用状态
        document.querySelectorAll('#student-fields input, #student-fields select').forEach(input => {
            input.disabled = false;
            input.required = false;
        });

        const formData = new FormData(document.getElementById('survey-form'));
        
        // 手机号验证
        if (!/^\d{11}$/.test(formData.get('phone_number'))) {
            alert('手机号必须为11位数字');
            return jsPsych.endCurrentTimeline();
        }

        // 收集数据
        const responseData = {
            gender: formData.get('gender'),
            age: parseInt(formData.get('age')),
            phone_number: formData.get('phone_number'),
            is_student: formData.get('is_student') === 'true',
            student_id: formData.get('student_id') || '',
            grade: formData.get('grade') || '',
            discipline: formData.get('discipline') || '',
            major: formData.get('major') || ''
        };

        // 保存数据
        jsPsych.data.addProperties(responseData);
    }
});