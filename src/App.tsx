import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/";

// add check for t/f type
// add loading state
// add styling
// axios base url

function App() {
  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState([]);
  const [candles, setCandles] = useState([]);
  const [trades, setTrades] = useState([]);
  const [activeTab, setActiveTab] = useState("candles");

  useEffect(() => {
    async function fetchTickers() {
      try {
        const response = await axios.get("tickers?symbols=ALL");
        setTickers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTickers();
  }, []);

  function renderActiveTabContent() {
    switch (activeTab) {
      case "candles":
        return <pre>{JSON.stringify(candles, null, 2)}</pre>;
      case "trades":
        return <pre>{JSON.stringify(trades, null, 2)}</pre>;
      case "stats":
      default:
        return <pre>{JSON.stringify(selectedTicker, null, 2)}</pre>;
    }
  }

  async function fetchCandles(ticker: string) {
    try {
      const response = await axios.get(`candles/trade:1m:${ticker}/hist`);
      setCandles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTrades(ticker: string) {
    try {
      const response = await axios.get(`trades/${ticker}/hist`);

      setTrades(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
        {selectedTicker.length === 0 && <p>Please select a ticker</p>}
        {selectedTicker.length > 0 && (
          <div>
            <h1>{selectedTicker[0]}</h1>
            <span>
              {selectedTicker[0][0] === "t"
                ? "Trading pair"
                : "Funding currency"}
            </span>
            <h2>
              {selectedTicker[7]}{" "}
              <sup
                style={{
                  color: selectedTicker[6] * 100 >= 0 ? "green" : "tomato",
                }}
              >
                {(selectedTicker[6] * 100).toFixed(2)}%
              </sup>
            </h2>
            <div>
              <button onClick={() => setActiveTab("stats")}>Stats</button>
              <button
                onClick={() => {
                  fetchCandles(selectedTicker[0]);
                  setActiveTab("candles");
                }}
              >
                Candles
              </button>
              <button
                onClick={() => {
                  fetchTrades(selectedTicker[0]);

                  setActiveTab("trades");
                }}
              >
                Trades
              </button>
            </div>
            <div className="content">{renderActiveTabContent()}</div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
