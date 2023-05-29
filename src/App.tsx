import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [candles, setCandles] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/tickers?symbols=ALL"
      )
      .then((response) => {
        setTickers(response.data);
      });
  }, []);

  const fetchCandles = (ticker: string) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/candles/trade:1m:${ticker}/hist`
      )
      .then((response) => {
        setCandles(response.data);
      });
  };

  const fetchTrades = (ticker: string) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/trades/${ticker}/hist`
      )
      .then((response) => {
        setTrades(response.data);
      });
  };

  return (
    <main className="wrapper">
      <div>
        <select
          onChange={(e) =>
            setSelectedTicker(
              tickers.find((ticker) => ticker[0] === e.target.value)
            )
          }
        >
          <option>Select a Ticker</option>
          {tickers.map((ticker) => (
            <option key={ticker[0]}>{ticker[0]}</option>
          ))}
        </select>
        {!selectedTicker && <p>Please select a ticker</p>}
        {selectedTicker && (
          <div>
            <h1>{selectedTicker[0]}</h1>
            <h2>
              {selectedTicker[7]}{" "}
              <sup
                style={{
                  color: selectedTicker[6] * 100 >= 0 ? "green" : "tomato",
                }}
              >
                {selectedTicker[6] * 100}%
              </sup>
            </h2>
            <div>
              <button onClick={() => fetchCandles(selectedTicker[0])}>
                Candles
              </button>
              <button onClick={() => fetchTrades(selectedTicker[0])}>
                Trades
              </button>
            </div>
            <pre>{JSON.stringify(trades, null, 2)}</pre>
            <pre>{JSON.stringify(candles, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
