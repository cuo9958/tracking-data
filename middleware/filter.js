/**
 * 过滤来源地址
 */
module.exports = function (ctx, next) {
    const userAgent = ctx.headers["user-agent"];
    ctx.brower = {
        wx: /MicroMessenger/.test(userAgent),
        app: ctx.url.indexOf("#app") > 0,
    }
    next();
}