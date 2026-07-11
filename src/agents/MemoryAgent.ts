import { supabase } from '../supabase-client';
import { MemoryRecord, MemoryRecordSchema } from '../types';

export class MemoryAgent {
  async create(memory: Omit<MemoryRecord, 'created_at'>): Promise<MemoryRecord> {
    const validated = MemoryRecordSchema.omit({ created_at: true }).parse(memory);
    const { data, error } = await supabase
      .from('memories')
      .insert([validated])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async get(id: string): Promise<MemoryRecord | null> {
    const { data, error } = await supabase
      .from('memories')
      .select()
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async search(agentId: string, embedding: number[], threshold = 0.8, limit = 10): Promise<MemoryRecord[]> {
    // Calling a PostgreSQL function via RPC for vector similarity search
    const { data, error } = await supabase.rpc('match_memories', {
      query_embedding: embedding,
      match_threshold: threshold,
      match_count: limit,
      filter_agent_id: agentId
    });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('memories')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
}
