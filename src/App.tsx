import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "./App.css";
import { TabStats } from "./TabStats";
import { TabCandles } from "./TabCandles";
import { TabTrades } from "./TabTrades";

// This is a CORS proxy. It allows us to make requests to the Bitfinex API
// without getting blocked by CORS policy.
axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/";

function App() {
  const [loading, setLoading] = useState(true);
  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");

  // Have to detect currency type, because the API returns different data for
  // trading pairs and funding currencies.
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTickers();
  }, []);

  const tabs = [
    {
      name: "stats",
      label: "Stats",
    },
    {
      name: "candles",
      label: "Candles",
    },
    {
      name: "trades",
      label: "Trades",
    },
  ];

  function renderActiveTabContent(activeTab: string) {
    switch (activeTab) {
      case "candles":
        return <TabCandles ticker={selectedTicker[0]} />;
      case "trades":
        return <TabTrades ticker={selectedTicker[0]} />;
      case "stats":
      default:
        return <TabStats data={selectedTicker} />;
    }
  }

  if (loading)
    return (
      <main className="wrapper">
        <p>Loading...</p>;
      </main>
    );

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
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={
                    "tab-button" + (activeTab === tab.name ? " active" : "")
                  }
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <pre>{renderActiveTabContent(activeTab)}</pre>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
