const survey2_timeline = [];

const survey2HTML = `
<div class="survey2-container" style="max-width: 800px; margin: 0 auto; padding: 20px; text-align: left;">
    <h3 style="text-align:center;">问卷2</h3>
    <p>有6枚硬币（如下表），每一枚硬币投掷出正反面的概率都是50%。每一枚硬币的正面、反面各有一个面值。你可以选择抛掷任何一枚硬币，并根据掷出的是正面还是反面获得相应的面值。</p>
    <table style="border-collapse: collapse; width: 80%; margin: 0 auto;">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th style="border-bottom: 1px solid black; border-top: 1px solid black; padding: 5px; text-align: center;">硬币</th>
                <th style="border-bottom: 1px solid black; border-top: 1px solid black; padding: 5px; text-align: center;">正面</th>
                <th style="border-bottom: 1px solid black; border-top: 1px solid black; padding: 5px; text-align: center;">反面</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">硬币1</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">28元</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">28元</td>
            </tr>
            <tr>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">硬币2</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">36元</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">24元</td>
            </tr>
            <tr>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">硬币3</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">44元</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">20元</td>
            </tr>
            <tr>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">硬币4</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">52元</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">16元</td>
            </tr>
            <tr>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">硬币5</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">60元</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">12元</td>
            </tr>
            <tr>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">硬币6</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">70元</td>
                <td style="border-bottom: 1px solid black; padding: 5px; text-align: center;">2元</td>
            </tr>
        </tbody>
    </table>
    <form id="survey2-form" style="text-align: center;">
        <div style="margin-top: 20px; text-align:center;">
            <label style="display: block; margin-bottom: 0.5rem;">你想要抛掷哪枚硬币？</label>
            <div>
                <label><input type="radio" name="chosen_scenario" value="coin1" required> 硬币1</label>
                <label><input type="radio" name="chosen_scenario" value="coin2"> 硬币2</label>
                <label><input type="radio" name="chosen_scenario" value="coin3"> 硬币3</label>
                <label><input type="radio" name="chosen_scenario" value="coin4"> 硬币4</label>
                <label><input type="radio" name="chosen_scenario" value="coin5"> 硬币5</label>
                <label><input type="radio" name="chosen_scenario" value="coin6"> 硬币6</label>
            </div>
        </div>

    
        <button id="survey2_button" type="submit" class="survey2-btn" style="margin-top: 20px;">提交</button>
        <br>
    </form>
</div>
<style>
    .survey2-btn {
        background-color: rgb(49, 108, 244);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        margin: 0 auto;
        display: block;
    }
    .survey2-container input[type="radio"] {
        margin-right: 5px;
    }
    .survey2-container div > label {
        display: inline-block; /* 使选项横向排列 */
        margin-right: 15px; /* 添加选项间距 */
    }
</style>
`;

survey2_timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: survey2HTML,
    choices: "NO_KEYS",
    trial_duration: null,
    
    on_load: function() {
        const form2 = document.getElementById('survey2-form');
        form2.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form2); 
            const chosenScenario = formData.get('chosen_scenario');
            console.log('Chosen Scenario:', chosenScenario); // 添加调试信息

            if (!chosenScenario) {
                alert('请选择一枚硬币');
                return;
            }
            jsPsych.data.addProperties({ chosen_scenario: chosenScenario });
            jsPsych.finishTrial();
        });
    }
});