import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Patient {
  id: string;
  profile_id: string;
  date_of_birth: string;
  gender: string;
  address: string;
  insurance_info: any;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
  };
}

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('patients')
          .select(`
            *,
            profiles (
              first_name,
              last_name,
              email,
              phone_number,
              role
            )
          `);

        if (error) throw error;
        setPatients(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return { patients, loading, error };
};