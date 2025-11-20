import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.json();
  if (request.headers.get('k') !== import.meta.env.VITE_MY_API_KEY) {
    console.error('Invalid API key');
    return json({ success: false, message: 'Invalid API key' });
  }

  const { error } = await supabase
    .from('analytics')
    .insert([{ 
      action_type: 'cold_email_refer',
      action_details: data.id,
      browser: data.browser,
      language: data.language,
      os: data.os,
      referrer: data.referrer,
      viewport_type: data.viewport_type,
    }]);

  if (error) {
    console.error('Supabase error:', error.message);
    return json({ success: false, message: error.message }, { status: 500 })
  }
  return json({ success: true });
}