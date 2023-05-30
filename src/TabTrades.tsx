import { useEffect, useState } from "react";
import axios from "axios";

export function TabTrades({ ticker }: { ticker: string }) {
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]);

  async function fetchTrades(ticker: string) {
    try {
      setLoading(true);
      const response = await axios.get(`trades/${ticker}/hist`);

      setTrades(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTrades(ticker);
  }, [ticker]);

  if (loading) return <p>Loading...</p>;
  if (!trades.length) return <p>No trades data.</p>;

  if (ticker[0] === "t") {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade: any) => (
              <tr key={trade[0]}>
                <td>{new Date(trade[1]).toLocaleString()}</td>
                <td>{trade[2]}</td>
                <td>{trade[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (ticker[0] === "f") {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade: any) => (
              <tr key={trade[0]}>
                <td>{new Date(trade[1]).toLocaleString()}</td>
                <td>{trade[2]}</td>
                <td>{trade[3]}</td>
                <td>{trade[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
