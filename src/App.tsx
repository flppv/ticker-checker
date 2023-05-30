import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "./App.css";

axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/";

// add loading state
// break into components
// fix linter errors

function App() {
  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState([]);
  const [candles, setCandles] = useState([]);
  const [trades, setTrades] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");

  const mainStats = useMemo(() => {
    if (selectedTicker.length === 0)
      return {
        type: "Unknown",
        symbol: "",
        price: 0,
        change: 0,
      };

    if (selectedTicker[0][0] === "t") {
      return {
        type: "Trading pair",
        symbol: selectedTicker[0].slice(1),
        price: selectedTicker[7],
        change: selectedTicker[6] * 100,
      };
    } else if (selectedTicker[0][0] === "f") {
      return {
        type: "Funding currency",
        symbol: selectedTicker[0].slice(1),
        price: selectedTicker[10],
        change: selectedTicker[9] * 100,
      };
    }
  }, [selectedTicker]);

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

  function renderActiveTabContent(activeTab: string) {
    let dataToRender = [];

    switch (activeTab) {
      case "candles":
        dataToRender = candles;
        break;
      case "trades":
        dataToRender = trades;
        break;
      case "stats":
      default:
        dataToRender = selectedTicker;
        break;
    }

    return JSON.stringify(dataToRender, null, 2);
  }

  return (
    <main className="wrapper">
      <select
        className="select"
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
        <div className="content">
          <div className="info">
            <div className="symbol">
              <span>{mainStats?.symbol}</span>
              <span className="type">{mainStats?.type}</span>
            </div>
            <div className="price">
              ${mainStats?.price}{" "}
              <sup
                style={{
                  color: mainStats?.change >= 0 ? "green" : "tomato",
                }}
              >
                {mainStats?.change.toFixed(2)}%
              </sup>
            </div>
          </div>
          <div className="data">
            <div className="controls">
              <button
                className={
                  "tab-button" + (activeTab === "stats" ? " active" : "")
                }
                onClick={() => setActiveTab("stats")}
              >
                Stats
              </button>
              <button
                className={
                  "tab-button" + (activeTab === "candles" ? " active" : "")
                }
                onClick={() => {
                  fetchCandles(selectedTicker[0]);
                  setActiveTab("candles");
                }}
              >
                Candles
              </button>
              <button
                className={
                  "tab-button" + (activeTab === "trades" ? " active" : "")
                }
                onClick={() => {
                  fetchTrades(selectedTicker[0]);

                  setActiveTab("trades");
                }}
              >
                Trades
              </button>
            </div>

            <pre>{renderActiveTabContent(activeTab)}</pre>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
