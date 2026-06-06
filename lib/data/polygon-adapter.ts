import type {
  EarningsEvent,
  MarketMover,
  ScannerSource,
  UnusualVolumeRow,
  WatchlistItem
} from "@/lib/types/market";

function notConfigured(name: string): never {
  throw new Error(`${name} Polygon.io adapter is not configured yet.`);
}

export const polygonSources: {
  premarketMovers: ScannerSource<MarketMover>;
  earningsCalendar: ScannerSource<EarningsEvent>;
  unusualVolume: ScannerSource<UnusualVolumeRow>;
  watchlists: ScannerSource<WatchlistItem>;
} = {
  premarketMovers: { async getAll() { return notConfigured("Premarket movers"); } },
  earningsCalendar: { async getAll() { return notConfigured("Earnings calendar"); } },
  unusualVolume: { async getAll() { return notConfigured("Unusual volume"); } },
  watchlists: { async getAll() { return notConfigured("Watchlists"); } }
};
