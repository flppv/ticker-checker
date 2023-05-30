type TabName = "candles" | "trades" | "stats";

interface Tab {
  name: TabName;
  label: string;
}

interface MainStats {
  type: string;
  symbol: string;
  price: number;
  change: number;
}
