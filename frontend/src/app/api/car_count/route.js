import clientPromise from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const traffic = await db.collection('camera_data').findOne({}, { sort: { _id: -1 } });

    return NextResponse.json({
      count: traffic?.vehicleCount || 0,
      time: traffic?.timestamp || new Date().toISOString(),
    });
  } catch (error) {
    console.error('🚨 API Error:', error);
    return NextResponse.json({
      count: 0,
      error: error?.message || 'Failed to fetch data',
    }, { status: 500 });
  }
}
