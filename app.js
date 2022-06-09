const express = require("express");
const app = express();

const request = require("request");

const bodyParser = require("body-parser");

const https = require("https");
const { json } = require("express/lib/response");

app.use(bodyParser.urlencoded({extended: true}));

// to host every static file being used 
app.use(express.static("public"));

app.get("/", (req, res)=>{

    res.sendFile(__dirname + "/signup.html");

})
app.post("/", (req, res)=>{

    const firstName = req.body.f;
    const lastName = req.body.l;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }

        ]
        
    }

    const jsonData = JSON.stringify(data);

    const url = "https://xxxx.api.mailchimp.com/3.0/lists/xxxxxxxx";

    const options = {
        method: "POST",
        auth: "abhinavkashyap061:xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }

    const request = https.request(url, options, (response)=>{

        if( response.statusCode==200 ){

            res.sendFile(__dirname + "/success.html");

        }else{

            res.sendFile(__dirname + "/failure.html");

        }

        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


})

app.post("/failure", (req, res)=>{

    res.redirect("/");
    
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log("listening on port 8080");
})