const game1_timeline = [];

// 状态管理对象
const gameState = {
    currentRound: 1,
    totalEarnings: 5,
    boxType: '',
    coinSequence: [],
    currentAttempt: 0,
    maxAttempts: 9, // 每局最多进行 9 轮游戏
    numRounds: 5
};

// 生成硬币序列函数
function generateCoinSequence(boxType) {
    const probabilities = boxType === '偏白箱' ? 
        [0.6, 0.4, 0] : [0.4, 0.6, 0];
    
    return Array.from({length: gameState.maxAttempts}, () => {
        const rand = Math.random();
        return rand < probabilities[0] ? 'gold' :
               rand < probabilities[0]+probabilities[1] ? 'silver' : 'copper';
    });
}

// 初始化游戏状态
const initGameState = {
    type: jsPsychCallFunction, // 使用 call-function 插件对象
    func: () => {
        gameState.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
        gameState.coinSequence = generateCoinSequence(gameState.boxType);
        gameState.currentAttempt = 0;
    }
};

// 介绍页1
const intro1 = {
    type: jsPsychHtmlKeyboardResponse, // 使用 html-keyboard-response 插件对象
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
    choices: "NO_KEYS", // 禁用空格键
    on_load: () => {
        // 添加按钮点击事件
        document.getElementById('next-button').addEventListener('click', () => {
            jsPsych.finishTrial();
        });
    }
};

// 介绍页2
const intro2 = {
    type: jsPsychHtmlKeyboardResponse, // 使用 html-keyboard-response 插件对象
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
    choices: "NO_KEYS", // 禁用空格键
    on_load: () => {
        // 添加按钮点击事件
        document.getElementById('start-button').addEventListener('click', () => {
            jsPsych.finishTrial();
        });
    }
};

// 生成表格头部
function generateTableHeader() {
    return `
        <thead>
            <tr>
                ${Array.from({ length: gameState.maxAttempts }).map((_, i) => `<th>${i + 1}</th>`).join('')}
            </tr>
        </thead>
    `;
}


function generateCoinRow(coins) {
    return `
        <tr>
            ${coins.map(coin => {
                const symbol = coin === 'gold' ? '○' : '●'; // gold=白球，silver=黑球
                return `<td class="${gameState.currentAttempt + 1 === coins.length ? 'current-attempt' : ''}">${symbol}</td>`
            }).join('')}
            ${Array.from({ length: gameState.maxAttempts - coins.length }).map(() => `<td></td>`).join('')}
        </tr>
    `;
}

// 决策页模板
// 修改后的决策页模板（优化选项显示逻辑）
function createDecisionTrial() {
    return {
        type: jsPsychSurveyHtmlForm,
        button_label: "确认", // 禁用默认的提交按钮
        html: () => {
            const coins = gameState.coinSequence.slice(0, gameState.currentAttempt + 1);
            const isFinalAttempt = gameState.currentAttempt === 8;
            
            return `
                <p style="font-size:25px">第 ${gameState.currentRound} 局，第 ${gameState.currentAttempt + 1} 轮</p>
                <table class="game-table">
                    ${generateTableHeader()}
                    ${generateCoinRow(coins)}
                </table>
                <form id="decision-form">
                    <div class="radio-group">
                        <label>
                            <input type="radio" name="guess" value="偏白箱" required>
                            A. 这是偏白箱
                        </label>
                        <label>
                            <input type="radio" name="guess" value="偏黑箱">
                            B. 这是偏黑箱
                        </label>
                        ${!isFinalAttempt ? `
                        <label>
                            <input type="radio" name="guess" value="">
                            C. 暂不判断，进入下一轮
                        </label>` : ''}
                    </div>
                    <button type="submit" class="jspsych-btn">确认</button>
                </form>
                <style>
                    ${tableStyles}
                    ${formStyles}
                    
                    .current-attempt {
                        background-color: #b0c4de;
                        font-weight: bold;
                    }
                    .game-table td {
                        min-width: 50px;
                        height: 50px;
                        font-size: 20px;
                    }
                </style>
            `;
        },
        on_finish: (data) => {
            const response = data.response;
            if(response.guess) {
                const correct = response.guess === gameState.boxType;
                gameState.totalEarnings += correct ? 1 : -1;
                
                jsPsych.data.addProperties({
                    round: gameState.currentRound,
                    attempt: gameState.currentAttempt + 1,
                    guess: response.guess,
                    outcome: correct ? '正确' : '错误',
                    earnings: correct ? 1 : -1,
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
    type: jsPsychHtmlKeyboardResponse, // 使用 html-keyboard-response 插件对象
    stimulus: () => {
        const isFinal = gameState.currentRound === gameState.numRounds;
        return `
            <h2>${isFinal ? '游戏 1 结束' : '游戏 1：进行中'}</h2>
            <p>总收益：${gameState.totalEarnings}元</p>
            <button class="jspsych-btn">${isFinal ? '进入游戏2' : '下一局'}</button>
        `;
    },
    choices: "NO_KEYS",
    on_load: () => {
        document.querySelector('button').addEventListener('click', () => {
            if(gameState.currentRound < gameState.numRounds) {
                gameState.currentRound++;
                gameState.currentAttempt = 0;
                gameState.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
                gameState.coinSequence = generateCoinSequence(gameState.boxType);
            }
            jsPsych.finishTrial();
        });
    }
};

// 单轮时间线
const roundTimeline = {
    timeline: [
        initGameState,
        {
            timeline: [createDecisionTrial()],
            loop_function: () => {
                const lastData = jsPsych.data.get().last(1).values()[0];
                return !lastData?.guess && gameState.currentAttempt < 9;

            }
        },
        resultPage
    ]
};

// 主时间线
game1_timeline.push(
    intro1,
    intro2,
    {
        timeline: [roundTimeline],
        repetitions: gameState.numRounds
    }
);

// 样式定义
const tableStyles = `
    .game-table {
        width: 70%;
        border-collapse: collapse;
        margin: 20px auto;
    }
    .game-table th, .game-table td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
    }
    .current-attempt {
        background-color: lightsteelblue;
    }
`;

const formStyles = `
    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 20px 0;
    }
    .radio-group label {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    input[type="radio"] {
        transform: scale(1.3);
    }
`;