let intro_text = `
    <h3>欢迎参加实验！</h3>
    <br>
    <div class="centered-list">
        <ul>
            <li>本实验由三个调查问卷和<strong>两个决策游戏</strong>组成。你的<b>报酬</b>将由你在<b>两个游戏中的实际表现</b>决定。</li>
            <li>请务必使用<b>电脑</b>参与实验！若现在使用了其他设备，请退出，改用电脑重新登录本实验。</li>
            <li>参与实验是完全自愿的，你可以在任何时候选择退出实验，但如果退出实验你将不会获得任何报酬。</li>
            <li>所有参与者匿名参加本实验，你的真实身份被严格保密。</li>
            <li>在整个实验过程中你不会受到任何欺骗或误导，实验进行的方式与其描述的完全一致。</li>
        </ul>
    </div>
    <br>
    <p>按空格键开始实验</p>
    `;

let intro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: intro_text,
    choices: [' '],
    data: {
        plugin: 'intro'
    }
};

let intro_timeline = [intro];