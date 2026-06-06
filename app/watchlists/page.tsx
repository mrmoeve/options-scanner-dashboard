import { WatchlistsView } from "@/components/pages/watchlists-view";
import { marketDataRepository } from "@/lib/data";

export default async function WatchlistsPage() {
  const rows = await marketDataRepository.watchlists.getAll();

  return <WatchlistsView rows={rows} />;
}
