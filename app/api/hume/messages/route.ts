import { NextRequest, NextResponse } from 'next/server';
import { fetchChatMessages } from '@/hume/lib/api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get('chatId');
    if (!chatId) {
      return NextResponse.json({ error: 'chatId is required' }, { status: 400 });
    }

    const events = await fetchChatMessages(chatId);
    return NextResponse.json(events);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch chat messages' },
      { status: 500 }
    );
  }
}
