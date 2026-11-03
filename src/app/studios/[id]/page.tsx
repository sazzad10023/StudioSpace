import StudioDetailsClient from "@/components/studios/studio-details-client";
import { getTokenFromServer } from "@/lib/getTokenFromServer";


type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudioDetailsPage({ params }: Props) {
  const { id } = await params;
  const token = await getTokenFromServer();

  const headers: HeadersInit = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/get-studio/${id}`,
    {
      headers,
      cache: "no-store",
    }
  );

  const studio = response.ok ? await response.json() : null;

  return <StudioDetailsClient studio={studio} id={id} />;
}