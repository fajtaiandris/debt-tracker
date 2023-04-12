import { useQuery } from '@tanstack/react-query';

import { Debt } from '@interfaces/debt';

import useSupabase from '@hooks/useSupabase';

function useDebtsQuery() {
  const client = useSupabase();
  const key = ['debts'];

  return useQuery(key, async () => {
    return client
      .from('debt')
      .select('*')
      .throwOnError()
      .then((result) => result.data as Debt[]);
  });
}

export default useDebtsQuery;
