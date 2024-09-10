import { NextRequest, NextResponse } from 'next/server';

const clients = new Map();

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: 'Invalid user_id' }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      clients.set(userId, controller);
      controller.enqueue(encoder.encode('connected\n\n'));
    },
    cancel() {
      clients.delete(userId);
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { user_id, remarks } = body;

  const controller = clients.get(user_id);
  if (controller) {
    const encoder = new TextEncoder();
    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ remarks })}\n\n`));
  }

  return NextResponse.json({ message: 'Notification sent' });
}