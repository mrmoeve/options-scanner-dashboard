import { EarningsCalendarView } from "@/components/pages/earnings-calendar-view";
import { marketDataRepository } from "@/lib/data";

export default async function EarningsCalendarPage() {
  const rows = await marketDataRepository.earningsCalendar.getAll();

  return <EarningsCalendarView rows={rows} />;
}
