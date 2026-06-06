export type Trend = "bullish" | "bearish" | "neutral";

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: Trend;
  detail: string;
}

export interface MarketMover {
  symbol: string;
  company: string;
  price: number;
  changePercent: number;
  volume: number;
  catalyst: string;
}

export interface EarningsEvent {
  symbol: string;
  company: string;
  reportTime: "BMO" | "AMC";
  estimate: number;
  impliedMove: string;
  sector: string;
}

export interface UnusualVolumeRow {
  symbol: string;
  price: number;
  relativeVolume: number;
  avgVolume: number;
  currentVolume: number;
  alert: string;
}

export interface WatchlistItem {
  symbol: string;
  thesis: string;
  setup: string;
  lastPrice: number;
  changePercent: number;
  nextTrigger: string;
}

export interface ScannerSource<T> {
  getAll: () => Promise<T[]>;
}
