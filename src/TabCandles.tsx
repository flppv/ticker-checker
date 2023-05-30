import { useEffect, useState } from "react";
import axios from "axios";

export function TabCandles({ ticker }: { ticker: string }) {
  const [loading, setLoading] = useState(true);
  const [candles, setCandles] = useState([]);

  async function fetchCandles(ticker: string) {
    try {
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

  return <pre>{JSON.stringify(candles, null, 2)}</pre>;
}
