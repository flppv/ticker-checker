import { useEffect, useState } from "react";
import axios from "axios";

export function TabTrades({ ticker }: { ticker: string }) {
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]);

  async function fetchTrades(ticker: string) {
    try {
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

  return <pre>{JSON.stringify(trades, null, 2)}</pre>;
}
