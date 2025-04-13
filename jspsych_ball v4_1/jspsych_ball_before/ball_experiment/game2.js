let game2_timeline = [];
let gameStateList = []
let uId = ''
let gId = ''
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
    totalEarnings: 500, // 初始资金
    boxType: '',
    coinSequence: [],
    currentAttempt: 0,
    maxAttempts: 9, // 每局最多进行 9 轮
    numRounds: 10,    // 总共有 10 局
    guess_attempt: 0,
    current_guess: ''
};

//注意力检查
let attention_check = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<h1 style="margin-bottom:50px">请正确回答以下问题</h1>',
    html:
      `<div style="margin: 0 auto;font-size:24px;text-align: left;">
      
      <div class="mb20">
        <div class="question-text">1. 一年有多少个月</div>
        <div class="options">
          <label><input name="months" type="radio" value="12" required> A. 12</label></br>
          <label><input name="months" type="radio" value="13" required> B. 13</label></br>
          <label><input name="months" type="radio" value="14" required> C. 14</label></br>
        </div>
      </div>
      
      <div class="mb20">
        <div class="question-text">2. 一天有多少个小时</div>
        <div class="options">
          <label><input name="hours" type="radio" value="12" required> A. 12</label></br>
          <label><input name="hours" type="radio" value="24" required> B. 24</label></br>
          <label><input name="hours" type="radio" value="36" required> C. 36</label></br>
        </div>
      </div>
      
      <div class="mb20">
        <div class="question-text">3. 这个问题请选择C选项</div>
        <div class="options">
          <label><input name="select_c" type="radio" value="A" required> A. 支持</label></br> 
          <label><input name="select_c" type="radio" value="B" required> B. 中立</label></br> 
          <label><input name="select_c" type="radio" value="C" required> C. 反对</label></br> 
        </div>
      </div>
      
    </div>
    `,
    button_label: '提交答案',
    on_finish: function(data){
        jsPsych.data.addProperties({ 
            months_answer : data.response.months,
            hours_answer : data.response.hours,
            select_c_answer : data.response.select_c
           });
  }
}


// 生成硬币序列函数
function generateCoinSequence(boxType) {
    const probabilities = boxType === '偏白箱' ?
        [0.6, 0.4, 0] : [0.4, 0.6, 0]; // 白球概率 60% 或 40%

    return Array.from({ length: game2State.maxAttempts }, () => {
        const rand = Math.random();
        return rand < probabilities[0] ? 'gold' :    // 白球
            rand < probabilities[0] + probabilities[1] ? 'silver' : 'copper'; // 黑球
    });
}

// 初始化游戏状态
const initgame2State = {
    type: jsPsychCallFunction,
    func: () => {
        game2State.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
        game2State.coinSequence = generateCoinSequence(game2State.boxType);
        game2State.currentAttempt = 0; // 重置当前轮次
        console.log(game2State);
    }
};

// 介绍页
const intro_game2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="text-align: left; margin: 50px 150px;">
            <h1 style="text-align: left;">游戏 2 介绍</h1>
            <div style="display: flex; gap: 40px; align-items: flex-start;">
                <div style="flex: 1;">
                    <p>本游戏你拥有 <strong>${game2State.totalEarnings}</strong> 起始积分，游戏共进行 <strong>${game2State.numRounds}</strong> 局，你在游戏 2 中的收益为${game2State.numRounds}局游戏的累积收益，并将同样按照<span style="font-weight: bold; color: rgb(142,27,17);"> 100积分 = 1元 折合为额外报酬。</span></p>
                    <p>你将与一位随机匹配的玩家参与<strong>抢答版</strong>的游戏 1。箱子的选取方法，抽球规律和作答规则与游戏 1 相同。</p>
                    <p>每局游戏开始前，系统随机从两个箱子中挑选一个，后续每轮从中随机抽出球，展示给你和你的对手后放回。<span style="font-weight: bold;color: rgb(142,27,17);">对你们来说，开局随机挑选的箱子和每一轮展示的球是一样的。</span>你们将根据看到的信息，各自判断开局挑选的是哪个箱子。在游戏 2 的整个过程中，你们<span style="font-weight: bold;color: rgb(142,27,17);">看不到彼此的选择</span>。</p>
                    <p>${game2State.numRounds}局游戏结束后，系统将比对双方每局的选择，按以下<span style="font-weight: bold;color: rgb(142,27,17);">抢答规则</span>计算各自<b>每局的收益</b>：</p>
                    <div style="background-color: #e0f0fa; padding: 5px; border-radius: 5px;">
                        <li>情况 1：两位玩家<span style="font-weight: bold;color: rgb(142,27,17);">在同一轮次</span>做出判断，<span style="font-weight: bold;color: rgb(142,27,17);">彼此收益互不影响</span>，判断正确者加 50 分，判断错误者减 50 分。</li>
                        <li>情况 2：两位玩家<span style="font-weight: bold;color: rgb(142,27,17);">在不同轮次</span>做出判断，<span style="font-weight: bold;color: rgb(142,27,17);">作答轮次晚的一方，作答无效，得 0 分</span>；轮次早的一方，判断正确加 50 分，判断错误减 50 分。</li>
                    </div>
                </div>
                <div style="flex: 0 0 auto; margin-top: 150px;">
                <img src="img/concept3.png" height="350px" style="display: block;" />
                </div>
            </div>
        </div>
    `,
    choices: ["下一页"]
};
// 计算页
const calculationPage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="text-align: left; margin: 50px 150px;">
            <h1 style="text-align: left;">测试题</h1>
            <p><b>为确保你正确理解了游戏 2 的规则，请完成以下测试题。</b></p>
            
            <!-- 题目 1 -->
            <div>
                <p>在游戏2的某一局中，玩家 1 和玩家 2 都在<b>第 9 轮</b>作答，都选择了<b>“A. 开局挑选的是偏白箱”</b>。如果在这局游戏开始时，被挑中的箱子是<b>偏白箱</b>，请选择两位玩家在该局游戏中的收益。</p>

                1. 请选择玩家 1 在该局游戏中的收益。
                <div style="display: flex; gap: 10px; margin-top: 5px;"> <!-- 增加 margin-top -->
                    <label><input type="radio" name="test_answer1" value="-1"> -50</label><br>
                    <label><input type="radio" name="test_answer1" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer1" value="1"> +50</label><br>
                </div>
            </div>
            <br>
            <div>
                2. 请选择玩家 2 在该局游戏中的收益。
                <div style="display: flex; gap: 10px; margin-top: 5px;"> <!-- 增加 margin-top -->
                    <label><input type="radio" name="test_answer2" value="-1"> -50</label><br>
                    <label><input type="radio" name="test_answer2" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer2" value="1"> +50</label><br>
                </div>
            </div>
            <br>
            <!-- 题目 3 -->
            <div>
                <p>在游戏2的某一局中，玩家 1 在<b>第 1 轮</b>作答，选择了<b>“A. 开局挑选的是偏白箱”</b>，玩家 2 在<b>第 9 轮</b>作答，选择了<b>“B. 开局挑选的是偏黑箱”</b>。如果在这局游戏开始时，被挑中的箱子是<b>偏黑箱</b>，请选择两位玩家在该局游戏中的收益。</p>
                3. 请选择玩家 1 在该局游戏的收益：
                <div style="display: flex; gap: 10px;margin-top: 5px;">
                    <label><input type="radio" name="test_answer3" value="-1"> -50</label><br>
                    <label><input type="radio" name="test_answer3" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer3" value="1"> +50</label><br>
                </div>
            </div>
            <br>
            <div>
                4. 请选择玩家 2 在该局游戏的收益：
                <div style="display: flex; gap: 10px;margin-top: 5px;">
                    <label><input type="radio" name="test_answer4" value="-1"> -50</label><br>
                    <label><input type="radio" name="test_answer4" value="0"> 0</label><br>
                    <label><input type="radio" name="test_answer4" value="1"> +50</label><br>
                </div>
            </div>
            <button id="submit-button" class="btn btn-primary" style="margin:30px 0;padding: 10px 20px; font-size: 16px; background-color: rgb(75, 126, 243); color: white; border: none; border-radius: 5px; cursor: pointer;">提交</button>
            <br>
             </div>
    `,
    choices: "NO_KEYS",
    on_load: () => {
        document.getElementById('submit-button').addEventListener('click', () => {
            const test_answer1 = parseInt(document.querySelector('input[name="test_answer1"]:checked')?.value);
            const test_answer2 = parseInt(document.querySelector('input[name="test_answer2"]:checked')?.value);
            const test_answer3 = parseInt(document.querySelector('input[name="test_answer3"]:checked')?.value);
            const test_answer4 = parseInt(document.querySelector('input[name="test_answer4"]:checked')?.value);
            if (isNaN(test_answer1) || isNaN(test_answer2) || isNaN(test_answer3) || isNaN(test_answer4)) {
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
        console.log(globalAnswers);
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
                </p>
                <p>
                    第 2 题回答<b> ${feedback2}</b>。<br>
                </p>
                <br>
                若回答不正确，请再次阅读游戏2的<b>每局收益</b>的计算规则，完全理解后点击重新测试，再次尝试作答：
                <div style="background-color: #e0f0fa; padding: 5px; border-radius: 5px;text-align: left;max-width: 1150px; margin: 0 auto;">
                    <li>情况 1：两位玩家<span style="font-weight: bold;color: rgb(142,27,17);">在同一轮次</span>做出判断，<span style="font-weight: bold;color: rgb(142,27,17);">彼此收益互不影响</span>，判断正确者加 50 分，判断错误者减 50 分。</li>
                        <li>情况 2：两位玩家<span style="font-weight: bold;color: rgb(142,27,17);">在不同轮次</span>做出判断，<span style="font-weight: bold;color: rgb(142,27,17);">作答轮次晚的一方，作答无效，得 0 分</span>；轮次早的一方，判断正确加 50 分，判断错误减 50 分。</li>
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
                for (i = 0; i < 5; i++) {
                    jsPsych.addNodeToEndOfTimeline(roundTimeline_game2)
                }
                jsPsych.addNodeToEndOfTimeline(attention_check)
                for (i = 0; i < 5; i++) {
                    jsPsych.addNodeToEndOfTimeline(roundTimeline_game2)
                }
                jsPsych.addNodeToEndOfTimeline(game2_end)
                jsPsych.addNodeToEndOfTimeline(exit_fullscreen)
                jsPsych.addNodeToEndOfTimeline(end)
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
            ${coins.map(coin => `<td><img src="img/${coin}.png" style="width: 60px; height: 60px; display: block; margin: auto;"></td>`).join('')}
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
                    <img src="img/concept2.png" style="position: absolute; bottom: -275px; right: 0px; width: 245px; height: auto;">
                </div>
            `,
            options: () => {
                const isFinal = game2State.currentAttempt === 8;
                return isFinal ? ['A. 开局挑选的是偏白箱', 'B. 开局挑选的是偏黑箱']
                    : ['A. 开局挑选的是偏白箱', 'B. 开局挑选的是偏黑箱', 'C. 暂不判断，进入下一轮'];
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
                data.game2_round = game2State.currentRound
                data.game2_participant_guess = game2State.current_guess
                data.game2_boxType = game2State.boxType
                data.game2_isCorrect = correct ? 1 : 0
                data.game2_attemptNum = game2State.guess_attempt + 1
                data.game2_Coin_sequence = game2State.coinSequence
                gameStateList.push({...game2State})
                game2State.currentAttempt = 9; // 强制结束当前局
            } else {
                game2State.currentAttempt++;
            }
        }
    };
}

let resultBtn = ''

// 结果页
const resultPage_game2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => {
        let title = game2State.currentRound < game2State.numRounds ? "游戏 2：进行中" : "游戏 2 结束";
        let content = `
            <h2>${title}</h2>
            <br>
            <p>第 ${game2State.currentRound} 局游戏结果：</p>
            <p>你在第 ${game2State.guess_attempt + 1} 轮做出判断: 开局挑选的是${game2State.current_guess}。
                与你匹配的玩家也在某一轮次做出判断。
            </p>
        `;

        if (game2State.currentRound < game2State.numRounds) {
            content += `
                <p>游戏 2 的10局结束后，系统将比对双方的选择，分别计算你们在游戏 2 中的收益，之后追付额外报酬。</p>
                <br>
            `;
            resultBtn = "下一局"
        } else {
            content += `
                <p>游戏 2 中的收益将在系统比对你和对手的选择，分别计算收益后追付。</p>
                <br>
            `;
            resultBtn = "实验结束"
        }
        return content;
    },
    choices: function () {
        return [resultBtn]
    },
    on_load: () => {
        if (game2State.currentRound < game2State.numRounds) {
            game2State.currentRound++;
        };
    }
};

//结束语
let game2_end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <h3 style="margin-bottom:30px">游戏2️⃣已全部完成</h3>
      <h3 style="margin-bottom:30px">上传数据中，请稍等片刻，切勿关闭浏览器...</h3>
      `,
      trial_duration: function () {
        // return Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
        return 10000
      },
      response_ends_trial: false,
      choices: "NO_KEYS",
      on_load: function () {
        uId = generateUserId()
        beforeInsert(uId,uId,gameStateList)
      }
};



// 单局时间线（严格循环控制）
const roundTimeline_game2 = {
    timeline: [
        initgame2State,
        {
            timeline: [createDecisionTrial()],
            loop_function: () => game2State.currentAttempt < 9 // 最多循环9次
        },
        resultPage_game2
    ]
};

// 主时间线（10局循环）
// 主时间线仅保留初始流程
game2_timeline.push(
    intro_game2,
    calculationPage,
    feedbackPage // 动态插入后续流程
);

// 样式定义
const tableStyles_game2 = `
    .game-table td { min-width: 90px; height: 70px; font-size: 24px !important; font-weight:bold !important; }
    .game-table th, .game-table td { border: 1px solid black; text-align: center; }
    .jspsych-survey-multi-choice-prompt { margin-bottom: 20px; }
    .jspsych-survey-multi-choice-option { display: block; margin-bottom: 10px; }
    .jspsych-btn { display: block; margin: -20px 0 0 80px; background-color: rgb(75, 126, 243); color:white; border:none; border-radius:5px; padding:10px 20px; cursosr:pointer; }
    .jspsych-survey-multi-choice-required::after {content: "" !important; /* 清除星号 */
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${tableStyles_game2}</style>`);

