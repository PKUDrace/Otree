const game2_timeline = [];
const globalAnswers = {
    test_answer1: null,
    test_answer2: null,
    test_answer3: null,
    test_answer4: null
};

// 重点：后续使用var来记录数据
// 状态管理对象
const game2State = {
    currentRound: 1,
    totalEarnings: 10, // 初始资金
    boxType: '',
    coinSequence: [],
    currentAttempt: 0,
    maxAttempts: 9, // 每局最多进行 9 轮
    numRounds: 10,    // 总共有 10 局
    guess_attempt: 0,
    current_guess: ''
};

// 生成硬币序列函数
function generateCoinSequence(boxType) {
    const probabilities = boxType === '偏白箱' ? 
        [0.6, 0.4, 0] : [0.4, 0.6, 0]; // 白球概率 60% 或 40%
    
    return Array.from({length: game2State.maxAttempts}, () => {
        const rand = Math.random();
        return rand < probabilities[0] ? 'gold' :    // 白球
               rand < probabilities[0]+probabilities[1] ? 'silver' : 'copper'; // 黑球
    });
}

// 初始化游戏状态
const initgame2State = {
    type: jsPsychCallFunction,
    func: () => {
        game2State.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
        game2State.coinSequence = generateCoinSequence(game2State.boxType);
        game2State.currentAttempt = 0; // 重置当前轮次
    }
};

// 介绍页
const intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="text-align: left; margin: 50px 150px;">
            <h1 style="text-align: left;">游戏 2：游戏介绍</h1>
            <br>
            <div style="display: flex; gap: 40px; align-items: flex-start;">
                <div style="flex: 1;">
                    <p>你将与一位随机匹配的玩家参与<strong>抢答版</strong>的游戏 1。本游戏你拥有 <strong>${game2State.totalEarnings}</strong> 元启动资金，游戏共进行 <strong>${game2State.numRounds}</strong> 局，你在游戏 2 中的收益为${game2State.numRounds}局游戏的累积收益。<span style="font-weight: bold; color: rgb(142,27,17);">这将是你实验报酬的一部分</span></p>
                    <p>箱子的选取方法，抽球规律和作答规则与游戏 1 相同。<span style="font-weight: bold;color: rgb(142,27,17);">在一局游戏中，你和对方看到的信息（从同一个箱中抽出的球）是完全相同的</span>。在整个游戏过程中你们<span style="font-weight: bold;color: rgb(142,27,17);">看不到彼此的选择</span>。</p>
                    <p>${game2State.numRounds}局游戏结束后，系统将比对双方每局的选择，按以下规则计算各自<b>每局的收益</b>：</p>
                    <div style="background-color: #e0f0fa; padding: 5px; border-radius: 5px;">
                        <li>情况 1：两位玩家<strong>在同一轮次</strong>做出判断，<b>彼此收益互不影响</b>，判断正确者得 1 元，判断错误者失 1 元。</li>
                        <li>情况 2：两位玩家<strong>在不同轮次</strong>做出判断，<b>作答轮次晚的一方，作答无效，得 0 元</b>；轮次早的一方，判断正确得 1 元，判断错误失 1 元。</li>
                    </div>
                </div>
                <div style="flex: 0 0 auto;">
                    <img src="img/concept3.png" height="350px" style="display: block;" />
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button id="next-button" style="padding: 10px 20px; font-size: 16px; background-color: rgb(75, 126, 243); color: white; border: none; border-radius: 5px; cursor: pointer;">下一页</button>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    on_load: () => document.getElementById('next-button').addEventListener('click', jsPsych.finishTrial)
};
// 计算页
const calculationPage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="text-align: left; margin: 50px 150px;">
            <h1 style="text-align: left;">计算题</h1>
            <p><b>请基于游戏 2 的收益计算规则，完成下面两道计算题。</b></p>
            
            <!-- 题目 1 -->
            <div>
                <p>在游戏 2 的某一局中，玩家 1 和玩家 2 都在<b>第 9 轮</b>作答，都选择了<b>“A. 这是偏白箱”</b>。如果在这局游戏开始时，被挑中的箱子是<b>偏白箱</b>
                ，请选择两位玩家在该局游戏中的收益。<br>

                1.请选择玩家 1 在该局游戏中的收益。</p>
                <div style="display: flex; gap: 10px;">
                    <label><input type="radio" name="test_answer1" value="-1"> -1</label><br>
                    <label><input type="radio" name="test_answer1" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer1" value="1"> +1</label><br>
                </div>
            </div>

            <div>
                <p>2.请选择玩家 2 在该局游戏中的收益。</p>
                <div style="display: flex; gap: 10px;">
                    <label><input type="radio" name="test_answer2" value="-1"> -1</label><br>
                    <label><input type="radio" name="test_answer2" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer2" value="1"> +1</label><br>
                </div>
            </div>
            <br>
            <!-- 题目 3 -->
            <div>
                <p>在游戏 2 的某一局中，玩家 1 在<b>第 1 轮</b>作答，选择了<b>“A. 这是偏白箱”</b>，玩家 2 在<b>第 9 轮</b>作答，选择了<b>“B. 这是偏黑箱”</b>。如果在这局游戏开始时，被挑中的箱子是<b>偏黑箱</b>，请选择两位玩家在该局游戏中的收益。
                </p>3.请选择玩家 1 在该局游戏的收益：</p>
                <div style="display: flex; gap: 10px;">
                    <label><input type="radio" name="test_answer3" value="-1"> -1</label><br>
                    <label><input type="radio" name="test_answer3" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer3" value="1"> +1</label><br>
                </div>
            </div>
            <div>
                <p>4. 请选择玩家 2 在该局游戏的收益：</p>
                <div style="display: flex; gap: 10px;">
                    <label><input type="radio" name="test_answer4" value="-1"> -1</label><br>
                    <label><input type="radio" name="test_answer4" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer4" value="1"> +1</label><br>
                </div>
            </div>
            <br>
            
            <button id="submit-button" class="btn btn-primary" style="padding: 10px 20px; font-size: 16px; background-color: rgb(75, 126, 243); color: white; border: none; border-radius: 5px; cursor: pointer;">提交</button>
        </div>
    `,
    choices: "NO_KEYS",
    on_load: () => {
        document.getElementById('submit-button').addEventListener('click', () => {
            const test_answer1 = parseInt(document.querySelector('input[name="test_answer1"]:checked')?.value);
            const test_answer2 = parseInt(document.querySelector('input[name="test_answer2"]:checked')?.value);
            const test_answer3 = parseInt(document.querySelector('input[name="test_answer3"]:checked')?.value);
            const test_answer4 = parseInt(document.querySelector('input[name="test_answer4"]:checked')?.value);
            if (isNaN(test_answer1)|| isNaN(test_answer2) || isNaN(test_answer3)|| isNaN(test_answer4)) {
                alert("请完成所有题目后再提交！");
                return;
            }
            // 将答案存储到全局变量中
            globalAnswers.test_answer1 = test_answer1;
            globalAnswers.test_answer2 = test_answer2;
            globalAnswers.test_answer3 = test_answer3;
            globalAnswers.test_answer4 = test_answer4;
            // 输出 globalAnswers 到控制台
            console.log('globalAnswers:', globalAnswers);
            jsPsych.finishTrial();
        });
    }
};
//反馈页
const feedbackPage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        const { test_answer1, test_answer2, test_answer3, test_answer4 } = globalAnswers;
        // 修正答案判断逻辑
        const feedback1 = (test_answer1 === 1 && test_answer2 === 1) ? '正确' : '错误';
        const feedback2 = (test_answer3 === -1 && test_answer4 === 0) ? '正确' : '错误';
        const allCorrect = feedback1 === '正确' && feedback2 === '正确';
        const buttonText = allCorrect ? '开始实验' : '重新测试';

        // 生成反馈内容（原有HTML结构）
        return `
            <h2>答案反馈</h2>
                <br>
                <p>
                    第 1 题回答<b> ${feedback1}</b>。<br>
                    计算思路：这一局中两位玩家在同一轮次（第 9 轮）作答，彼此收益互不影响；双方都选择了“A. 这是偏白箱”，均判断正确得 1 元。
                </p>
                <p>
                    第 2 题回答<b> ${feedback2}</b>。<br>
                    计算思路：这一局中玩家 2 的作答轮次（第 9 轮）晚于玩家 1（第 1 轮），因此所做判断无效得 0 元；而玩家 1 判断错误损失 1 元。
                </p>
                <br>
                游戏 2 <b>每局收益</b>的计算规则如下：
                <div style="background-color: #e0f0fa; padding: 5px; border-radius: 5px;">
                    <li>情况 1：两位玩家<strong>在同一轮次</strong>做出判断，<b>彼此收益互不影响</b>，判断正确者得 1 元，判断错误者失 1 元。</li>
                    <li>情况 2：两位玩家<strong>在不同轮次</strong>做出判断，<b>作答轮次晚的一方得 0 元</b>；轮次早的一方，判断正确得 1 元，判断错误失 1 元。</li>
                </div>
                <br>
                <button id="feedback-button" data-correct="${allCorrect}" class="btn btn-primary" style="padding: 10px 20px; font-size: 16px; background-color: rgb(75, 126, 243); color: white; border: none; border-radius: 5px; cursor: pointer;">${buttonText}</button>
            </div>
        `;
    },
    choices: "NO_KEYS",
    on_load: () => {
        const button = document.getElementById('feedback-button');
        const allCorrect = button.dataset.correct === 'true';

        button.addEventListener('click', () => {
            if (allCorrect) {
                // 答案正确：插入主实验流程
                jsPsych.addNodeToEndOfTimeline({
                    timeline: [{
                        timeline: [roundTimeline],
                        repetitions: 10
                    }]
                });
                jsPsych.finishTrial();
            } else {
                // 答案错误：清除数据并重新插入计算页和反馈页
                const allData = Array.from(jsPsych.data.get().filter(data => data.trial_type !== 'calculation'));
                jsPsych.data.reset();
                allData.forEach(d => jsPsych.data.add(d));

                // 关键修复：插入新的计算页和反馈页，覆盖后续流程
                jsPsych.addNodeToEndOfTimeline({
                    timeline: [calculationPage, feedbackPage]
                });

                jsPsych.finishTrial();
            }
        });
    }
};


// 生成表格头部
function generateTableHeader() {
    return `
        <thead>
            <tr>
                <th>轮次</th>
                ${Array(9).fill().map((_, i) => {
                    const round = i + 1;
                    let bgColor;
                    if (round < game2State.currentAttempt + 1) {
                        bgColor = 'rgb(211,211,211)';
                    } else if (round === game2State.currentAttempt + 1) {
                        bgColor = 'rgb(180,195,220)';
                    } else {
                        bgColor = 'white';
                    }
                    return `<th style="background-color: ${bgColor};">${round}</th>`;
                }).join('')}
            </tr>
        </thead>
    `;
}

// 生成硬币行（修正符号映射）
function generateCoinRow(coins) {
    return `
        <tr>
            <td>结果</td>
            ${coins.map(coin => `<td><img src="img/${coin}.png" style="width: 35px; height: 35px; display: block; margin: auto;"></td>`).join('')}
            ${Array(9 - coins.length).fill('<td></td>').join('')}
        </tr>
    `;
}

// 决策页模板
function createDecisionTrial() {
    return {
        type: jsPsychSurveyMultiChoice,
        questions: [{
            prompt: () => `
                <div style="position: relative;">
                    <p style="font-size:25px">第 ${game2State.currentRound} 局，第 ${game2State.currentAttempt + 1} 轮</p>
                    <table class="game-table">
                        ${generateTableHeader()}
                        ${generateCoinRow(game2State.coinSequence.slice(0, game2State.currentAttempt + 1))}
                    </table>
                    <p>请选择一个选项，然后点击确认</p>
                    <img src="img/concept2.png" style="position: absolute; bottom: -200px; right: 20px; width: 180px; height: auto;">
                </div>
            `,
            options: () => {
                const isFinal = game2State.currentAttempt === 8;
                return isFinal ? ['A. 这是偏白箱', 'B. 这是偏黑箱'] 
                               : ['A. 这是偏白箱', 'B. 这是偏黑箱', 'C. 暂不判断，进入下一轮'];
            },
            required: false
        }],
        button_label: "确认",
        on_finish: (data) => {
            // 添加手动校验
            if (!data.response.Q0) {
                alert("必须选择一个选项！");
                return false; // 阻止提交
            }
            const response = data.response.Q0;
            if (response.startsWith('A') || response.startsWith('B')) {
                game2State.current_guess = response.includes('偏白箱') ? '偏白箱' : '偏黑箱';
                game2State.guess_attempt = game2State.currentAttempt;
                const correct = game2State.current_guess === game2State.boxType;
                jsPsych.data.addProperties({ 
                    round: game2State.currentRound,
                    current_guess: game2State.current_guess,
                    current_boxType: game2State.boxType,
                    Coin_sequence: game2State.coinSequence
                });
                game2State.currentAttempt = 9; // 强制结束当前局
            } else {
                game2State.currentAttempt++;
            }
        }
    };
}

// 结果页
const resultPage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        let title = game2State.currentRound < game2State.numRounds ? "游戏 2：进行中" : "游戏 2 结束";
        let content = `
            <h2>${title}</h2>
            <br>
            <p>第 ${game2State.currentRound} 局游戏结果：</p>
            <p>你在第 ${game2State.guess_attempt+1} 轮做出判断: ${game2State.current_guess}。
                与你匹配的玩家也在某一轮次做出判断。
            </p>
        `;

        if (game2State.currentRound < game2State.numRounds) {
            content += `
                <p>游戏 2 结束后，系统将比对双方的选择计算你们在游戏 2 中的收益。</p>
                <br>
                <button class="game2_result_btn" style="display: block; margin: 0 auto; background-color: rgb(74, 126, 243); color: white; border: none; border-radius: 5px; padding: 10px 20px; cursor: pointer;">下一局</button>
            `;
        } else {
            content += `
                <p>你在游戏 2 中的收益将在实验结束后公布。</p>
                <br>
                <button class="game2_result_btn" style="display: block; margin: 0 auto; background-color: rgb(74, 126, 243); color: white; border: none; border-radius: 5px; padding: 10px 20px; cursor: pointer;">实验结束</button>
            `;
        }

        return content;
    },
    choices: "NO_KEYS",
    on_load: () => {
        document.querySelector('button').addEventListener('click', () => {
            if (game2State.currentRound < game2State.numRounds) {
                game2State.currentRound++;
                game2State.currentAttempt = 0; // 重置轮次
                game2State.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
                game2State.coinSequence = generateCoinSequence(game2State.boxType);
            jsPsych.finishTrial();
            };
        });
    }
};

// 单局时间线（严格循环控制）
const roundTimeline = {
    timeline: [
        initgame2State,
        {
            timeline: [createDecisionTrial()],
            loop_function: () => game2State.currentAttempt < 9 // 最多循环9次
        },
        resultPage
    ]
};

// 主时间线（10局循环）
// 主时间线仅保留初始流程
game2_timeline.push(
    intro,
    calculationPage,
    feedbackPage // 动态插入后续流程
);

// 样式定义
const tableStyles = `
    .game-table td { min-width: 50px; height: 50px; font-size: 20px; }
    .game-table th, .game-table td { border: 1px solid black; text-align: center; }
    .jspsych-survey-multi-choice-prompt { margin-bottom: 20px; }
    .jspsych-survey-multi-choice-option { display: block; margin-bottom: 10px; }
    .jspsych-btn { display: block; margin: -20px 0 0 80px; background-color: rgb(75, 126, 243); color:white; border:none; border-radius:5px; padding:10px 20px; cursosr:pointer; }
    .jspsych-survey-multi-choice-required::after {content: "" !important; /* 清除星号 */
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${tableStyles}</style>`);