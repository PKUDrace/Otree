let intro_text = `
    <h3>欢迎参加实验！</h3>
    <br>
    <div class="centered-list">
        <ul>
            <li>本实验由三个问卷和<span style="font-weight: bold;color: rgb(142,27,17);">两个决策游戏</span>组成。你将获得<span style="font-weight: bold;color: rgb(142,27,17);"> 15 元基础报酬</span>，并根据你在<span style="font-weight: bold;color: rgb(142,27,17);">两个游戏</span>中的实际表现获得<span style="font-weight: bold;color: rgb(142,27,17);">至多 17 元的额外报酬</span>。 </li>
            <li>请务必使用 <span style="font-weight: bold;color: rgb(142,27,17);">电脑</span> 参与实验！若现在使用了其他设备，请退出，改用电脑重新登录本实验。</li>
            <li>参与实验是完全自愿的，你可以在任何时候选择退出实验，但如果退出实验你将不会获得任何报酬。</li>
            <li>所有参与者匿名参加本实验，你的真实身份被严格保密。</li>
            <li>在整个实验过程中你不会受到任何欺骗或误导，实验进行的方式与其描述的完全一致。</li>
        </ul>
    </div>
    <br>
    <p>按<span style="font-weight: bold;color: rgb(142,27,17);"> 空格键 </span>开始实验</p>
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