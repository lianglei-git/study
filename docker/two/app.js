
const Koa = require('koa');


const Router = require("koa-router")


const routes = new Router()

routes.get("/login", (ctx) => {
    ctx.body = {
        code: 200,
        message: "登录策划你公公给你"
    }
})

const app = new Koa()

app.use(routes.routes())

app.listen(8000, () => {
    console.log("程序启动成功:::: 8000")
})