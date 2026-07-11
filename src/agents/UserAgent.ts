import { supabase } from '../supabase-client';
import { UserRecord, UserRecordSchema } from '../types';

export class UserAgent {
  async create(user: Omit<UserRecord, 'created_at'>): Promise<UserRecord> {
    const validated = UserRecordSchema.omit({ created_at: true }).parse(user);
    const { data, error } = await supabase
      .from('users')
      .insert([validated])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async get(id: string): Promise<UserRecord | null> {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, updates: Partial<Omit<UserRecord, 'id' | 'created_at'>>): Promise<UserRecord> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
}
