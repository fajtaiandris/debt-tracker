import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Person } from "../interfaces/person";
import useSupabase from "./useSupabase";

export function useAddPersonMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async (person: Person) => {
      return client
        .from('person')
        .insert([
          person
        ])
        .throwOnError()
        .select<string, Person>('*')
        .throwOnError()
        .single()
        .then(
          (result) => result.data
        );
    }, {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['people']);
      }
    }
  );
}