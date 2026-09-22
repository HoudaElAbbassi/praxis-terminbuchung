import { prisma } from '@/lib/prisma';
import LeistungenContent from './LeistungenContent';

export default async function LeistungenPage() {
  const rows = await prisma.settings.findMany();
  const s: Record<string, string> = {};
  for (const row of rows) s[row.key] = row.value;
  return <LeistungenContent s={s} />;
}
