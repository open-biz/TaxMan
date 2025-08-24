import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import LandingPage from "@/components/LandingPage";

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error('Unable to get access token');
  }

  return (
    <LandingPage accessToken={accessToken} />
  );

}
