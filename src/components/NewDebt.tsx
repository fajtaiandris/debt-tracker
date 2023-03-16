import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Debt } from "../interfaces/debt";
import { Person } from "../interfaces/person";
import { Modal } from "./Modal";

interface Props {
  of: Person;
  to: Person;
  onSave: (debt: Debt) => void;
  onClose: () => void;
}

export const NewDebt: FC<Props> = ({ of, to, onSave, onClose }) => {
  const [amount, setAmount] = useState<number>(0);
  return (
    <Modal onClose={onClose}>
      <div className="w-48">
        <div className="text-center mb-2">
          {of.name} owes {to.name}
        </div>
        <div className="grid grid-cols-2 mb-4 gap-2 justify-items-center">
          <img
            className="rounded-full p-2 border border-black"
            style={{ background: of.color }}
            src={of.photoUrl}
          ></img>
          <img
            className="rounded-full p-2 border border-black"
            style={{ background: to.color }}
            src={to.photoUrl}
          ></img>
        </div>
        <div>
          <div className="flex">
            <input
              type="text"
              className="rounded-none rounded-l-lg bg-gray-50 border border-black text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="amount"
              value={amount}
              onChange={(e) => {
                setAmount(+e.currentTarget.value);
              }}
            />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-black rounded-r-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              Ft
            </span>
            <button
              className="rounded-lg border border-black ml-2 bg-green-500 hover:bg-green-600 font-bold py-2 px-4"
              type="button"
              onClick={() => onSave({ of: of.name, to: to.name, amount })}
            >
              <FontAwesomeIcon icon={faPiggyBank} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
