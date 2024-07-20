import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const calculateTimerInfo = () => {
    const time = Date.now(); // time in milliseconds
    const timeInSeconds = Math.floor(time / 1000);
    const timerNumber = Math.floor(timeInSeconds / 30);
    const countDown = Math.floor(30 - (timeInSeconds % 30));
    return {
        timerNumber,
        countDown,
    };
};

const App = () => {
    const [data, setData] = useState(calculateTimerInfo);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const timerID = setInterval(() => {
            setData(calculateTimerInfo());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const submitAmount = async () => {
        console.log(amount);
        if (parseInt(amount, 10) == amount && amount > 0) {
            const res = await fetch(
                `http://localhost:7100/submit-amount?amount=${amount}&timerNumber=${data.timerNumber}`
            );
            const result = await res.json();
            alert(result.status + "  -->  " + result.message);
        } else {
            alert("Invalid amount !");
        }
    };

    useEffect(() => {
        if (data.countDown === 0) {
            // get winner api
        }
    }, [data]);

    return (
        <div>
            <h1>Timer Info:</h1>
            <h3>Period Number: {data.timerNumber}</h3>
            <h3>Time Left: {data.countDown}</h3>

            <input type="number" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={submitAmount}>Submit Amount</button>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
