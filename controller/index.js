const Router = require("koa-router");
const MQ = require("../rabbitmq");

const router = new Router();

router.get('/', async (ctx, next) => {
    const params = ctx.request.query;

    MQ.push("test", "收到消息");

    ctx.body = "ok"
});

module.exports = router;