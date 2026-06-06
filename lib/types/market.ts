export type Trend = "bullish" | "bearish" | "neutral";
export type Sentiment = "risk-on" | "balanced" | "risk-off";
export type ReportTime = "BMO" | "AMC";

export interface ChartPoint {
  label: string;
  value: number;
}

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
  sector: string;
  price: number;
  changePercent: number;
  volume: number;
  relativeVolume: number;
  optionFlow: number;
  floatRotation: number;
  marketCap: string;
  exchange: string;
  sentiment: Sentiment;
  catalyst: string;
  priceSeries: ChartPoint[];
  volumeSeries: ChartPoint[];
}

export interface EarningsEvent {
  symbol: string;
  company: string;
  sector: string;
  reportTime: ReportTime;
  date: string;
  estimate: number;
  revenueEstimate: string;
  impliedMovePercent: number;
  setup: string;
  sentiment: Sentiment;
  priceSeries: ChartPoint[];
}

export interface UnusualVolumeRow {
  symbol: string;
  company: string;
  sector: string;
  price: number;
  changePercent: number;
  relativeVolume: number;
  avgVolume: number;
  currentVolume: number;
  optionFlow: number;
  shortInterest: number;
  momentumScore: number;
  sentiment: Sentiment;
  alert: string;
  priceSeries: ChartPoint[];
  volumeSeries: ChartPoint[];
}

export interface WatchlistItem {
  symbol: string;
  company: string;
  sector: string;
  thesis: string;
  setup: string;
  lastPrice: number;
  changePercent: number;
  conviction: number;
  riskReward: string;
  entryZone: string;
  nextTrigger: string;
  tags: string[];
  priceSeries: ChartPoint[];
}

export interface MarketSentimentIndicator {
  label: string;
  score: number;
  trend: Trend;
  summary: string;
}

export interface HeatMapCell {
  symbol: string;
  sector: string;
  changePercent: number;
  flowScore: number;
  marketCap: string;
}

export interface MarketSnapshot {
  marketStatus: string;
  marketStatusDetail: string;
  headline: string;
  summary: string;
  majorIndices: Array<{
    symbol: string;
    price: number;
    changePercent: number;
    series: ChartPoint[];
  }>;
  breadthSeries: ChartPoint[];
  volumeLeaders: ChartPoint[];
}

export interface ScannerSource<T> {
  getAll: () => Promise<T[]>;
}
