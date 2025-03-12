const game1_timeline = [];

// 状态管理对象
const gameState = {
    currentRound: 1,
    totalEarnings: 5,
    boxType: '',
    coinSequence: [],
    currentAttempt: 0,
    maxAttempts: 9, // 每局最多进行 9 轮
    numRounds: 5     // 总共有 5 局
};

// 生成硬币序列函数
function generateCoinSequence(boxType) {
    const probabilities = boxType === '偏白箱' ? 
        [0.6, 0.4, 0] : [0.4, 0.6, 0]; // 白球概率 60% 或 40%
    
    return Array.from({length: gameState.maxAttempts}, () => {
        const rand = Math.random();
        return rand < probabilities[0] ? 'gold' :    // 白球
               rand < probabilities[0]+probabilities[1] ? 'silver' : 'copper'; // 黑球
    });
}

// 初始化游戏状态
const initGameState = {
    type: jsPsychCallFunction,
    func: () => {
        gameState.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
        gameState.coinSequence = generateCoinSequence(gameState.boxType);
        gameState.currentAttempt = 0; // 重置当前轮次
    }
};

// 介绍页1
const intro1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="text-align: left; margin: 50px 150px;">
            <h1 style="text-align: left;">游戏 1：游戏总则</h1>
            <br>
            <p>本游戏有<b>两个</b>箱子：“<b>偏白箱</b>”和“<b>偏黑箱</b>”。偏白箱中抽出白球的概率更高，偏黑箱中抽出黑球的概率更高。具体概率如下图：</p>
            <img src="img/concept.png" style="width:750px; display: block; margin: 0 auto;">
            <p><b>每局游戏</b>开始时，系统从两个箱子中<b>随机</b>挑选一个。<b>每局最多进行 ${gameState.maxAttempts} 轮游戏</b>。每一轮，系统从本局初被挑中的箱子里抽取一个球，抽球<b>不需要成本</b>。</p>
            <p>每局游戏里，你需要根据当前及之前轮次抽出的所有球<b>推测</b>本局被挑中的<b>是哪个箱子</b>。</p>
            <button id="next-button" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: rgb(49, 108, 244); color: white; border: none; border-radius: 5px; cursor: pointer;">下一页</button>
        </div>
    `,
    choices: "NO_KEYS",
    on_load: () => document.getElementById('next-button').addEventListener('click', jsPsych.finishTrial)
};

// 介绍页2
const intro2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="text-align: left; margin: 100px 100px;">
            <h1 style="text-align: left;">游戏 1：游戏介绍</h1>
            <div style="display:flex;align-items:center">
                <div style="flex:4">
                    <p>本游戏你拥有 <strong>${gameState.totalEarnings}</strong> 元启动资金，游戏共进行 <strong>${gameState.numRounds}</strong> 局，你在游戏 1 中的收益为 ${gameState.numRounds}局游戏的累积收益。<b>每局游戏具体规则如下：</b></p>

                    <p>
                        (1) 每局开始时，系统随机挑选⼀个箱子，按右图规律从箱中抽球 (后续页面也会展示该规律)。
                    </p>
                    <p>
                        (2) 每局最多进行 <b>${gameState.maxAttempts}</b> 轮。每轮中，你会看到当前和之前轮次中抽出的所有球，并在三个选项中择一选择：<b>A</b>. 这是偏白箱；<b>B</b>. 这是偏黑箱；<b>C</b>. 暂不判断，进入下一轮。
                    </p> 
                    <p>
                        (3) 一旦你在某一轮次中<b>做出判断</b>——选择 A 或 B，则本局游戏<b>立刻结束</b>；若选择 C，则进入下一轮。第 ${gameState.maxAttempts}轮时必须做判断，在 A 和 B 之间择一选择。
                    </p>
                    <p> 
                        (4) 每局结束后，如果<span style="color: red;">判断正确</span>，将<span style="color: red;">获得 1 元</span>；如果<span style="color: red;">判断错误</span>，将<span style="color: red;">失去 1 元</span>。你的收益只取决于判断是否正确，而与做出判断的轮次无关。
                    </p> 
                </div>
                <!-- img -->
                <div style="flex: 1; text-align: center;">
                    <img src="img/concept3.png" 
                    style="width:200px; height:350px; display: block; margin: 0 auto;" />
                </div>
            </div>
            <button id="start-button" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; background-color: rgb(49, 108, 244); color: white; border: none; border-radius: 5px; cursor: pointer;">开始游戏</button>
        </div>
    `,
    choices: "NO_KEYS",
    on_load: () => document.getElementById('start-button').addEventListener('click', jsPsych.finishTrial)
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
                    if (round < gameState.currentAttempt + 1) {
                        bgColor = 'rgb(211,211,211)';
                    } else if (round === gameState.currentAttempt + 1) {
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
                    <p style="font-size:25px">第 ${gameState.currentRound} 局，第 ${gameState.currentAttempt + 1} 轮</p>
                    <table class="game-table">
                        ${generateTableHeader()}
                        ${generateCoinRow(gameState.coinSequence.slice(0, gameState.currentAttempt + 1))}
                    </table>
                    <p>请选择一个选项，然后点击确认</p>
                    <img src="img/concept2.png" style="position: absolute; bottom: -250px; right: 20px; width: 180px; height: auto;">
                </div>
            `,
            options: () => {
                const isFinal = gameState.currentAttempt === 8;
                return isFinal ? ['A. 这是偏白箱', 'B. 这是偏黑箱'] 
                               : ['A. 这是偏白箱', 'B. 这是偏黑箱', 'C. 暂不判断，进入下一轮'];
            },
            required: true
        }],
        button_label: "确认",
        on_finish: (data) => {
            const response = data.response.Q0;
            if (response.startsWith('A') || response.startsWith('B')) {
                const guess = response.includes('偏白箱') ? '偏白箱' : '偏黑箱';
                const correct = guess === gameState.boxType;
                gameState.totalEarnings += correct ? 1 : -1;
                gameState.currentAttempt = 9; // 强制结束当前局
                jsPsych.data.addProperties({ 
                    round: gameState.currentRound,
                    outcome: correct ? '正确' : '错误',
                    total: gameState.totalEarnings
                });
            } else {
                gameState.currentAttempt++;
            }
        }
    };
}


// 结果页
const resultPage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        const lastTrialData = jsPsych.data.get().last(1).values()[0];
        const guess = lastTrialData.response.Q0.includes('偏白箱') ? '偏白箱' : '偏黑箱';
        const correct = guess === gameState.boxType;
        const resultText = `你的判断是：“这是${guess}”，判断结果：<b>“${correct ? '正确' : '错误'}”</b>，收益${correct ? '+1' : '-1'}`;
        return `
            <h2>${gameState.currentRound === 5 ? '游戏结束' : '下一局'}</h2>
            <p>${resultText}</p>
            <p><b>总收益：${gameState.totalEarnings}元</b></p>
            <button class="jspsych-btn" style="margin-top: 40px; display: block; margin-left: auto; margin-right: auto;">${gameState.currentRound === 5 ? '完成' : '继续'}</button>
        `;
    },
    choices: "NO_KEYS",
    on_load: () => {
        document.querySelector('button').addEventListener('click', () => {
            if (gameState.currentRound < 5) {
                gameState.currentRound++;
                gameState.currentAttempt = 0; // 重置轮次
                gameState.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
                gameState.coinSequence = generateCoinSequence(gameState.boxType);
            }
            jsPsych.finishTrial();
        });
    }
};

// 单局时间线（严格循环控制）
const roundTimeline = {
    timeline: [
        initGameState,
        {
            timeline: [createDecisionTrial()],
            loop_function: () => gameState.currentAttempt < 9 // 最多循环9次
        },
        resultPage
    ]
};

// 主时间线（5局循环）
game1_timeline.push(
    intro1,
    intro2,
    {
        timeline: [roundTimeline],
        repetitions: 5 // 直接重复5次
    }
);

// 样式定义
const tableStyles = `
    .game-table td { min-width: 50px; height: 50px; font-size: 20px; }
    .game-table th, .game-table td { border: 1px solid black; text-align: center; }
    .jspsych-survey-multi-choice-prompt { margin-bottom: 20px; }
    .jspsych-survey-multi-choice-option { display: block; margin-bottom: 10px; }
    .jspsych-btn { display: block; margin: -20px 0 0 20px; background-color: rgb(112,159,247); color:white; border:none; border-radius:5px; padding:10px 20px; cursor:pointer; }
    /* 隐藏 SurveyMultiChoice 的必填星号 */
    .jspsych-survey-multi-choice-prompt .required {display: none;}
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${tableStyles}</style>`);