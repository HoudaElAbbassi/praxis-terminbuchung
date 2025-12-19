import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BuchenClient from "./BuchenClient";

export const metadata: Metadata = {
  title: "Online-Terminbuchung | Praxis für Gefäßmedizin Remscheid",
  description: "Buchen Sie Ihren Termin bei der Praxis für Gefäßmedizin Remscheid schnell und einfach online.",
};

// Revalidate every 5 minutes
export const revalidate = 300;

type AppointmentType = {
  id: string;
  name: string;
  duration: number;
  description: string | null;
};

async function getAppointmentTypes(): Promise<AppointmentType[]> {
  try {
    const appointmentTypes = await prisma.appointmentType.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        duration: true,
        description: true,
      },
    });
    return appointmentTypes;
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    return [];
  }
}

export default async function BuchenPage() {
  const appointmentTypes = await getAppointmentTypes();

  return <BuchenClient initialAppointmentTypes={appointmentTypes} />;
}
