import { supabase } from '../supabase-client';
import { KnowledgeRecord, KnowledgeRecordSchema } from '../types';

export class KnowledgeAgent {
  async create(entry: Omit<KnowledgeRecord, 'created_at'>): Promise<KnowledgeRecord> {
    const validated = KnowledgeRecordSchema.omit({ created_at: true }).parse(entry);
    const { data, error } = await supabase
      .from('knowledge')
      .insert([validated])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async searchByTags(tags: string[]): Promise<KnowledgeRecord[]> {
    const { data, error } = await supabase
      .from('knowledge')
      .select()
      .contains('tags', tags);

    if (error) throw new Error(error.message);
    return data || [];
  }
}
