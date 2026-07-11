import { supabase } from '../supabase-client';
import { WorkflowRecord, WorkflowRecordSchema } from '../types';

export class WorkflowAgent {
  async create(workflow: Omit<WorkflowRecord, 'created_at'>): Promise<WorkflowRecord> {
    const validated = WorkflowRecordSchema.omit({ created_at: true }).parse(workflow);
    const { data, error } = await supabase
      .from('workflows')
      .insert([validated])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async get(id: string): Promise<WorkflowRecord | null> {
    const { data, error } = await supabase
      .from('workflows')
      .select()
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async listByProject(projectId: string): Promise<WorkflowRecord[]> {
    const { data, error } = await supabase
      .from('workflows')
      .select()
      .eq('project_id', projectId);

    if (error) throw new Error(error.message);
    return data || [];
  }
}
