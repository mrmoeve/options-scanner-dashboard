import { PremarketMoversView } from "@/components/pages/premarket-movers-view";
import { marketDataRepository } from "@/lib/data";

export default async function PremarketMoversPage() {
  const rows = await marketDataRepository.premarketMovers.getAll();

  return <PremarketMoversView rows={rows} />;
}
