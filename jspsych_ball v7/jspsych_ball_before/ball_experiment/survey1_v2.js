const survey1_timeline = [];

const survey1HTML = `
<div class="survey-container" style="width: 415px; margin: 0 auto; padding: 20px; text-align: left;">
    <h3 style="text-align: center;">问卷1</h3>
    
    <form id="survey1-form">
        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">1. 你的性别</label>
            <div>
                <label><input type="radio" name="gender" value="male" required> 男</label>
                <label><input type="radio" name="gender" value="female"> 女</label>
                
            </div>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">2. 你的年龄（填写整数）</label>
            <input type="number" name="age" min="12" max="99" required style="width: 50%; padding: 0.5rem;">
            
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
        <label style="display: block; margin-bottom: 0.5rem;">3. 你的常住地</label>
        <select name="residence" required style="width: 100%; padding: 0.5rem;">
            <option value="">请选择</option>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="上海">上海</option>
            <option value="重庆">重庆</option>
            <option value="河北省">河北省</option>
            <option value="山西省">山西省</option>
            <option value="辽宁省">辽宁省</option>
            <option value="吉林省">吉林省</option>
            <option value="黑龙江省">黑龙江省</option>
            <option value="江苏省">江苏省</option>
            <option value="浙江省">浙江省</option>
            <option value="安徽省">安徽省</option>
            <option value="福建省">福建省</option>
            <option value="江西省">江西省</option>
            <option value="山东省">山东省</option>
            <option value="河南省">河南省</option>
            <option value="湖北省">湖北省</option>
            <option value="湖南省">湖南省</option>
            <option value="广东省">广东省</option>
            <option value="海南省">海南省</option>
            <option value="四川省">四川省</option>
            <option value="贵州省">贵州省</option>
            <option value="云南省">云南省</option>
            <option value="陕西省">陕西省</option>
            <option value="甘肃省">甘肃省</option>
            <option value="青海省">青海省</option>
            <option value="台湾省">台湾省</option>
            <option value="内蒙古自治区">内蒙古自治区</option>
            <option value="广西壮族自治区">广西壮族自治区</option>
            <option value="西藏自治区">西藏自治区</option>
            <option value="宁夏回族自治区">宁夏回族自治区</option>
            <option value="新疆维吾尔自治区">新疆维吾尔自治区</option>
            <option value="香港特别行政区">香港特别行政区</option>
            <option value="澳门特别行政区">澳门特别行政区</option>
        </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">4. 你现在是在读学生吗？</label>
            <div>
                <label><input type="radio" name="is_student" value="true" required> 是</label>
                <label><input type="radio" name="is_student" value="false"> 否</label>
            </div>
        </div>

        <div id="student-fields" style="display:none;">
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">5. 你就读的阶段是</label>
                <select name="grade" required class="form-control">
                    <option value="">请选择</option>
                    <option value="primary">小学</option>
                    <option value="middle">初中</option>
                    <option value="high">高中</option>
                    <option value="vocational">中专/技校</option>
                    <option value="undergrad">本/专科生</option>
                    <option value="masters">硕士研究生</option>
                    <option value="phd">博士研究生</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <p style="display: block; margin-bottom: 0.5rem;">6．（多选）你目前就读的学校类型为：</p>
                <div class="options">
                    <div class="option">
                        <input type="checkbox" id="option1" name="school_type[]" value="985" style="width: 20px;" class="school-type-checkbox">
                        <label for="option1">985</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option2" name="school_type[]" value="211" style="width: 20px;" class="school-type-checkbox">
                        <label for="option2">211</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option3" name="school_type[]" value="shuangyiliu" style="width: 20px;" class="school-type-checkbox">
                        <label for="option3">双一流</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option4" name="school_type[]" value="first_tier" style="width: 20px;" class="school-type-checkbox">
                        <label for="option4">一本</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option5" name="school_type[]" value="second_tier" style="width: 20px;" class="school-type-checkbox">
                        <label for="option5">二本</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option6" name="school_type[]" value="third_tier" style="width: 20px;" class="school-type-checkbox">
                        <label for="option6">三本</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option7" name="school_type[]" value="junior_college" style="width: 20px;" class="school-type-checkbox">
                        <label for="option7">大专</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option8" name="school_type[]" value="technical_school" style="width: 20px;" class="school-type-checkbox">
                        <label for="option8">中专/技校</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option9" name="school_type[]" value="regular_middle_high" style="width: 20px;" class="school-type-checkbox">
                        <label for="option9">中学</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" id="option10" name="school_type[]" value="primary_school" style="width: 20px;" class="school-type-checkbox">
                        <label for="option10">小学</label>
                    </div>
                </div>
                <div id="school-type-error" style="color: red; display: none;">请至少选择一个学校类型</div>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">7. 请选择你的专业所属的学科类别</label>
                <select name="discipline" required class="form-control">
                    <option value="">请选择</option>
                    <option value="no_choice">无具体专业分类/在读中小学生</option>
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
                <input type="text" name="major" required 
                style="width: 91.5%; padding: 0.5rem;">
            </div>
        </div>

        <div id="social_fields" style="display:none;">
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">5. 请选择你的最高学历</label>
                <select name="education_level" required class="form-control">
                    <option value="">请选择</option>
                    <option value="primary_school">小学及以下</option>
                    <option value="middle_school">初中</option>
                    <option value="high_school">高中/中专/技校</option>
                    <option value="associate_degree">大学专科</option>
                    <option value="bachelor_degree">大学本科</option>
                    <option value="master_degree">硕士</option>
                    <option value="doctorate_degree">博士</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">6. 所处行业种类</label>
                <select name="industry" required class="form-control">
                    <option value="">请选择</option>
                    <option value="agriculture">农、林、牧、渔业</option>
                    <option value="mining">采掘业</option>
                    <option value="manufacturing">制造业</option>
                    <option value="utilities">电力、煤气及水的生产和供应业</option>
                    <option value="construction">建筑业</option>
                    <option value="geology">地质勘查业、水利管理业</option>
                    <option value="transportation">交通运输、仓储及邮电通信业</option>
                    <option value="retail">批发和零售贸易、餐饮业</option>
                    <option value="finance">金融、保险业</option>
                    <option value="real_estate">房地产业</option>
                    <option value="services">社会服务业</option>
                    <option value="healthcare">卫生、体育和社会福利业</option>
                    <option value="education">教育、文化艺术及广播电影</option>
                    <option value="research">科学研究和综合技术服务业</option>
                    <option value="government">国家机关、政党机关和社会团体</option>
                    <option value="other">其他</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">7. 你认为你在行业中的层级为</label>
                <select name="work_level" required class="form-control">
                    <option value="">请选择</option>
                    <option value="no_work">无</option>
                    <option value="normal_level">普通职员</option>
                    <option value="mid_level">中层</option>
                    <option value="high_level">高层</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">8. 平均月收入</label>
                <select name="income" required class="form-control">
                    <option value="">请选择</option>
                    <option value="3000_and_below">3000元及以下</option>
                    <option value="3001_to_8000">3001-8000元</option>
                    <option value="8001_to_15000">8001-15000元</option>
                    <option value="above_15000">15000元以上</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">9. 婚姻状况</label>
                <select name="marital_status" required class="form-control">
                    <option value="">请选择</option>
                    <option value="single">未婚</option>
                    <option value="married">已婚</option>
                    <option value="divorced">离异</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">10. 子女状况</label>
                <select name="children_status" required class="form-control">
                    <option value="">请选择</option>
                    <option value="no_children">没有子女</option>
                    <option value="one_child">1个子女</option>
                    <option value="two_children">2个子女</option>
                    <option value="three_or_more_children">3个及以上子女</option>
                </select>
            </div>
        </div>
        
        <button id="survey1_button" type="submit" class="survey1-btn" style="margin-top: 20px;">提交</button>
    </form>
</div>
<style>
    .survey1-btn {
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

// 添加统一的CSS样式
const style = document.createElement('style');
style.innerHTML = `
    .form-control {
        width: 100%;
        padding: 0.5rem;
    }
    .survey-container {
        text-align: left;
    }
    .survey-container h3 {
        text-align: center;
    }
    .form-group {
        text-align: left;
    }
`;
document.head.appendChild(style);

survey1_timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: survey1HTML,
    choices: "NO_KEYS",
    trial_duration: null,

    on_load: function () {
        const studentFields = document.getElementById('student-fields');
        const socialFields = document.getElementById('social_fields');
        const studentRadios = document.getElementsByName('is_student');

        function toggleFields() {
            const isStudent = document.querySelector('input[name="is_student"]:checked')?.value;
            console.log('isStudent:', isStudent); // 输出调试信息

            // 控制显示/隐藏
            studentFields.style.display = isStudent === 'true' ? 'block' : 'none';
            socialFields.style.display = isStudent === 'false' ? 'block' : 'none';

            // 获取所有学生相关字段
            const studentInputs = [
                document.querySelector('[name="grade"]'),
                document.querySelector('[name="discipline"]'),
                document.querySelector('[name="major"]')
            ];

            // 设置字段状态
            studentInputs.forEach(input => {
                if (input) {
                    input.required = isStudent === 'true';
                    input.disabled = isStudent !== 'true';
                    if (isStudent !== 'true') input.value = '';
                }
            });

            // 获取所有社会相关字段
            const socialInputs = [
                document.querySelector('[name="education_level"]'),
                document.querySelector('[name="industry"]'),
                document.querySelector('[name="work_level"]'),
                document.querySelector('[name="income"]'),
                document.querySelector('[name="marital_status"]'),
                document.querySelector('[name="children_status"]')
            ];

            // 设置字段状态
            socialInputs.forEach(input => {
                if (input) {
                    input.required = isStudent === 'false';
                    input.disabled = isStudent !== 'false';
                    if (isStudent !== 'false') input.value = '';
                }
            });
        }

        // 初始化执行
        toggleFields();

        // 添加事件监听
        studentRadios.forEach(radio => {
            radio.addEventListener('change', toggleFields);
        });

        // 添加表单提交事件监听
        const form = document.getElementById('survey1-form');
        form.addEventListener('submit', function (event) {
            // 验证学校类型是否至少选择了一项（如果是学生）
            const isStudent = document.querySelector('input[name="is_student"]:checked')?.value === 'true';

            if (isStudent) {
                const schoolTypeChecked = document.querySelectorAll('input[name="school_type[]"]:checked');
                if (schoolTypeChecked.length === 0) {
                    event.preventDefault();
                    document.getElementById('school-type-error').style.display = 'block';
                    return false;
                } else {
                    document.getElementById('school-type-error').style.display = 'none';
                }
            }

            event.preventDefault();
            const formData = new FormData(form);

            // 收集所有选中的学校类型
            const schoolTypes = [];
            document.querySelectorAll('input[name="school_type[]"]:checked').forEach(checkbox => {
                schoolTypes.push(checkbox.value);
            });

            const responseData = {
                gender: formData.get('gender'),
                age: parseInt(formData.get('age')),
                ethnicity: formData.get('residence'),
                is_student: formData.get('is_student') === 'true',
                grade: formData.get('grade') || '',
                school_type: schoolTypes, // 这里改为数组
                discipline: formData.get('discipline') || '',
                major: formData.get('major') || '',
                education_level: formData.get('education_level') || '',
                industry: formData.get('industry') || '',
                work_level:formData.get('work_level') || '',
                income: formData.get('income') || '',
                marital_status: formData.get('marital_status') || '',
                children_status: formData.get('children_status') || ''
            };

            console.log('responseData:', responseData); // 输出调试信息
            jsPsych.finishTrial();
        });
    },

    on_finish: function(data) {
        // 解除所有禁用状态
        document.querySelectorAll('#student-fields input, #student-fields select, #social_fields input, #social_fields select').forEach(input => {
            input.disabled = false;
            input.required = false;
        });
    
        const formData = new FormData(document.getElementById('survey1-form'));
        
        // 收集所有选中的学校类型
        const schoolTypes = [];
        document.querySelectorAll('input[name="school_type[]"]:checked').forEach(checkbox => {
            schoolTypes.push(checkbox.value);
        });
    
        // 收集数据
        const responseData = {
            gender: formData.get('gender'),
            age: parseInt(formData.get('age')),
            ethnicity: formData.get('residence'),
            is_student: formData.get('is_student') === 'true',
            grade: formData.get('grade') || '',
            school_type: schoolTypes, // 这里改为数组
            discipline: formData.get('discipline') || '',
            major: formData.get('major') || '',
            education_level: formData.get('education_level') || '',
            industry: formData.get('industry') || '',
            work_level:formData.get('work_level') || '',
            income: formData.get('income') || '',
            marital_status: formData.get('marital_status') || '',
            children_status: formData.get('children_status') || ''
        };
    
        console.log('responseData on_finish:', responseData); // 输出调试信息
        jsPsych.data.addProperties(responseData);
        jsPsych.finishTrial();
    }
});