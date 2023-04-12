import { useQuery } from '@tanstack/react-query';

import { Person } from '@interfaces/person';

import useSupabase from '@hooks/useSupabase';

function usePeopleQuery() {
  const client = useSupabase();
  const key = ['people'];

  return useQuery(key, async () => {
    return client
      .from('person')
      .select('*')
      .throwOnError()
      .then((result) => result.data as Person[]);
  });
}

export default usePeopleQuery;
