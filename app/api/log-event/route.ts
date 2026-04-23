import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { event_type } = await request.json();

  if (!event_type || typeof event_type !== 'string') {
    return Response.json({ error: 'Missing event_type.' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase
    .from('events')
    .insert({ event_type, user_id: null });

  if (error) {
    console.error('Event log error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
