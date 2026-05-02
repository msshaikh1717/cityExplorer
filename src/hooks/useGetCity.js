const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export async function getCity(lat, lng) {
  try {
    const res = await fetch(
      `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch city data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getCity:", error);
    throw error;
  }
}
