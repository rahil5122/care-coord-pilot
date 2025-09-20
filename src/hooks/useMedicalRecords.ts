import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MedicalRecord {
  id: string;
  patient_id: string;
  provider_id: string;
  record_type: string;
  content: any;
  created_at: string;
  patients?: {
    profiles: {
      first_name: string;
      last_name: string;
    };
  };
  providers?: {
    profiles: {
      first_name: string;
      last_name: string;
    };
    specialty: string;
  };
}

export const useMedicalRecords = (patientId?: string) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        let query = (supabase as any)
          .from('medical_records')
          .select(`
            *,
            patients (
              profiles (
                first_name,
                last_name
              )
            ),
            providers (
              profiles (
                first_name,
                last_name
              ),
              specialty
            )
          `);

        if (patientId) {
          query = query.eq('patient_id', patientId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setRecords(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [patientId]);

  return { records, loading, error };
};