import { supabase } from '../supabase-client';
import { MetricRecord } from '../types';

export class AnalyticsAgent {
  async recordMetric(metric: Omit<MetricRecord, 'id' | 'created_at'>): Promise<MetricRecord> {
    const { data, error } = await supabase
      .from('metrics')
      .insert([metric])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getAggregates(name: string, intervalHours = 24): Promise<{ avg: number; min: number; max: number; count: number }> {
    const since = new Date(Date.now() - intervalHours * 60 * 60 * 1000).toISOString();
    
    const { data, error } = await supabase
      .from('metrics')
      .select('value')
      .eq('name', name)
      .gte('created_at', since);

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) {
      return { avg: 0, min: 0, max: 0, count: 0 };
    }

    const values = data.map(r => r.value);
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      avg: sum / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length
    };
  }
}
