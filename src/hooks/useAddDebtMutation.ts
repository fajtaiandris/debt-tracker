import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Debt } from "../interfaces/debt";
import useSupabase from "./useSupabase";

export interface AddDebtMutationParams {
  debt: Debt,
  debts: Debt[]
}

export function useAddDebtMutation() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation(
    async (params: AddDebtMutationParams) => {
      const commonDebt = findCommonDebt(params.debts, params.debt.of, params.debt.to);
      if (!commonDebt) {
        return client
          .from('debt')
          .insert([
            params.debt
          ])
          .throwOnError()
          .select<string, Debt>('*')
          .throwOnError()
          .single()
          .then(
            (result) => result.data
          );
      }
      if (commonDebt.of === params.debt.of) {
        return client
          .from('debt')
          .update({ amount: params.debt.amount + commonDebt.amount })
          .eq('of', commonDebt.of)
          .eq('to', commonDebt.to)
          .throwOnError()
          .select<string, Debt>('*')
          .throwOnError()
          .single()
          .then(
            (result) => result.data
          );
      }
      if (commonDebt.amount > params.debt.amount) {
         return client
          .from('debt')
          .update({ amount: commonDebt.amount - params.debt.amount})
          .eq('of', commonDebt.of)
          .eq('to', commonDebt.to)
          .throwOnError()
          .select<string, Debt>('*')
          .throwOnError()
          .single()
          .then(
            (result) => result.data
          );
      }
      if (commonDebt.amount === params.debt.amount) {
        return client
          .from('debt')
          .delete()
          .eq('of', commonDebt.of)
          .eq('to', commonDebt.to)
          .throwOnError()
          .select<string, Debt>('*')
          .throwOnError()
          .single()
          .then(
            (result) => result.data
          );
      }
      if (commonDebt.amount < params.debt.amount) {
        return client
          .from('debt')
          .update({
            to: params.debt.to,
            of: params.debt.of,
            amount: params.debt.amount - commonDebt.amount
          })
          .eq('of', commonDebt.of)
          .eq('to', commonDebt.to)
          .throwOnError()
          .select<string, Debt>('*')
          .throwOnError()
          .single()
          .then(
            (result) => result.data
          );
      }
    }, {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['debts']);
      }
    }
  );
}

export function findCommonDebt(debts: Debt[], personX: string, personY: string): Debt | null {
  return debts.find((debt) => debt.of === personX && debt.to === personY)
    || debts.find((debt) => debt.to === personX && debt.of === personY)
    || null;
}
