const MQ = require("../rabbitmq");

/**
 * 监听收到消息的方法
 */
MQ.get("test", function (msg) {
    console.log(msg);
})