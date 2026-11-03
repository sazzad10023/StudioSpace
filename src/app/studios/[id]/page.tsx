import StudioDetailsClient from "@/components/studios/studio-details-client";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudioDetailsPage({ params }: Props) {
  const { id } = await params;
  const token = await getTokenFromServer();
  const response = await fetch(
    `http://localhost:8000/get-studio/${id}`,
    {
        headers: {
            authorization: `Bearer ${token}`,
        },
      cache: "no-store",
    }
  );

  const studio = response.ok ? await response.json() : null;

  return <StudioDetailsClient studio={studio} id={id} />;
}