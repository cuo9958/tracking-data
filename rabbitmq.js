const amqp = require('amqplib');
const configs = require("./configs");
const Logger = require("./logger");

let mq = null;
amqp.connect(configs.amqp).then(function (conn) {
    return conn.createChannel().then(function (ch) {
        mq = ch;
        Logger.info("连接MQ");
    }).finally(function () {
        // conn.close();
    });
}).catch(console.warn);

module.exports = {
    /**
     * 发送消息到系统
     * @param {*} key 
     * @param {*} msg 
     */
    push(key, msg) {
        if (!mq) return;
        const ok = mq.assertQueue(q, {
            durable: true
        }).then(function () {
            mq.sendToQueue(key, Buffer.from(msg), {
                deliveryMode: true
            });
            console.log(" [x] Sent '%s'", msg);
            return mq.close();
        });
    },
    get(key, fn) {
        const ok = mq.assertQueue(key, {
            durable: true
        });
        ok = ok.then(function () {
            mq.prefetch(1);
        });
        ok = ok.then(function () {
            mq.consume(key, doWork, {
                noAck: false
            });
        });
        return ok;

        function doWork(msg) {
            var body = msg.content.toString();
            fn && fn(body);
        }
    }
}