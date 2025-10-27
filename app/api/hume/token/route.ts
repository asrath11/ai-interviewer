import { NextResponse } from 'next/server';
import { fetchAccessToken } from 'hume';

export async function GET() {
  try {
    const apiKey = process.env.HUME_API_KEY;
    const secretKey = process.env.HUME_SECRET_KEY;
    const configId = process.env.HUME_CONFIG_ID;

    if (!apiKey || !secretKey || !configId) {
      return NextResponse.json(
        {
          error:
            'Missing Hume credentials. Please set HUME_API_KEY and HUME_SECRET_KEY in your environment.',
          hasApiKey: !!apiKey,
          hasSecretKey: !!secretKey,
          hasConfigId: !!configId,
        },
        { status: 500 }
      );
    }
    // 1️⃣ Get access token
    const accessToken = await fetchAccessToken({ apiKey, secretKey });
    // 3️⃣ Return both values
    return NextResponse.json({
      accessToken,
      configId,
    });
  } catch (error: any) {
    console.error(
      '❌ Failed to fetch Hume token/session:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Hume token/session' },
      { status: 500 }
    );
  }
}
