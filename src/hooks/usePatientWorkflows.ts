import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PatientWorkflow {
  id: string;
  patient_id: string;
  workflow_id: string;
  status: string;
  assigned_at: string;
  completed_at: string | null;
  patients: {
    profiles: {
      first_name: string;
      last_name: string;
    };
  };
  workflows: {
    name: string;
    description: string;
  };
  patient_workflow_tasks: Array<{
    id: string;
    status: string;
    completed_at: string | null;
    notes: string;
    workflow_tasks: {
      task_name: string;
      description: string;
      step_order: number;
    };
  }>;
}

export const usePatientWorkflows = () => {
  const [workflows, setWorkflows] = useState<PatientWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('patient_workflows')
          .select(`
            *,
            patients (
              profiles (
                first_name,
                last_name
              )
            ),
            workflows (
              name,
              description
            ),
            patient_workflow_tasks (
              id,
              status,
              completed_at,
              notes,
              workflow_tasks (
                task_name,
                description,
                step_order
              )
            )
          `)
          .order('assigned_at', { ascending: false });

        if (error) throw error;
        setWorkflows(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  return { workflows, loading, error };
};