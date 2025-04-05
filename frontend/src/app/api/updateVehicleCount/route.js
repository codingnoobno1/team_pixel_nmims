import clientPromise from '@/lib/mongo';

export async function POST(req) {
  try {
    const body = await req.json();
    const { vehicleCount, timestamp } = body;

    const client = await clientPromise;
    const db = client.db('yolov8_data');
    const collection = db.collection('vehicle_counts');

    await collection.insertOne({
      vehicleCount,
      timestamp: timestamp || new Date().toISOString(),
    });

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Error', error: err.message }), {
      status: 500,
    });
  }
}
