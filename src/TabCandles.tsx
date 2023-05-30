import { useEffect, useState } from "react";
import axios from "axios";

export function TabCandles({ ticker }: { ticker: string }) {
  const [candles, setCandles] = useState([]);

  async function fetchCandles(ticker: string) {
    try {
      const response = await axios.get(`candles/trade:1m:${ticker}/hist`);
      setCandles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCandles(ticker);
  }, [ticker]);

  return <pre>{JSON.stringify(candles, null, 2)}</pre>;
}
