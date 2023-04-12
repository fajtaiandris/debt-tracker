import { faBug, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { useAddDebtMutation } from '@queries/useAddDebtMutation';
import { useAddPersonMutation } from '@queries/useAddPersonMutation';
import useDebtsQuery from '@queries/useDebtsQuery';
import usePeopleQuery from '@queries/usePeopleQuery';

import { Debt } from '@interfaces/debt';
import { Person } from '@interfaces/person';

import { DebtGraph } from './DebtGraph';
import { NewDebt } from './NewDebt';
import { NewPerson } from './NewPerson';

export function Root() {
  const { data: people, isLoading: isPeopleLoading, isError: isPeopleError } = usePeopleQuery();
  const { data: debts, isLoading: isDebtsLoading, isError: isDebtsError } = useDebtsQuery();

  const [selectedOf, setSelectedOf] = useState<Person | null>(null);
  const [selectedTo, setSelectedTo] = useState<Person | null>(null);
  const [isNewPersonModalVisible, setIsNewPersonModalVisible] = useState<boolean>(false);
  const isNewDebtModalVisible = !!selectedOf && !!selectedTo;

  const addPersonMutation = useAddPersonMutation();
  const addDebtMutation = useAddDebtMutation();

  const onAddPerson = (person: Person) => {
    addPersonMutation.mutate(person);
    setIsNewPersonModalVisible(false);
  };

  const onAddDebt = (debt: Debt) => {
    !!debts && addDebtMutation.mutate({ debt, debts });
    setSelectedOf(null);
    setSelectedTo(null);
  };

  const handlePersonClick = async (person: Person) => {
    if (selectedTo) {
      return;
    }
    if (selectedOf) {
      if (person === selectedOf) {
        setSelectedOf(null);
      } else {
        setSelectedTo(person);
      }
    } else {
      setSelectedOf(person);
    }
  };

  const isLoading = isPeopleLoading || isDebtsLoading;
  const isError = isPeopleError || isDebtsError;

  return (
    <div className="h-screen bg-gray-50">
      {isLoading && <>Loading ... </>}
      {isError && <>Error ... </>}
      {!isLoading && !isError && !!debts && !!people && (
        <>
          <DebtGraph
            people={people}
            debts={debts}
            onPersonClick={handlePersonClick}
            selectedPerson={selectedOf}
          ></DebtGraph>
        </>
      )}
      {isNewPersonModalVisible && (
        <NewPerson
          onSave={onAddPerson}
          onClose={() => {
            setIsNewPersonModalVisible(false);
          }}
        ></NewPerson>
      )}
      {isNewDebtModalVisible && (
        <NewDebt
          of={selectedOf}
          to={selectedTo}
          onSave={onAddDebt}
          onClose={() => {
            setSelectedOf(null);
            setSelectedTo(null);
          }}
        ></NewDebt>
      )}
      <div className="absolute top-0 left-0">
        <button
          className="m-2 justify-self-end rounded-lg border border-black bg-gray-700 p-2 font-semibold text-white hover:bg-gray-800"
          type="button"
          onClick={() => {
            setIsNewPersonModalVisible(true);
          }}
        >
          Add new person
          <FontAwesomeIcon className="ml-2" icon={faUserPlus} />
        </button>
        <a
          className="m-2 justify-self-end rounded-lg border border-black bg-gray-700 p-2 font-semibold text-white hover:bg-gray-800"
          type="button"
          href="https://github.com/fajtaiandris/debt-tracker/issues"
        >
          Backlog
          <FontAwesomeIcon className="ml-2" icon={faBug} />
        </a>
      </div>
    </div>
  );
}
