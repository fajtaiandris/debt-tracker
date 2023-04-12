import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HistoryItem } from '@interfaces/history';

import useSupabase from '@hooks/useSupabase';

export function useAddHistoryMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async (historyItem: Omit<HistoryItem, 'created_at'>) => {
      return client
        .from('history')
        .insert([historyItem])
        .throwOnError()
        .select<string, HistoryItem>('*')
        .throwOnError()
        .single()
        .then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['history']);
      },
    },
  );
}
