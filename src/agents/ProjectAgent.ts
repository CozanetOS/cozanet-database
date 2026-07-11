import { supabase } from '../supabase-client';
import { ProjectRecord, ProjectRecordSchema } from '../types';

export class ProjectAgent {
  async create(project: Omit<ProjectRecord, 'created_at'>): Promise<ProjectRecord> {
    const validated = ProjectRecordSchema.omit({ created_at: true }).parse(project);
    const { data, error } = await supabase
      .from('projects')
      .insert([validated])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async get(id: string): Promise<ProjectRecord | null> {
    const { data, error } = await supabase
      .from('projects')
      .select()
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async listByOwner(ownerId: string): Promise<ProjectRecord[]> {
    const { data, error } = await supabase
      .from('projects')
      .select()
      .eq('owner_id', ownerId);

    if (error) throw new Error(error.message);
    return data || [];
  }
}
