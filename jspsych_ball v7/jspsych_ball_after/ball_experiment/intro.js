let intro_text = `
    <h2>知情同意书</h2>
    <div class="centered-list">
        <ul>
            <li>欢迎参加本实验！</li>
            <li>本实验由三个问卷和<span style="font-weight: bold;color: rgb(142,27,17);">两个决策游戏</span>组成。你将获得<span style="font-weight: bold;color: rgb(142,27,17);"> 5 元基础报酬</span>，并根据在<span style="font-weight: bold;color: rgb(142,27,17);">两个游戏</span>中的实际表现，获得<span style="font-weight: bold;color: rgb(142,27,17);">至多 17 元的额外报酬</span>。</li>
            <li>请务必使用 <span style="font-weight: bold;color: rgb(142,27,17);">电脑</span> 参与实验！若现在使用了其他设备，请退出，改用电脑重新登录本实验。</li>
            <li>参与实验是<span style="font-weight: bold;color: rgb(142,27,17);"> 完全自愿 </span>的，你可以在任何时候选择退出实验，但如果退出实验你将不会获得任何报酬。</li>
            <li>本实验中您的身份和回答将<span style="font-weight: bold;color: rgb(142,27,17);"> 完全匿名 </span>，并且这些记录不会包含您的姓名或任何其他可用于识别您身份的个人信息。只有参与这项研究的研究人员能访问您的回答。</li>
            <li>这项实验由北京大学和北京师范大学的研究人员：梅文俊教授、张博宇教授、冯毅隆博士生和王晓敏博士生进行。如果您对本实验有任何疑问，或在访问实验页面时遇到困难，请联系: pkucoe_meilab@163.com 。</li>
            <li>在整个实验过程中你<span style="font-weight: bold;color: rgb(142,27,17);"> 不会受到任何欺骗或误导</span>，实验进行的方式与其描述的完全一致。</li>
        </ul>
    </div>
    <br>
    <div style="text-align: left; margin-left: 20px;">
        <input type="checkbox" id="consentCheckbox1" onclick="toggleButton()"> 如果您同意参与，请您花时间认真回答。<span style="font-weight: bold;color: rgb(142,27,17);"> 过快而草率的作答将无法通过我们的数据审核</span>，影响您获得报酬。
    </div>
    <div style="text-align: left; margin-left: 20px;">
        <input type="checkbox" id="consentCheckbox2" onclick="toggleButton()"> 请不要点击浏览器上的后退或刷新按钮！这将导致实验数据丢失，影响您获得报酬。
    </div>
    <div style="text-align: left; margin-left: 20px;">
        <input type="checkbox" id="consentCheckbox3" onclick="toggleButton()"> 我已阅读以上信息并同意实验过程中收集的数据用于科学研究。
    </div>
    <br>
    <div style="text-align: center;">
        <button id="startButton" class="intro-btn disabled" disabled onclick="startExperiment()">开始实验</button>
    </div>
    <style>
        .intro-btn {
            background-color: rgb(49, 108, 244); /* 默认蓝色背景 */
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            margin: 0 auto; /* 添加居中对齐 */
            display: block; /* 使按钮成为块级元素 */
        }
        .intro-btn.disabled {
            background-color: grey; /* 未激活时为灰色 */
            cursor: not-allowed; /* 鼠标指针为不可点击状态 */
        }
        .intro-btn.enabled {
            background-color: rgb(49, 108, 244); /* 激活时为蓝色 */
            cursor: pointer; /* 鼠标指针为可点击状态 */
        }
    </style>
`;

function toggleButton() {
    const checkbox1 = document.getElementById('consentCheckbox1');
    const checkbox2 = document.getElementById('consentCheckbox2');
    const checkbox3 = document.getElementById('consentCheckbox3');
    const button = document.getElementById('startButton');

    // 检查所有复选框是否都被勾选
    if (checkbox1.checked && checkbox2.checked && checkbox3.checked) {
        button.classList.remove('disabled');
        button.classList.add('enabled');
        button.disabled = false;
    } else {
        button.classList.remove('enabled');
        button.classList.add('disabled');
        button.disabled = true;
    }
}

function startExperiment() {
    // 手动结束当前 trial，跳转到下一页
    jsPsych.finishTrial();
}

let intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: intro_text,
    choices: [], // 删除空格键作为备用触发方式
    data: {
        plugin: 'intro'
    }
};

let intro_timeline = [intro];