import { useEffect, useState } from "react";
import axios from "axios";

export function TabCandles({ ticker }: { ticker: string }) {
  const [loading, setLoading] = useState(true);
  const [candles, setCandles] = useState([]);

  async function fetchCandles(ticker: string) {
    try {
      setLoading(true);
      const response = await axios.get(`candles/trade:1m:${ticker}/hist`);

      setCandles(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCandles(ticker);
  }, [ticker]);

  if (loading) return <p>Loading...</p>;
  if (!candles.length) return <p>No candles data.</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Open</th>
            <th>Close</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {candles.map((candle: any) => (
            <tr key={candle[0]}>
              <td>{new Date(candle[0]).toLocaleString()}</td>
              <td>{candle[1]}</td>
              <td>{candle[2]}</td>
              <td>{candle[3]}</td>
              <td>{candle[4]}</td>
              <td>{candle[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
