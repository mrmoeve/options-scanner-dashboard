import { UnusualVolumeView } from "@/components/pages/unusual-volume-view";
import { marketDataRepository } from "@/lib/data";

export default async function UnusualVolumeScannerPage() {
  const rows = await marketDataRepository.unusualVolume.getAll();

  return <UnusualVolumeView rows={rows} />;
}
