import type {
  DashboardStat,
  EarningsEvent,
  HeatMapCell,
  MarketMover,
  MarketSentimentIndicator,
  MarketSnapshot,
  ScannerSource,
  UnusualVolumeRow,
  WatchlistItem
} from "@/lib/types/market";

const intradayLabels = ["04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"];

function series(values: number[]) {
  return values.map((value, index) => ({
    label: intradayLabels[index] ?? `T${index + 1}`,
    value
  }));
}

export const dashboardStats: DashboardStat[] = [
  {
    title: "Scanner Signals",
    value: "47",
    change: "+12% d/d",
    trend: "bullish",
    detail: "Momentum, earnings, and options-flow models are all above their 20-day average."
  },
  {
    title: "Opening Gap Setups",
    value: "14",
    change: "+5 net",
    trend: "bullish",
    detail: "High beta tech and crypto names are driving the strongest premarket dislocations."
  },
  {
    title: "Event Risk Names",
    value: "22",
    change: "6 high IV",
    trend: "neutral",
    detail: "Most implied moves remain concentrated in semis, consumer, and software."
  },
  {
    title: "Defensive Rotation",
    value: "18%",
    change: "-3.1 pts",
    trend: "bearish",
    detail: "Capital is rotating back toward growth while utilities and staples fade on the tape."
  }
];

export const marketSnapshot: MarketSnapshot = {
  marketStatus: "Premarket Risk-On",
  marketStatusDetail: "Nasdaq leadership with positive breadth and elevated opening flow.",
  headline: "Growth leadership broadens while high-conviction earnings names absorb the open.",
  summary:
    "Semiconductors, AI infrastructure, and crypto beta are carrying the tape. Index internals remain healthy, though the strongest participation is concentrated in a handful of high-liquidity names.",
  majorIndices: [
    { symbol: "SPY", price: 534.18, changePercent: 0.74, series: series([526, 527.4, 528.8, 529.1, 530.6, 531.4, 533.1, 534.18]) },
    { symbol: "QQQ", price: 458.42, changePercent: 1.22, series: series([447.9, 449.3, 450.8, 452.2, 453.1, 455.5, 457.6, 458.42]) },
    { symbol: "IWM", price: 208.63, changePercent: 0.28, series: series([206.1, 206.5, 206.4, 206.8, 207.1, 207.4, 208.1, 208.63]) }
  ],
  breadthSeries: [
    { label: "04:00", value: 48 },
    { label: "05:00", value: 51 },
    { label: "06:00", value: 55 },
    { label: "07:00", value: 58 },
    { label: "08:00", value: 63 },
    { label: "09:00", value: 66 },
    { label: "10:00", value: 71 },
    { label: "11:00", value: 74 }
  ],
  volumeLeaders: [
    { label: "NVDA", value: 9.6 },
    { label: "TSLA", value: 7.9 },
    { label: "SMCI", value: 6.4 },
    { label: "COIN", value: 5.8 },
    { label: "PLTR", value: 4.9 },
    { label: "AMD", value: 4.2 }
  ]
};

export const marketSentiment: MarketSentimentIndicator[] = [
  {
    label: "Breadth",
    score: 74,
    trend: "bullish",
    summary: "Advancers lead decliners with improving participation into the open."
  },
  {
    label: "Flow",
    score: 81,
    trend: "bullish",
    summary: "Call premium dominates in liquid growth names and index hedges are fading."
  },
  {
    label: "Volatility",
    score: 42,
    trend: "neutral",
    summary: "Index volatility remains contained despite elevated single-name event risk."
  },
  {
    label: "Risk Appetite",
    score: 68,
    trend: "bullish",
    summary: "Traders are leaning into AI, software, and crypto beta over defensives."
  }
];

export const sectorHeatMap: HeatMapCell[] = [
  { symbol: "NVDA", sector: "Semis", changePercent: 4.92, flowScore: 95, marketCap: "3.06T" },
  { symbol: "AVGO", sector: "Semis", changePercent: 2.44, flowScore: 88, marketCap: "826B" },
  { symbol: "AMD", sector: "Semis", changePercent: 3.26, flowScore: 82, marketCap: "294B" },
  { symbol: "MSFT", sector: "Software", changePercent: 1.14, flowScore: 72, marketCap: "3.48T" },
  { symbol: "META", sector: "Internet", changePercent: 1.87, flowScore: 76, marketCap: "1.35T" },
  { symbol: "AMZN", sector: "Consumer", changePercent: 0.84, flowScore: 64, marketCap: "1.95T" },
  { symbol: "TSLA", sector: "Autos", changePercent: -2.64, flowScore: 39, marketCap: "634B" },
  { symbol: "XOM", sector: "Energy", changePercent: 0.66, flowScore: 55, marketCap: "510B" },
  { symbol: "JPM", sector: "Financials", changePercent: -0.42, flowScore: 44, marketCap: "603B" },
  { symbol: "UNH", sector: "Healthcare", changePercent: -1.12, flowScore: 33, marketCap: "456B" },
  { symbol: "COIN", sector: "Crypto", changePercent: 5.38, flowScore: 91, marketCap: "72B" },
  { symbol: "PLTR", sector: "Software", changePercent: 3.76, flowScore: 84, marketCap: "69B" }
];

export const premarketMovers: MarketMover[] = [
  {
    symbol: "NVDA",
    company: "NVIDIA",
    sector: "Semiconductors",
    price: 1245.36,
    changePercent: 4.92,
    volume: 9600000,
    relativeVolume: 3.8,
    optionFlow: 112000000,
    floatRotation: 0.9,
    marketCap: "3.06T",
    exchange: "NASDAQ",
    sentiment: "risk-on",
    catalyst: "AI server demand commentary and hyperscaler capex follow-through.",
    priceSeries: series([1194, 1199, 1208, 1217, 1225, 1233, 1240, 1245]),
    volumeSeries: series([1.2, 2.1, 3.3, 4.4, 5.7, 7.4, 8.5, 9.6])
  },
  {
    symbol: "SMCI",
    company: "Super Micro Computer",
    sector: "Hardware",
    price: 945.11,
    changePercent: 6.37,
    volume: 6400000,
    relativeVolume: 4.6,
    optionFlow: 36500000,
    floatRotation: 1.4,
    marketCap: "56B",
    exchange: "NASDAQ",
    sentiment: "risk-on",
    catalyst: "Sympathy momentum alongside server infrastructure and AI basket strength.",
    priceSeries: series([880, 889, 895, 904, 915, 927, 938, 945]),
    volumeSeries: series([0.8, 1.4, 2.0, 2.9, 3.8, 4.9, 5.8, 6.4])
  },
  {
    symbol: "PLTR",
    company: "Palantir",
    sector: "Software",
    price: 31.48,
    changePercent: 3.76,
    volume: 4900000,
    relativeVolume: 2.7,
    optionFlow: 18400000,
    floatRotation: 0.6,
    marketCap: "69B",
    exchange: "NASDAQ",
    sentiment: "risk-on",
    catalyst: "Federal contract expansion and improving enterprise sentiment.",
    priceSeries: series([30.1, 30.3, 30.5, 30.7, 30.9, 31.1, 31.3, 31.48]),
    volumeSeries: series([0.7, 1.2, 1.9, 2.4, 3.0, 3.8, 4.3, 4.9])
  },
  {
    symbol: "TSLA",
    company: "Tesla",
    sector: "Autos",
    price: 198.72,
    changePercent: -2.64,
    volume: 7900000,
    relativeVolume: 2.9,
    optionFlow: 55200000,
    floatRotation: 0.8,
    marketCap: "634B",
    exchange: "NASDAQ",
    sentiment: "risk-off",
    catalyst: "EV pricing pressure headlines and mixed margin expectations.",
    priceSeries: series([205.4, 204.6, 203.8, 202.9, 201.3, 200.7, 199.5, 198.72]),
    volumeSeries: series([1.1, 2.0, 2.9, 3.8, 4.9, 6.1, 7.0, 7.9])
  },
  {
    symbol: "BABA",
    company: "Alibaba",
    sector: "E-Commerce",
    price: 88.91,
    changePercent: 5.14,
    volume: 3500000,
    relativeVolume: 3.1,
    optionFlow: 12600000,
    floatRotation: 0.5,
    marketCap: "212B",
    exchange: "NYSE",
    sentiment: "risk-on",
    catalyst: "Improved consumer spending guidance and China internet strength.",
    priceSeries: series([84.2, 84.8, 85.1, 85.7, 86.6, 87.2, 88.1, 88.91]),
    volumeSeries: series([0.5, 0.8, 1.2, 1.9, 2.4, 2.7, 3.1, 3.5])
  },
  {
    symbol: "COIN",
    company: "Coinbase",
    sector: "Crypto",
    price: 256.9,
    changePercent: 5.38,
    volume: 5800000,
    relativeVolume: 4.2,
    optionFlow: 27400000,
    floatRotation: 1.1,
    marketCap: "72B",
    exchange: "NASDAQ",
    sentiment: "risk-on",
    catalyst: "Bitcoin strength and fresh retail participation in crypto beta.",
    priceSeries: series([241.3, 242.5, 244.1, 246.9, 249.6, 252.7, 255.2, 256.9]),
    volumeSeries: series([0.9, 1.5, 2.2, 3.0, 3.9, 4.7, 5.3, 5.8])
  },
  {
    symbol: "JPM",
    company: "JPMorgan Chase",
    sector: "Financials",
    price: 201.14,
    changePercent: -0.58,
    volume: 2300000,
    relativeVolume: 1.3,
    optionFlow: 9100000,
    floatRotation: 0.2,
    marketCap: "603B",
    exchange: "NYSE",
    sentiment: "balanced",
    catalyst: "Rate path uncertainty capping upside into financials.",
    priceSeries: series([202.6, 202.4, 202.1, 201.9, 201.8, 201.6, 201.4, 201.14]),
    volumeSeries: series([0.3, 0.6, 0.9, 1.1, 1.4, 1.8, 2.0, 2.3])
  },
  {
    symbol: "LLY",
    company: "Eli Lilly",
    sector: "Healthcare",
    price: 846.77,
    changePercent: 1.08,
    volume: 1700000,
    relativeVolume: 1.8,
    optionFlow: 8400000,
    floatRotation: 0.1,
    marketCap: "806B",
    exchange: "NYSE",
    sentiment: "balanced",
    catalyst: "GLP-1 demand remains strong with buyers defending pullbacks.",
    priceSeries: series([833.5, 835.8, 837.1, 839.4, 841.0, 843.3, 845.0, 846.77]),
    volumeSeries: series([0.2, 0.4, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7])
  }
];

export const earningsCalendar: EarningsEvent[] = [
  {
    symbol: "AAPL",
    company: "Apple",
    sector: "Technology",
    reportTime: "AMC",
    date: "Mon 4:05 PM ET",
    estimate: 1.43,
    revenueEstimate: "$89.7B",
    impliedMovePercent: 4.8,
    setup: "Volatility compression into event with services margin focus.",
    sentiment: "balanced",
    priceSeries: series([209, 210, 210.4, 211.2, 212.1, 213.0, 213.8, 214.2])
  },
  {
    symbol: "AMD",
    company: "Advanced Micro Devices",
    sector: "Semiconductors",
    reportTime: "AMC",
    date: "Tue 4:10 PM ET",
    estimate: 0.82,
    revenueEstimate: "$5.73B",
    impliedMovePercent: 6.2,
    setup: "Positioning for AI commentary and data center acceleration.",
    sentiment: "risk-on",
    priceSeries: series([160, 161.4, 162.3, 163.9, 165.6, 166.4, 167.1, 168.2])
  },
  {
    symbol: "COST",
    company: "Costco",
    sector: "Consumer Defensive",
    reportTime: "AMC",
    date: "Wed 4:10 PM ET",
    estimate: 3.71,
    revenueEstimate: "$59.2B",
    impliedMovePercent: 3.5,
    setup: "Low-vol steady compounder with membership and margin focus.",
    sentiment: "balanced",
    priceSeries: series([811, 811.8, 812.2, 814.5, 816.1, 817.0, 817.9, 819.2])
  },
  {
    symbol: "JPM",
    company: "JPMorgan Chase",
    sector: "Financials",
    reportTime: "BMO",
    date: "Thu 8:30 AM ET",
    estimate: 4.18,
    revenueEstimate: "$42.4B",
    impliedMovePercent: 2.7,
    setup: "Muted reaction expected unless net interest outlook shifts materially.",
    sentiment: "balanced",
    priceSeries: series([199.7, 200.2, 200.1, 200.6, 200.8, 201.0, 201.2, 201.4])
  },
  {
    symbol: "LULU",
    company: "Lululemon",
    sector: "Consumer Cyclical",
    reportTime: "AMC",
    date: "Thu 4:05 PM ET",
    estimate: 2.39,
    revenueEstimate: "$2.22B",
    impliedMovePercent: 7.1,
    setup: "Higher event premium as buy-side debates inventory normalization.",
    sentiment: "risk-off",
    priceSeries: series([319, 317.4, 316.2, 315.9, 316.7, 317.0, 318.2, 319.8])
  },
  {
    symbol: "DOCU",
    company: "DocuSign",
    sector: "Software",
    reportTime: "AMC",
    date: "Fri 4:05 PM ET",
    estimate: 0.82,
    revenueEstimate: "$711M",
    impliedMovePercent: 8.4,
    setup: "Lean short base and improving retention create two-sided volatility.",
    sentiment: "risk-on",
    priceSeries: series([57.1, 57.4, 58.0, 58.7, 59.1, 59.8, 60.2, 60.6])
  }
];

export const unusualVolumeRows: UnusualVolumeRow[] = [
  {
    symbol: "META",
    company: "Meta Platforms",
    sector: "Internet",
    price: 531.22,
    changePercent: 2.14,
    relativeVolume: 2.8,
    avgVolume: 12100000,
    currentVolume: 33800000,
    optionFlow: 44200000,
    shortInterest: 1.3,
    momentumScore: 84,
    sentiment: "risk-on",
    alert: "Call sweep cluster expanding through the 530 strike wall.",
    priceSeries: series([520.2, 521.9, 523.5, 525.1, 526.7, 528.9, 530.1, 531.22]),
    volumeSeries: series([4.1, 8.2, 12.8, 17.9, 22.4, 27.2, 31.1, 33.8])
  },
  {
    symbol: "AVGO",
    company: "Broadcom",
    sector: "Semiconductors",
    price: 1768.12,
    changePercent: 1.76,
    relativeVolume: 3.5,
    avgVolume: 2900000,
    currentVolume: 10150000,
    optionFlow: 35700000,
    shortInterest: 0.9,
    momentumScore: 88,
    sentiment: "risk-on",
    alert: "Trend continuation above prior high with persistent institutional prints.",
    priceSeries: series([1738, 1742, 1747, 1751, 1758, 1762, 1765, 1768]),
    volumeSeries: series([1.0, 1.9, 3.1, 4.4, 6.0, 7.5, 8.9, 10.1])
  },
  {
    symbol: "COIN",
    company: "Coinbase",
    sector: "Crypto",
    price: 256.9,
    changePercent: 5.38,
    relativeVolume: 4.2,
    avgVolume: 18700000,
    currentVolume: 78500000,
    optionFlow: 27400000,
    shortInterest: 6.8,
    momentumScore: 92,
    sentiment: "risk-on",
    alert: "Crypto beta expansion with buyers pressing high delta calls.",
    priceSeries: series([241.3, 242.5, 244.1, 246.9, 249.6, 252.7, 255.2, 256.9]),
    volumeSeries: series([8.2, 15.4, 24.6, 36.1, 49.8, 61.4, 70.2, 78.5])
  },
  {
    symbol: "CRM",
    company: "Salesforce",
    sector: "Software",
    price: 268.45,
    changePercent: 1.08,
    relativeVolume: 2.1,
    avgVolume: 7400000,
    currentVolume: 15540000,
    optionFlow: 12100000,
    shortInterest: 1.1,
    momentumScore: 69,
    sentiment: "balanced",
    alert: "Post-earnings range reclaim with improving participation at VWAP.",
    priceSeries: series([263.0, 263.8, 264.4, 265.7, 266.9, 267.6, 268.1, 268.45]),
    volumeSeries: series([1.1, 2.2, 4.0, 6.2, 8.8, 11.7, 13.6, 15.5])
  },
  {
    symbol: "XOM",
    company: "Exxon Mobil",
    sector: "Energy",
    price: 119.02,
    changePercent: 0.66,
    relativeVolume: 1.9,
    avgVolume: 17300000,
    currentVolume: 32800000,
    optionFlow: 9300000,
    shortInterest: 0.7,
    momentumScore: 58,
    sentiment: "balanced",
    alert: "Energy rotation picking up as crude stabilizes near session highs.",
    priceSeries: series([117.4, 117.6, 117.8, 118.1, 118.4, 118.6, 118.8, 119.02]),
    volumeSeries: series([3.0, 6.1, 10.2, 14.9, 19.7, 24.8, 29.1, 32.8])
  },
  {
    symbol: "MARA",
    company: "Marathon Digital",
    sector: "Crypto",
    price: 25.84,
    changePercent: 7.42,
    relativeVolume: 5.1,
    avgVolume: 43200000,
    currentVolume: 120800000,
    optionFlow: 18800000,
    shortInterest: 15.6,
    momentumScore: 90,
    sentiment: "risk-on",
    alert: "High short-interest squeeze developing alongside BTC breakout.",
    priceSeries: series([22.6, 23.1, 23.8, 24.2, 24.8, 25.1, 25.5, 25.84]),
    volumeSeries: series([12.0, 24.8, 39.7, 58.5, 79.1, 96.4, 108.2, 120.8])
  }
];

export const watchlists: WatchlistItem[] = [
  {
    symbol: "MSFT",
    company: "Microsoft",
    sector: "Software",
    thesis: "AI monetization and cloud durability continue to justify premium multiples.",
    setup: "Pullback into rising 20 EMA with trend intact.",
    lastPrice: 468.11,
    changePercent: 1.42,
    conviction: 88,
    riskReward: "2.9 : 1",
    entryZone: "$462.00 - $465.00",
    nextTrigger: "Clear 472.00 with breadth confirmation and stable QQQ leadership.",
    tags: ["AI", "Large Cap", "Trend"],
    priceSeries: series([458.4, 459.1, 460.8, 462.5, 463.9, 465.2, 466.7, 468.11])
  },
  {
    symbol: "AMZN",
    company: "Amazon",
    sector: "Consumer",
    thesis: "Retail margin expansion and AWS stabilization support continued re-rating.",
    setup: "Opening range breakout above prior supply.",
    lastPrice: 186.32,
    changePercent: 0.84,
    conviction: 78,
    riskReward: "2.4 : 1",
    entryZone: "$184.80 - $185.60",
    nextTrigger: "Hold above 185.50 after the first 30 minutes with improving tape.",
    tags: ["Cloud", "Retail", "Breakout"],
    priceSeries: series([182.4, 182.9, 183.5, 184.0, 184.6, 185.1, 185.7, 186.32])
  },
  {
    symbol: "SNOW",
    company: "Snowflake",
    sector: "Software",
    thesis: "Narrative shift from slowdown fears to improving consumption trends.",
    setup: "Gap-and-go candidate if volume stays above 2.5x.",
    lastPrice: 173.41,
    changePercent: 5.93,
    conviction: 84,
    riskReward: "3.3 : 1",
    entryZone: "$170.50 - $171.40",
    nextTrigger: "Sustain above VWAP after the opening drive on elevated relative volume.",
    tags: ["Software", "Gap", "Momentum"],
    priceSeries: series([163.1, 164.2, 165.0, 166.8, 168.9, 170.4, 171.8, 173.41])
  },
  {
    symbol: "UBER",
    company: "Uber",
    sector: "Internet",
    thesis: "Mobility and advertising momentum remain underestimated by the market.",
    setup: "Higher-low continuation after trend reset.",
    lastPrice: 72.64,
    changePercent: 1.21,
    conviction: 72,
    riskReward: "2.1 : 1",
    entryZone: "$71.80 - $72.10",
    nextTrigger: "Reclaim 73.00 into midday consolidation with ride-share peers confirming.",
    tags: ["Consumer", "Trend", "Continuation"],
    priceSeries: series([70.2, 70.4, 70.8, 71.2, 71.7, 72.0, 72.3, 72.64])
  },
  {
    symbol: "CRWD",
    company: "CrowdStrike",
    sector: "Cybersecurity",
    thesis: "Security budgets remain resilient and leadership names are reclaiming momentum.",
    setup: "Tight flag under all-time-high neighborhood.",
    lastPrice: 384.52,
    changePercent: 2.04,
    conviction: 81,
    riskReward: "2.7 : 1",
    entryZone: "$379.50 - $381.00",
    nextTrigger: "Break and hold above 386.00 with volume expansion.",
    tags: ["Security", "Breakout", "Growth"],
    priceSeries: series([372.1, 373.4, 375.2, 377.0, 378.9, 380.8, 382.6, 384.52])
  }
];

function createSource<T>(data: T[]): ScannerSource<T> {
  return {
    async getAll() {
      return data;
    }
  };
}

export const mockDataSources = {
  premarketMovers: createSource(premarketMovers),
  earningsCalendar: createSource(earningsCalendar),
  unusualVolume: createSource(unusualVolumeRows),
  watchlists: createSource(watchlists)
};
