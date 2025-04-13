//洗牌算法
Array.prototype.shuffle = function () {
    let input = this;
    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input
}
 
//判空
function isEmpty(obj) {
    return (typeof obj === "undefined" || obj === null || obj === "")
}

function generateUserId() {
    // 生成三位随机数 (100-999)
    const randomPart = Math.floor(Math.random() * 900 + 100);
    
    // 获取当前日期时间
    const now = new Date();
    
    // 格式化日期部分: 年月日时分秒毫秒
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    // 组合日期部分
    const datePart = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    
    // 组合最终的用户ID
    const userId = `${randomPart}${datePart}`;
    
    console.log(`生成用户ID: ${userId}`);
    return userId;
}

let game2List = [] //用于游戏2参数
let game2Obj = {} //用于游戏2参数
let uIndex = -1 //用于被试序号
let uId = generateUserId()
let gId = ''


//后被试插入
function afterInsert(uId) {
    // 构造数据对象
    const dataToSend = {
        uId:uId
    };
    
    console.log("准备发送数据:", dataToSend);
    
    // 使用 fetch API 并添加适当的 CORS 设置
    fetch("https://decisionno1.netlify.app/.netlify/functions/AfterInsert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 如果需要，可以添加其他头信息
            // "Authorization": "Bearer your-token" // 如果你的 API 需要授权
        },
        // credentials: "include", // 如果需要发送 cookies
        mode: "cors", // 明确指定使用 CORS 模式
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        // 首先检查响应状态
        if (!response.ok) {
            // 如果响应不是 2xx，抛出错误
            return response.text().then(text => {
                throw new Error(`服务器返回错误 (${response.status}): ${text || response.statusText}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("成功接收响应:", data);
        if (data.success) {
            console.log("数据上传成功:", data);
            afterFind()
            // 成功后的操作，例如显示成功消息或跳转页面
        } else {
            console.error("服务器返回失败状态:", data);
            alert(`数据上传失败！${data.error || '请联系主试处理'}`);
        }
    })
    .catch(error => {
        console.error("请求过程中发生错误:", error);
        
        // 检查是否为 CORS 错误
        if (error.message.includes('NetworkError') || 
            error.message.includes('Failed to fetch') ||
            error.message.includes('CORS')) {
            alert('跨域请求错误！这可能是由于服务器未正确配置 CORS。请联系管理员解决此问题。');
        } else {
            alert(`数据上传失败！错误信息: ${error.message}`);
        }
    });
}

//前被试查询
function beforeFind() {
    console.log("准备查询数据");
    // 使用 fetch API 并添加适当的 CORS 设置
    fetch("https://decisionno1.netlify.app/.netlify/functions/BeforeFind", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // 如果需要，可以添加其他头信息
            // "Authorization": "Bearer your-token" // 如果你的 API 需要授权
        },
        mode: "cors", // 明确指定使用 CORS 模式
    })
    .then(response => {
        // 首先检查响应状态
        if (!response.ok) {
            // 如果响应不是 2xx，抛出错误
            return response.text().then(text => {
                throw new Error(`服务器返回错误 (${response.status}): ${text || response.statusText}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("成功接收响应:", data);
        if (data.success) {
            game2List = data.data
            console.log("前数据查询成功:", data.data);
        } else {
            console.error("服务器返回失败状态:", data);
            alert(`数据查询失败！${data.error || '请联系主试处理'}`);
        }
    })
    .catch(error => {
        console.error("请求过程中发生错误:", error);
        
        // 检查是否为 CORS 错误
        if (error.message.includes('NetworkError') || 
            error.message.includes('Failed to fetch') ||
            error.message.includes('CORS')) {
            alert('跨域请求错误！这可能是由于服务器未正确配置 CORS。请联系管理员解决此问题。');
        } else {
            alert(`数据查询失败！错误信息: ${error.message}`);
        }
    });
}

//后被试查询
function afterFind() {
    console.log("准备查询数据");
    // 使用 fetch API 并添加适当的 CORS 设置
    fetch("https://decisionno1.netlify.app/.netlify/functions/AfterFind", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // 如果需要，可以添加其他头信息
            // "Authorization": "Bearer your-token" // 如果你的 API 需要授权
        },
        mode: "cors", // 明确指定使用 CORS 模式
    })
    .then(response => {
        // 首先检查响应状态
        if (!response.ok) {
            // 如果响应不是 2xx，抛出错误
            return response.text().then(text => {
                throw new Error(`服务器返回错误 (${response.status}): ${text || response.statusText}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("成功接收响应:", data);
        if (data.success) {
            game2Obj =  game2List[data.data.length - 1].uData
            gId = game2List[data.data.length - 1].gId
            console.log("后数据查询成功:", data.data);
            console.log("本次序号为",data.data.length);
            console.log("本次参数是",game2Obj);
            console.log("本次组号为",gId);
        } else {
            console.error("服务器返回失败状态:", data);
            alert(`数据查询失败！${data.error || '请联系主试处理'}`);
        }
    })
    .catch(error => {
        console.error("请求过程中发生错误:", error);
        
        // 检查是否为 CORS 错误
        if (error.message.includes('NetworkError') || 
            error.message.includes('Failed to fetch') ||
            error.message.includes('CORS')) {
            alert('跨域请求错误！这可能是由于服务器未正确配置 CORS。请联系管理员解决此问题。');
        } else {
            alert(`数据查询失败！错误信息: ${error.message}`);
        }
    });
}


