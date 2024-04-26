const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
// const nodemailer = require("nodemailer");


const app = new express();
app.use(express.json());
app.use(cors());

const client = new MongoClient('mongodb+srv://sdp:sdp@cluster0.e8408fk.mongodb.net/?retryWrites=true&w=majority')
client.connect();

const db = client.db("sdp")
const coll = db.collection("signup")
const col1 = db.collection("contactus")
const col2 = db.collection("bookingdetails")
const col3 = db.collection("counsellordetails")
const col4 = db.collection("feedbackdetails")

app.get('/home', (req, res) => {
    res.send("It is a Home Page")
})

app.post('/insert', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 5)
    console.log(req.body);
    coll.insertOne(req.body);
    res.send("Data Received");
})

app.get('/retrivesignupinfo', async (req, res) => {
    const result = await coll.find().toArray();
    res.send(result)
})

app.post('/insertcontactus', (req, res) => {
    console.log(req.body);
    col1.insertOne(req.body);
    res.send("Data Received");
})

app.get('/retrivecontactusinfo', async (req, res) => {
    const result = await col1.find().toArray();
    res.send(result);
})

app.post('/insertbooking', (req, res) => {
    console.log(req.body);
    col2.insertOne(req.body);
    res.send("Data received");
})


app.post('/insertfeedback', (req, res) => {
    console.log(req.body);
    col4.insertOne(req.body);
    res.send("Data Received");

})

app.get('/retrivefeedbackdetails', async (req, res) => {
    const result = await col4.find().toArray()
    res.send(result);
})

app.get('/retrivebookinginfo', async (req, res) => {
    const result = await col2.find().toArray();
    res.send(result);
})

app.get('/retrivebookings', async (req, res) => {
    const result = await col2.find().toArray();
    console.log(result);
    res.send(result);
})


app.post('/addcounsellor', (req, res) => {
    console.log(req.body);
    col3.insertOne(req.body);
    res.send("Data received");
})

app.get('/retrivecounsellordetails', async (req, res) => {
    const result = await col3.find().toArray();
    res.send(result);
})

app.get('/retrivecounsellors',  async (req, res) => {
    const result = await col3.find().toArray();
    console.log(result);
    res.send(result);
})

// app.delete('/deletecounsellor/:counsellorId', async (req, res) => {
//     const {counsellorId} = req.params
//     const result = await col3.deleteOne({_id: new ObjectId(counsellorId)})
//     res.json({message : 'deleted successfully'})
// })

app.get('/getFormData', (req, res) => {
    try {
      // Send the form data as a response
      res.status(200).json(col2);
    } catch (error) {
      console.error('Error fetching form data:', error);
      res.status(500).send('Internal Server Error');
    }
  });



app.post('/check', async (req, res) => {
    console.log(req.body)
    var result = await coll.findOne({"name":req.body.name})
    if(result != null){
        if(await bcrypt.compare(req.body.pw, result.password)){
            res.send(result)
        }
        else{
            res.send("fail")
        }
    }
    else{
        res.send("fail")
    }
})


// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "sivasainookala@gmail.com",
//       pass: "zqay okxe drmn ehms",
//     },
//   });
//   const mailOptions = {
//     from: "sivasainookala@gmail.com",
//     to: "cmvishnubabu08@example.com",
//     subject: "Hello from Nodemailer",
//     text: "This is a test email sent using Nodemailer.",
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email: ", error);
//     } else {
//       console.log("Email sent: ", info.response);
//     }
//   });

app.listen(8082)

console.log("Server is running");

