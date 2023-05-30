export function TabStats({ data }: { data: any[] }) {
  const tradingPairStats = [
    "Bid",
    "Bid Size",
    "Ask",
    "Ask Size",
    "Daily Change",
    "Daily Change Relative",
    "Last Price",
    "Volume",
    "High",
    "Low",
  ];

  const fundingPairStats = [
    "FRR",
    "BID",
    "BID_PERIOD",
    "BID_SIZE",
    "ASK",
    "ASK_PERIOD",
    "ASK_SIZE",
    "DAILY_CHANGE",
    "DAILY_CHANGE_RELATIVE",
    "LAST_PRICE",
    "VOLUME",
    "HIGH",
    "LOW",
    "",
    "",
    "FRR_AMOUNT_AVAILABLE",
  ];

  if (data[0][0] === "t") {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Trading Pair Stats</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {tradingPairStats.map((stat: any, index: any) => (
              <tr key={index}>
                <td>{stat}</td>
                <td>{data[index + 1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (data[0][0] === "f") {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Funding Pair Stats</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {fundingPairStats.map((stat: any, index: any) => (
              <tr key={index}>
                <td>{stat}</td>
                <td>{data[index + 1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
