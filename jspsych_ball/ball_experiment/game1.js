// game1.js
const game1_timeline = [];

// 状态管理对象
const gameState = {
    currentRound: 1,
    totalEarnings: 5,
    boxType: '',
    coinSequence: [],
    currentAttempt: 0,
    maxAttempts: 9,
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
    type: jsPsych.callFunction, // 使用插件对象
    func: () => {
        gameState.boxType = Math.random() < 0.5 ? '偏白箱' : '偏黑箱';
        gameState.coinSequence = generateCoinSequence(gameState.boxType);
        gameState.currentAttempt = 0;
    }
};

// 介绍页1
const intro1 = {
    type: jsPsychHtmlKeyboardResponse, // 使用插件对象
    stimulus: `
        <h1>游戏 1：游戏总则</h1>
        <p>本游戏有<b>两个</b>箱子...</p>
        <img src="img/concept.png" style="width:750px">
    `,
    choices: [' ']
};

// 介绍页2
const intro2 = {
    type: jsPsychHtmlKeyboardResponse, // 使用插件对象
    stimulus: `
        <h1>游戏 1：游戏介绍</h1>
        <div style="display:flex;align-items:center">
            <div style="flex:4">
                <p>你在游戏 1 中的收益为...</p>
            </div>
            <img src="img/concept3.png" style="height:350px">
        </div>
    `,
    choices: [' ']
};

// 主时间线
game1_timeline.push(
    intro1,
    intro2
);