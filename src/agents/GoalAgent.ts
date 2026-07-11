import { supabase } from '../supabase-client';
import { GoalRecord, GoalRecordSchema } from '../types';

export class GoalAgent {
  async create(goal: Omit<GoalRecord, 'created_at'>): Promise<GoalRecord> {
    const validated = GoalRecordSchema.omit({ created_at: true }).parse(goal);
    const { data, error } = await supabase
      .from('goals')
      .insert([validated])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateProgress(id: string, progress: number): Promise<GoalRecord> {
    const status = progress >= 100 ? 'completed' : 'in_progress';
    const { data, error } = await supabase
      .from('goals')
      .update({ progress, status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async listByUser(userId: string): Promise<GoalRecord[]> {
    const { data, error } = await supabase
      .from('goals')
      .select()
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data || [];
  }
}
