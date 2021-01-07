const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const apiproc = require('./fn')
const app = new Koa();

const router = new Router({
    prefix: "/data/api/v1"
})

app.use(bodyParser());
app.use(cors());


router.get("/" , async ctx =>{
    console.log("Basic Route for Data Encrytpion and decryption")
    ctx.body = {messsage :'Hello Data'}
})

router.post("/encryption" , async ctx =>{
    const enc = await apiproc.encrypt(ctx.request.body)
    ctx.body = enc
})

router.post("/decryption" , async ctx =>{
    const dc = await apiproc.decrypt(ctx.request.body)
    ctx.body = dc
})

router.get("/genkeypair" , async ctx =>{
    const keyapair = await apiproc.keyapair()
    ctx.body = keyapair
})

app.use(router.routes())

const api = app.listen(process.env.PORT || 3000 ,() => {
    console.log(`Server listening on ${api.address().port}`)
})

module.exports = api

