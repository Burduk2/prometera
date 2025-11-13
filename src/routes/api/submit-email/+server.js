import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { supabase } from '$lib/supabaseClient';
import { ref } from 'process';

export async function POST({ request }) {
  const data = await request.json();
  if (request.headers.get('k') !== import.meta.env.VITE_MY_API_KEY) {
    console.error('Invalid API key');
    return json({ success: false, message: 'Invalid API key' });
  } else if (!data.dataset_uid || !data.email || !data.user_data) {
    console.error('Missing required data');
    return json({ success: false, message: 'Missing required data' });
  }

  const { error } = await supabase
    .from('emails')
    .insert([{ 
      dataset_downloaded: data.dataset_uid, 
      email: data.email, 
      language: data.user_data.language,
      os: data.user_data.os,
      referrer: data.user_data.referrer,
      time_on_page: data.user_data.timeOnPage,
      user_data: json(data.user_data)
    }]);

  if (error) {
    console.error('Supabase error:', error.message);
    return json({ success: false, message: error.message }, { status: 500 })
  }
  return json({ success: true });
}