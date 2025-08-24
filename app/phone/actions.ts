"use server";

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";

export async function fetchHumeToken() {
  try {
    const token = await getHumeAccessToken();
    return { token };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
