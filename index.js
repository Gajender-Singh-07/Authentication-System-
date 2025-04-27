const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const app = express();


app.use(session({
    secret: "This is my secret key",
}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/node_modules/bootstrap/dist/css/"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/js/"));

app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/Authentication").then(() => {
    console.log("Database successfully connected");
})
    .catch((err) => {
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String
});

const collection = new mongoose.model("user", userSchema);

// otp generate 
otp = otpGenerator.generate(6,{digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
// console.log(otp);

// mail: -
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "chauhangajendersingh40@gmail.com",
      pass: "yuxr bmyv zfko xrsy",
    },
  });

app.get("/", (req, res) => {
    res.render("Login");
});


app.post("/login", (req, res) => {
    // console.log(req.body);
    const { Email, Password } = req.body;

    collection.findOne({ Email })
        .then((result) => {
            // console.log(result.Password);
            if (Password == result.Password) {
                req.session.user = result.Username;
                req.session.email = result.Email;
                req.session.pass = result.Password;
                res.redirect("/home");
            }
            else {
                console.log("Password not match");
            }
        })
        .catch((err) => {
        console.log(err);
    })
})


app.get("/signUp",(req, res) => {
    res.render("SignUp");
})



app.post("/register", (req, res) => {
    collection.create(req.body).then((result) => {
        res.redirect("/");
    })
        .catch((err) => {
            console.log(err);
        });
})
app.get("/home", (req, res) => {
    if (req.session.user) {
        res.render("Home", { username: req.session.user,email:req.session.email,password:req.session.pass });
    }
    else {
        res.redirect("/");
    }
});
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.get("/emailVerify", (req, res) => {
    res.render("EmailVerification");
});
app.post("/OtpVerify", (req, res) => {
    // console.log(req.body);
    // let Email = req.body.Email;
    collection.findOne({ Email: req.body.Email })
        .then((result) => {
            async function main() {
                const info = await transporter.sendMail({
                    from: 'chauhangajendersingh40@gmail.com', // sender address
                    to: req.body.Email, // list of receivers
                    subject: "Otp for update password", // Subject line
                    html: "<h1>This is otp :-" + otp + "</h1>", // html body
                });
              
                console.log("Message sent: %s", info.messageId);
            }
              
            main().catch(console.error);
            
            // res.send("Otp send");
            res.render("OtpVerify",{id:result._id});

        })
        .catch((err) => {
            console.log(err);
        })
});

app.post("/changePassword", (req, res) => {
    // console.log(req.body);
    if (otp == req.body.otp) {
        // console.log("Otp verified");
        res.render("NewPassword",{id:req.body.id});
    }
    else {
        console.log("Otp not verified");
    }
});

app.post("/updatePassword", (req, res) => {
    console.log(req.body);
    if (req.body.Npass == req.body.Cpass) {
        // console.log("Password match");
        collection.updateOne({ _id: req.body.id }, { $set: { Password: req.body.Cpass } })
            .then(() => {
                res.redirect("/");
            })
            .catch((err) => {
            console.log(err); 
        })
    }
    else {
        console.log("Password not match");
    }
})
app.get("*",(req, res) => {
    res.render("NoPage");
})

app.listen(5000);