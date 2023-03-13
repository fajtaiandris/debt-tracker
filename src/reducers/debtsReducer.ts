import { Debt } from "../interfaces/debt";

function findCommonDebt(debts: Debt[], personX: string, personY: string): Debt | null {
  return debts.find((debt) => debt.of === personX && debt.to === personY)
    || debts.find((debt) => debt.to === personX && debt.of === personY)
    || null;
}

export function debtsReducer(draft: Debt[], action: DebtsAction) {
  const {type, payload} = action
  switch (type) {
    case 'addDebt':
      const commonDebt = findCommonDebt(draft, payload.debt.of, payload.debt.to);
      if (!commonDebt) {
        draft.push(payload.debt)
        return;
      }
      if (commonDebt.of === payload.debt.of) {
        commonDebt.amount += payload.debt.amount;
        return;
      }
      if (commonDebt.amount > payload.debt.amount) {
        commonDebt.amount -= payload.debt.amount;
        return;
      }
      if (commonDebt.amount <= payload.debt.amount) {
        const index = draft.indexOf(commonDebt, 0);
        draft.splice(index, 1);
      }
      if (commonDebt.amount < payload.debt.amount) {
        draft.push({
          to: payload.debt.to,
          of: payload.debt.of,
          amount: payload.debt.amount - commonDebt.amount
        })
      }
      return;
    case 'resetDebts':
      draft.slice(0, -1);
      payload.debts.forEach((debt) => draft.push(debt));
    default:
      break;
  }
}

export type DebtsAction =
  | {
      type: "addDebt";
      payload: { debt: Debt; };
  }
  | {
    type: 'resetDebts';
    payload: { debts: Debt[] };
  }

export function addDebt(debt: Debt): DebtsAction {
  return ({
    type: "addDebt",
    payload: { debt },
  });
};

export function resetDebts(debts: Debt[]): DebtsAction {
  return ({
    type: 'resetDebts',
    payload: { debts }
  })
}