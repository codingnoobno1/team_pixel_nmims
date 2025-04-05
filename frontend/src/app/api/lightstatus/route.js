// For all 3 routes using query param like ?route=1
import clientPromise from '@/lib/db';

export async function GET(req) {
  const url = new URL(req.url);
  const routeParam = url.searchParams.get('route');

  const routeKey = `route${routeParam}`; // e.g., route1

  const client = await clientPromise;
  const db = client.db('trafficAI');
  const data = await db.collection(routeKey).findOne({}, { sort: { timestamp: -1 } });

  if (!data) {
    return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
