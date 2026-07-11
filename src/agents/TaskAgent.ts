import { supabase } from '../supabase-client';
import { TaskRecord, TaskRecordSchema } from '../types';

export class TaskAgent {
  async enqueue(task: Omit<TaskRecord, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<TaskRecord> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...task, status: 'pending' }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async dequeue(queueName: string): Promise<TaskRecord | null> {
    // Basic atomic task dequeue using select, update, and limit 1
    const { data: task, error: fetchError } = await supabase
      .from('tasks')
      .select()
      .eq('queue_name', queueName)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (fetchError) throw new Error(fetchError.message);
    if (!task) return null;

    const { data, error: updateError } = await supabase
      .from('tasks')
      .update({ status: 'running', updated_at: new Date().toISOString() })
      .eq('id', task.id)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);
    return data;
  }

  async complete(id: string): Promise<TaskRecord> {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async fail(id: string, reason: string): Promise<TaskRecord> {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: 'failed', error: reason, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
