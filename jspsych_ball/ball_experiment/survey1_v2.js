const survey1_timeline = [];

const survey1HTML = `
<div class="survey-container" style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: left;">
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
        <label style="display: block; margin-bottom: 0.5rem;">3. 你的民族</label>
        <select name="ethnicity" required style="width: 100%; padding: 0.5rem;">
            <option value="">请选择</option>
            <option value="汉族">汉族</option>
            <option value="蒙古族">蒙古族</option>
            <option value="回族">回族</option>
            <option value="藏族">藏族</option>
            <option value="维吾尔族">维吾尔族</option>
            <option value="苗族">苗族</option>
            <option value="彝族">彝族</option>
            <option value="壮族">壮族</option>
            <option value="布依族">布依族</option>
            <option value="朝鲜族">朝鲜族</option>
            <option value="满族">满族</option>
            <option value="侗族">侗族</option>
            <option value="瑶族">瑶族</option>
            <option value="白族">白族</option>
            <option value="土家族">土家族</option>
            <option value="哈尼族">哈尼族</option>
            <option value="哈萨克族">哈萨克族</option>
            <option value="傣族">傣族</option>
            <option value="黎族">黎族</option>
            <option value="傈僳族">傈僳族</option>
            <option value="佤族">佤族</option>
            <option value="畲族">畲族</option>
            <option value="高山族">高山族</option>
            <option value="拉祜族">拉祜族</option>
            <option value="水族">水族</option>
            <option value="东乡族">东乡族</option>
            <option value="纳西族">纳西族</option>
            <option value="景颇族">景颇族</option>
            <option value="柯尔克孜族">柯尔克孜族</option>
            <option value="土族">土族</option>
            <option value="达斡尔族">达斡尔族</option>
            <option value="仫佬族">仫佬族</option>
            <option value="羌族">羌族</option>
            <option value="布朗族">布朗族</option>
            <option value="撒拉族">撒拉族</option>
            <option value="毛南族">毛南族</option>
            <option value="仡佬族">仡佬族</option>
            <option value="锡伯族">锡伯族</option>
            <option value="阿昌族">阿昌族</option>
            <option value="普米族">普米族</option>
            <option value="塔吉克族">塔吉克族</option>
            <option value="怒族">怒族</option>
            <option value="乌孜别克族">乌孜别克族</option>
            <option value="俄罗斯族">俄罗斯族</option>
            <option value="鄂温克族">鄂温克族</option>
            <option value="德昂族">德昂族</option>
            <option value="保安族">保安族</option>
            <option value="裕固族">裕固族</option>
            <option value="京族">京族</option>
            <option value="塔塔尔族">塔塔尔族</option>
            <option value="独龙族">独龙族</option>
            <option value="鄂伦春族">鄂伦春族</option>
            <option value="赫哲族">赫哲族</option>
            <option value="门巴族">门巴族</option>
            <option value="珞巴族">珞巴族</option>
            <option value="基诺族">基诺族</option>
    </select>
</div>
        
        <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem;">4. 你现在是在读的本硕博学生吗？</label>
            <div>
                <label><input type="radio" name="is_student" value="true" required> 是</label>
                <label><input type="radio" name="is_student" value="false"> 否</label>
            </div>
        </div>

        <div id="student-fields" style="display:none;">
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">5. 你的年级是</label>
                <select name="grade" required class="form-control">
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
                <label style="display: block; margin-bottom: 0.5rem;">6. 请选择你的专业所属的学科类别</label>
                <select name="discipline" required class="form-control">
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
                <label style="display: block; margin-bottom: 0.5rem;">7. 请具体填写你的专业名称</label>
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
                <label style="display: block; margin-bottom: 0.5rem;">7. 平均月收入</label>
                <select name="income" required class="form-control">
                    <option value="">请选择</option>
                    <option value="3000_and_below">3000元及以下</option>
                    <option value="3001_to_8000">3001-8000元</option>
                    <option value="8001_to_15000">8001-15000元</option>
                    <option value="above_15000">15000元以上</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">8. 婚姻状况</label>
                <select name="marital_status" required class="form-control">
                    <option value="">请选择</option>
                    <option value="single">未婚</option>
                    <option value="married">已婚</option>
                    <option value="divorced">离异</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem;">9. 子女状况</label>
                <select name="children_status" required class="form-control">
                    <option value="">请选择</option>
                    <option value="no_children">没有子女</option>
                    <option value="one_child">1个子女</option>
                    <option value="two_children">2个子女</option>
                    <option value="three_or_more_children">3个及以上子女</option>
                </select>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button type="submit" class="jspsych-btn" style="padding: 12px 24px; font-size: 16px;">提交</button>
        </div>
        <br>
    </form>
</div>
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
    
    on_load: function() {
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
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const responseData = {
                gender: formData.get('gender'),
                age: parseInt(formData.get('age')),
                ethnicity: formData.get('ethnicity'),
                is_student: formData.get('is_student') === 'true',
                grade: formData.get('grade') || '',
                discipline: formData.get('discipline') || '',
                major: formData.get('major') || '',
                education_level: formData.get('education_level') || '',
                industry: formData.get('industry') || '',
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

        // 收集数据
        const responseData = {
            gender: formData.get('gender'),
            age: parseInt(formData.get('age')),
            ethnicity: formData.get('ethnicity'),
            is_student: formData.get('is_student') === 'true',
            grade: formData.get('grade') || '',
            discipline: formData.get('discipline') || '',
            major: formData.get('major') || '',
            education_level: formData.get('education_level') || '',
            industry: formData.get('industry') || '',
            income: formData.get('income') || '',
            marital_status: formData.get('marital_status') || '',
            children_status: formData.get('children_status') || ''
        };

        console.log('responseData on_finish:', responseData); // 输出调试信息

        // 保存数据
        jsPsych.finishTrial();
    }
});