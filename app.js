const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");
const contacts = require("./db/contacts");

const app = express();

app.use(cors());

app.use(async(req, res, next) => {
    const { url, method } = req;
    const now = moment().format("DD.MM.YYYY_hh:mm:ss");
    const data = `\n${now} ${method} ${url}`;
    // console.log(data)
    await fs.appendFile("server.log", data )
    next()

})

app.get("/contacts", (req, res) => {
    res.json(contacts);
})

app.post("/contacts", (req, res) => {
    res.send({
        message: "contact was added"
    })
})
app.get("/", (request, response) => {
    response.send("<h2>main</h2>")
});

// app.get("/contacts", (request, response) => {
//     response.send("<h2>contacts</h2>")
// });

app.listen(3000);