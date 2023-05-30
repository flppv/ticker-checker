import { useEffect, useState } from "react";
import axios from "axios";

export function TabTrades({ ticker }: { ticker: string }) {
  const [trades, setTrades] = useState([]);

  async function fetchTrades(ticker: string) {
    try {
      const response = await axios.get(`trades/${ticker}/hist`);

      setTrades(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTrades(ticker);
  }, [ticker]);

  return <pre>{JSON.stringify(trades, null, 2)}</pre>;
}
