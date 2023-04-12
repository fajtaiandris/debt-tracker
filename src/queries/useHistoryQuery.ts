import { useQuery } from '@tanstack/react-query';

import { HistoryItem } from '@interfaces/history';

import useSupabase from '@hooks/useSupabase';

function useHistoryQuery() {
  const client = useSupabase();
  const key = ['history'];

  return useQuery(key, async () => {
    return client
      .from('history')
      .select('*')
      .throwOnError()
      .then((result) => result.data as HistoryItem[]);
  });
}

export default useHistoryQuery;
