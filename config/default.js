/**
 * 默认配置
 */
module.exports = {
    name: "tracking-http",
    /**
     * response的属性设置，参考kao-body
     */
    body: {},
    /**
     * 设置端口
     */
    port: 18096,
    /**
     * 调试模式
     */
    debug: true,
    /**
     * rabbitmq的连接地址
     */
    amqp: "amqp://admin:112233@39.105.125.190"
}