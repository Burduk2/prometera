import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.json();
  if (request.headers.get('k') !== import.meta.env.VITE_MY_API_KEY) {
    console.error('Invalid API key');
    return json({ success: false, message: 'Invalid API key' });
  }

  const { error } = await supabase
    .from('actions')
    .insert([{ 
      action_type: data.action_type,
      email: data?.email,
      action_details: data.action_details,
      browser: data.browser,
      language: data.language,
      os: data.os,
      referrer: data.referrer,
      viewport_type: data.viewport.type,
    }]);

  if (error) {
    console.error('Supabase error:', error.message);
    return json({ success: false, message: error.message }, { status: 500 })
  }

  return json({ success: true });
}