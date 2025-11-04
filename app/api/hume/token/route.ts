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
  } catch (error: unknown) {
    console.error('❌ Failed to fetch Hume token/session:');
    let errorMessage = 'Failed to fetch Hume token/session';
    
    if (error instanceof Error) {
      console.error(error.message);
      errorMessage = error.message;
      
      // Check if it's an Axios error
      interface AxiosError extends Error {
        response?: {
          data?: unknown;
        };
      }
      
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        console.error('Error details:', axiosError.response.data);
      }
    } else if (typeof error === 'string') {
      console.error(error);
      errorMessage = error;
    } else {
      console.error('An unknown error occurred');
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
