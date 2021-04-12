const webpush = require("web-push")
const exp=require("express")
const cors=require('cors')
const app=exp();
const path=require('path')
app.use(exp.json())
app.use(cors())
const publicKey = "BH5b9AJBp31_-ADygSCFuEEy0gWaRB8gLOtv0OX3azwLS4qkBian-UCXnpwlMdmTW2e5vlY9boFfggPum9gwBS0"
const privateKey = "Q0yCH_RDsz3cnDGMV6npUzdfptGmdcS7vCrBNxnAw80"


app.use(exp.static(path.join(__dirname,'dist/ang-pwa-demo')))


app.post("/subs",(req,res)=>{
    let sub=req.body;
    console.log("reqbody is ",req.body)
    res.set('Content-Type','application/json')
    webpush.setVapidDetails(
        'mailto:rajesh.t7982@gmail.com',
        publicKey,
        privateKey
    )
    let payload=JSON.stringify({
        notification:{
            "title":"rajesh",
            "body":"this is first notification"

        }

    });
   
   setInterval(() => {
    Promise.resolve(webpush.sendNotification(sub,payload))
    .then(()=>res.json({
        message:'notification sent'
    }))
    .catch((err)=>{
        console.log("err in noti ",err)
    }
        
    )
       
   }, 5000);
})

const port=process.env.PORT||8080

app.listen(port,()=>console.log(`server on ${4000}`))