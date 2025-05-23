const game1_timeline = [];

// 状态管理对象
const gameState = {
    currentRound: 1,
    totalEarnings: 250,
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
        console.log(gameState);
    }
};

// 介绍页1
const intro1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="text-align: left; margin: 50px 150px;">
            <h2 style="text-align: left;">游戏报酬规则介绍</h2>
            <br>
            <p>欢迎进入主实验！</p>
            <p>接下来你将面对<b>两个决策游戏</b>，并根据在游戏中的表现获得积分，其中<span style="font-weight: bold;color: rgb(142,27,17);">每 100 积分等同于 1 元的额外报酬</span>。</p>

            <p>我们将在实验结束后，根据实际的得分情况，通过另一个项目向你<span style="font-weight: bold;color: rgb(142,27,17);">另行追付这些额外报酬</span>。</p>
            <p>预计<b> 10 个工作日左右</b>到账，请你关注后续通知。</p>
        </div>
    `,
    choices: ["下一页"]
};

const intro2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="text-align: left; margin: 100px 100px 0 100px">
            <h1 style="text-align: left;">游戏 1 介绍</h1>
            <div style="display:flex;align-items:center">
                <div style="flex:4">
                    本游戏你拥有 <strong>${gameState.totalEarnings}</strong> 起始积分，共进行 <strong>${gameState.numRounds}</strong> 局。每局积分累计到总分，并最终按照<span style="font-weight: bold; color: rgb(142,27,17);"> 100积分 = 1元 </span>折合为你的额外报酬。每局游戏具体规则如下：</b></p>

                    <p>
                        (1) <b>每局开始前</b>，系统从如右图所示的 <b>偏黑箱</b> 和 <b>偏白箱</b> 两个箱子中随机挑选⼀个。<b>你不知道挑选的是哪个</b>，需要根据后续的信息来进行判断。
                    </p>
                    <p>
                        (2) 每局最多从开局挑选的箱子中抽 <b>${gameState.maxAttempts}</b> 轮球，每轮抽一个球<b>展示给你看后放回</b>。看完球后，你要在三个选项中选一个：<b>A</b>. 开局挑选的是偏白箱；<b>B</b>. 开局挑选的是偏黑箱；<b>C</b>. 暂不判断，进入下一轮。
                    </p> 
                    <p>
                        (3) 一旦你在某一轮<b>做出判断</b>——选择 A 或 B，则<b>本局游戏立刻结束</b>，进入收益计算；若选择 C，则进入下一轮，继续抽球展示。第 ${gameState.maxAttempts} 轮时必须做判断，在 A 和 B 之间择一选择。
                    </p>
                    <p> 
                        (4) <span style="font-weight: bold;color: rgb(142,27,17);">收益计算规则</span>：每局结束后，如果你对开局挑选的箱子<span style="font-weight: bold;color: rgb(142,27,17);">判断正确</span>，将<span style="font-weight: bold;color: rgb(142,27,17);">加 50 分</span>；如果<span style="font-weight: bold;color: rgb(142,27,17);">判断错误</span>，将<span style="font-weight: bold;color: rgb(142,27,17);">减 50 分</span>。你的<span style="font-weight: bold;color: rgb(142,27,17);">得分只取决于判断的对错，和第几轮做判断无关</span>。
                    </p> 
                </div>
                <!-- img -->
                <div style="flex: 1; text-align: center;">
                    <img src="img/concept3.png" 
                    style="width:200px; height:350px; display: block; margin: 0 auto;" />
                </div>
            </div>
        </div>
    `,
    choices: ["开始游戏"],
    button_html:'<button class="jspsych-btn" style="margin-bottom:100px">%choice%</button>'
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
                    <p style="font-size:25px">第 ${gameState.currentRound} 局，第 ${gameState.currentAttempt + 1} 轮</p>
                    <table class="game-table">
                        ${generateTableHeader()}
                        ${generateCoinRow(gameState.coinSequence.slice(0, gameState.currentAttempt + 1))}
                    </table>
                    <p>请选择一个选项，然后点击确认</p>
                    <img src="img/concept2.png" style="position: absolute; bottom: -275px; right: 0px; width: 245px; height: auto;">
                </div>
            `,
            options: () => {
                const isFinal = gameState.currentAttempt === 8;
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
                const guess = response.includes('偏白箱') ? '偏白箱' : '偏黑箱';
                const correct = guess === gameState.boxType;
                gameState.totalEarnings += correct ? 50 : -50;
                //结果记录
                data.game1_round = gameState.currentRound
                data.game1_participant_guess = guess
                data.game1_boxType = gameState.boxType
                data.game1_isCorrect = correct ? 1:0
                data.game1_result = correct ? 1:-1
                data.game1_attemptNum = gameState.currentAttempt + 1
                data.game1_Coin_sequence = gameState.coinSequence
                gameState.currentAttempt = 9; // 强制结束当前局
            } else {
                gameState.currentAttempt++;
            }
        }
    };
}


const resultPage = {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => {
        const lastTrialData = jsPsych.data.get().last(1).values()[0];
        const guess = lastTrialData.response.Q0.includes('偏白箱') ? '偏白箱' : '偏黑箱';
        const correct = guess === gameState.boxType;
        const resultText = `你的判断是：“开局挑选的是${guess}”，判断<b>“${correct ? '正确' : '错误'}”</b>，<span style="font-weight: bold;color: rgb(142,27,17);">${correct ? '+50' : '-50'} 分</span>`;
        return `
            <h2>${gameState.currentRound === gameState.numRounds ? '游戏1结束' : `第 ${gameState.currentRound} 局`}</h2>
            <p>${resultText}</p>
            <p><span style="font-weight: bold;color: rgb(142,27,17);">总积分：${gameState.totalEarnings}</span></p>
        `;
    },
    choices: () => {
        return gameState.currentRound === 5 ? ['完成'] : ['继续']
    },
    on_load: () => {
            if (gameState.currentRound < 5) {
                gameState.currentRound++;
            }}
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

//结束语
let game1_end = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <h3 style="margin-bottom:30px">游戏1️⃣已全部完成</h3>
      `,
    choices: ['继续'],
    on_finish:(data)=>{
        data.totalEarnings = gameState.totalEarnings
    }
};

// 主时间线（5局循环）
game1_timeline.push(
    intro1,
    intro2
);

for(i = 0; i < 5; i++){
    game1_timeline.push(roundTimeline)
}

game1_timeline.push(game1_end)


// 样式定义
const tableStyles = `
    .game-table td { min-width: 90px; height: 70px; font-size: 24px !important; font-weight:bold !important; }
    .game-table th, .game-table td { border: 1px solid black; text-align: center; }
    .jspsych-survey-multi-choice-prompt { margin-bottom: 20px; }
    .jspsych-survey-multi-choice-option { display: block; margin-bottom: 10px; }
    .jspsych-btn { display: block; margin: -20px 0 0 80px; background-color: rgb(75, 126, 243); color:white; border:none; border-radius:5px; padding:10px 20px; cursosr:pointer; }
    .jspsych-survey-multi-choice-requirgb(142,27,17)::after {content: "" !important; /* 清除星号 */
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${tableStyles}</style>`);