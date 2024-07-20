const port = 7100;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

app.get("/submit-amount", (req, res) => {
    const { timerNumber } = req.query;
    const time = Date.now(); // time in milliseconds
    const timeInSeconds = Math.floor(time / 1000);
    const serverTimerNumber = Math.floor(timeInSeconds / 30);

    if (timerNumber == serverTimerNumber) {
        res.json({
            status: "success",
            message: "Amount Submitted",
        });
    } else {
        res.json({
            status: "fail",
            message: "Request Timeout ...",
        });
    }
});

app.listen(port, () => {
    console.log(`------------- App started on port ${process.env.PORT || port} ---------------`);
});
