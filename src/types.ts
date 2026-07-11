import { z } from 'zod';

export const UserRecordSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
  created_at: z.string().optional()
});
export type UserRecord = z.infer<typeof UserRecordSchema>;

export const MemoryRecordSchema = z.object({
  id: z.string().uuid(),
  agent_id: z.string().uuid(),
  content: z.string(),
  embedding: z.array(z.number()).optional(),
  importance: z.number(),
  created_at: z.string().optional()
});
export type MemoryRecord = z.infer<typeof MemoryRecordSchema>;

export const SessionRecordSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  token: z.string(),
  expires_at: z.string(),
  created_at: z.string().optional()
});
export type SessionRecord = z.infer<typeof SessionRecordSchema>;

export const ProjectRecordSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  owner_id: z.string().uuid(),
  created_at: z.string().optional()
});
export type ProjectRecord = z.infer<typeof ProjectRecordSchema>;

export const WorkflowRecordSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z.string(),
  definition: z.record(z.any()),
  status: z.enum(['active', 'paused', 'draft']),
  created_at: z.string().optional()
});
export type WorkflowRecord = z.infer<typeof WorkflowRecordSchema>;

export const TaskRecordSchema = z.object({
  id: z.string().uuid(),
  workflow_id: z.string().uuid().optional(),
  queue_name: z.string(),
  payload: z.record(z.any()),
  status: z.enum(['pending', 'running', 'completed', 'failed']),
  error: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});
export type TaskRecord = z.infer<typeof TaskRecordSchema>;

export const GoalRecordSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  target_date: z.string().optional(),
  progress: z.number().min(0).max(100),
  status: z.enum(['not_started', 'in_progress', 'completed', 'abandoned']),
  created_at: z.string().optional()
});
export type GoalRecord = z.infer<typeof GoalRecordSchema>;

export const KnowledgeRecordSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  created_at: z.string().optional()
});
export type KnowledgeRecord = z.infer<typeof KnowledgeRecordSchema>;

export const AuditRecordSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  action: z.string(),
  details: z.record(z.any()),
  ip_address: z.string().optional(),
  created_at: z.string().optional()
});
export type AuditRecord = z.infer<typeof AuditRecordSchema>;

export const MetricRecordSchema = z.object({
  id: z.string().uuid(),
  engine_id: z.string(),
  name: z.string(),
  value: z.number(),
  unit: z.string().optional(),
  created_at: z.string().optional()
});
export type MetricRecord = z.infer<typeof MetricRecordSchema>;
