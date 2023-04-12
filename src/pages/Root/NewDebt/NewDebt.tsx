import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';

import { Debt } from '@interfaces/debt';
import { Person } from '@interfaces/person';

import { Modal } from '../Modal';

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
        <div className="mb-2 text-center">
          {of.name} owes {to.name}
        </div>
        <div className="mb-4 grid grid-cols-2 justify-items-center gap-2">
          <img
            className="rounded-full border border-black p-2"
            alt="of-avatar"
            style={{ background: of.color }}
            src={of.photoUrl}
          ></img>
          <img
            className="rounded-full border border-black p-2"
            alt="to-avatar"
            style={{ background: to.color }}
            src={to.photoUrl}
          ></img>
        </div>
        <div>
          <div className="flex">
            <input
              type="text"
              className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-black bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="amount"
              value={amount}
              onChange={(e) => {
                setAmount(+e.currentTarget.value);
              }}
            />
            <span className="inline-flex items-center rounded-r-lg border border-l-0 border-black bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
              Ft
            </span>
            <button
              className="ml-2 rounded-lg border border-black bg-green-500 py-2 px-4 font-bold hover:bg-green-600"
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
