import { faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

import { HistoryItem } from '@interfaces/history';
import { Person } from '@interfaces/person';

import { Modal } from '../Modal';

type Inputs = {
  description: string;
  amount: number;
};

interface Props {
  of: Person;
  to: Person;
  history: HistoryItem[];
  onSave: (historyItem: Omit<HistoryItem, 'created_at'>) => void;
  onClose: () => void;
}

export const NewDebt: FC<Props> = ({ of, to, history, onSave, onClose }) => {
  const schema: ZodType<Inputs> = z.object({
    description: z.string().min(2).max(50),
    amount: z.number().min(1).max(99999),
  });
  const { register, handleSubmit } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    onSave({
      of: of.name,
      to: to.name,
      amount: data.amount,
      description: data.description,
    });

  const defaultValues: Inputs = {
    description: 'Description',
    amount: 2000,
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="mb-2 block w-full min-w-0 flex-1 rounded-lg border border-black bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="description"
            defaultValue={defaultValues.description}
            {...register('description', { required: true })}
          />
          <div>
            <div className="flex">
              <input
                type="text"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-black bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="amount"
                defaultValue={defaultValues.amount}
                {...register('amount', { required: true, valueAsNumber: true })}
              />
              <span className="inline-flex items-center rounded-r-lg border border-l-0 border-black bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                Ft
              </span>
              <button
                type="submit"
                className="ml-2 rounded-lg border border-black bg-green-500 py-2 px-4 font-bold hover:bg-green-600"
              >
                <FontAwesomeIcon icon={faPiggyBank} />
              </button>
            </div>
          </div>
        </form>
        <div>
          {history.map((e) => {
            const date = new Date(e.created_at);
            return (
              <div key={e.created_at} className="mt-2 rounded bg-gray-300 p-2">
                <span>{e.description}</span>
                <div className="grid grid-cols-2">
                  <div>
                    <FontAwesomeIcon icon={faCalendar} /> {`${date.getMonth()}.${date.getDate()}.`}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faMoneyBill} /> {`${e.amount} Ft`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
