export async function getAllEvents() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const events = response.json();

  return events;
}