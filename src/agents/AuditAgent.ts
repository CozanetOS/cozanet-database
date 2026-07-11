import { supabase } from '../supabase-client';
import { AuditRecord, AuditRecordSchema } from '../types';

export class AuditAgent {
  async write(log: Omit<AuditRecord, 'id' | 'created_at'>): Promise<AuditRecord> {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert([log])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
