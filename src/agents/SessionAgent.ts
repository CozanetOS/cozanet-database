import { supabase } from '../supabase-client';
import { SessionRecord, SessionRecordSchema } from '../types';

export class SessionAgent {
  async create(session: Omit<SessionRecord, 'created_at'>): Promise<SessionRecord> {
    const validated = SessionRecordSchema.omit({ created_at: true }).parse(session);
    const { data, error } = await supabase
      .from('sessions')
      .insert([validated])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getByToken(token: string): Promise<SessionRecord | null> {
    const { data, error } = await supabase
      .from('sessions')
      .select()
      .eq('token', token)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async invalidate(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
}
