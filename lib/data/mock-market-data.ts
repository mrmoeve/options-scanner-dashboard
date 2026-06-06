import type {
  DashboardStat,
  EarningsEvent,
  MarketMover,
  ScannerSource,
  UnusualVolumeRow,
  WatchlistItem
} from "@/lib/types/market";

export const dashboardStats: DashboardStat[] = [
  {
    title: "Active Setups",
    value: "24",
    change: "+6.2%",
    trend: "bullish",
    detail: "High-conviction names across growth, energy, and semis."
  },
  {
    title: "Gap Candidates",
    value: "11",
    change: "+3 premarket",
    trend: "bullish",
    detail: "Names with >4% move and elevated option volume."
  },
  {
    title: "Earnings This Week",
    value: "39",
    change: "7 mega cap",
    trend: "neutral",
    detail: "Calendar weighted toward tech, retail, and healthcare."
  },
  {
    title: "Risk Off Alerts",
    value: "3",
    change: "-2 vs yesterday",
    trend: "bearish",
    detail: "Volatility pockets shrinking into the open."
  }
];

export const premarketMovers: MarketMover[] = [
  { symbol: "NVDA", company: "NVIDIA", price: 1245.36, changePercent: 4.92, volume: 8400000, catalyst: "AI server demand commentary" },
  { symbol: "SMCI", company: "Super Micro Computer", price: 945.11, changePercent: 6.37, volume: 5100000, catalyst: "Sympathy with semiconductor strength" },
  { symbol: "PLTR", company: "Palantir", price: 31.48, changePercent: 3.76, volume: 3200000, catalyst: "Federal contract expansion" },
  { symbol: "TSLA", company: "Tesla", price: 198.72, changePercent: -2.64, volume: 6100000, catalyst: "EV pricing pressure headlines" },
  { symbol: "BABA", company: "Alibaba", price: 88.91, changePercent: 5.14, volume: 2700000, catalyst: "Consumer spending outlook improved" }
];

export const earningsCalendar: EarningsEvent[] = [
  { symbol: "AAPL", company: "Apple", reportTime: "AMC", estimate: 1.43, impliedMove: "4.8%", sector: "Technology" },
  { symbol: "AMD", company: "Advanced Micro Devices", reportTime: "AMC", estimate: 0.82, impliedMove: "6.2%", sector: "Semiconductors" },
  { symbol: "COST", company: "Costco", reportTime: "AMC", estimate: 3.71, impliedMove: "3.5%", sector: "Consumer Defensive" },
  { symbol: "JPM", company: "JPMorgan Chase", reportTime: "BMO", estimate: 4.18, impliedMove: "2.7%", sector: "Financials" },
  { symbol: "LULU", company: "Lululemon", reportTime: "AMC", estimate: 2.39, impliedMove: "7.1%", sector: "Consumer Cyclical" }
];

export const unusualVolumeRows: UnusualVolumeRow[] = [
  { symbol: "META", price: 531.22, relativeVolume: 2.8, avgVolume: 12100000, currentVolume: 33800000, alert: "Call sweep cluster" },
  { symbol: "AVGO", price: 1768.12, relativeVolume: 3.5, avgVolume: 2900000, currentVolume: 10150000, alert: "Trend continuation break" },
  { symbol: "COIN", price: 256.9, relativeVolume: 4.2, avgVolume: 18700000, currentVolume: 78500000, alert: "Crypto beta expansion" },
  { symbol: "CRM", price: 268.45, relativeVolume: 2.1, avgVolume: 7400000, currentVolume: 15540000, alert: "Post-earnings range reclaim" },
  { symbol: "XOM", price: 119.02, relativeVolume: 1.9, avgVolume: 17300000, currentVolume: 32800000, alert: "Energy momentum rotation" }
];

export const watchlists: WatchlistItem[] = [
  { symbol: "MSFT", thesis: "Cloud leadership with AI monetization support", setup: "Pullback into 20 EMA", lastPrice: 468.11, changePercent: 1.42, nextTrigger: "Clear 472.00 with breadth confirmation" },
  { symbol: "AMZN", thesis: "Retail margin expansion and AWS stabilization", setup: "Opening range breakout", lastPrice: 186.32, changePercent: 0.84, nextTrigger: "Hold above 185.50 after first 30 minutes" },
  { symbol: "SNOW", thesis: "Software re-rating on improving guidance", setup: "Gap and go candidate", lastPrice: 173.41, changePercent: 5.93, nextTrigger: "Sustain above VWAP on high relative volume" },
  { symbol: "UBER", thesis: "Mobility and ad momentum improving", setup: "Higher low continuation", lastPrice: 72.64, changePercent: 1.21, nextTrigger: "Reclaim 73.00 into midday consolidation" }
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
