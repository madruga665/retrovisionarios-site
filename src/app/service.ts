export async function getAllEvents() {
  const myToken = process.env.SERVER_API_TOKEN;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events`, {
    method: "GET",
      headers: {
        'Authorization': `Bearer ${myToken}`,
        'Content-Type': 'application/json'
      }
  });

  const events = response.json();

  return events;
}