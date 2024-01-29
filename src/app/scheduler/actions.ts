'use server';

import { createClient } from '@/utils/supabase/actions';
import { cookies } from 'next/headers';

export async function updateAvailability(dates: Date[]) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user?.id) {
    return {
      message: 'bad',
    };
  }
  const { data, error } = await supabase
    .from('user_availability')
    .upsert({ dates, user: userData.user.id }, { onConflict: 'user' });
  return {
    message: 'good',
    data,
    error,
  };
}
