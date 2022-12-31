const express=require('express');
const bodyparser=require('body-parser');
const request=require('request');
const https=require('https')
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
     res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const firstname=req.body.Fname
    const lastname=req.body.Mname
    const email=req.body.Bname
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname

                }
        }
     ]   
    }
    const jsondata=JSON.stringify(data);
    const url= "https://us18.api.mailchimp.com/3.0/lists/66a4c1fef0";
    const options={
        method:"POST",
        auth:"smit:1ab504417acdb3df027bf208bcf64a11-us18"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode=='200'){
            res.sendFile(__dirname+"/sucess.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsondata);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.post("/success",function(req,res){
    res.redirect("/");
})






app.listen("3000",function(){
    console.log("Server is running on port 3000");
})



// 1ab504417acdb3df027bf208bcf64a11-us18