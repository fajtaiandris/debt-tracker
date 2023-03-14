import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./App.css";
import { DebtGraph } from "./components/DebtGraph";
import { NewDebt } from "./components/NewDebt";
import { NewPerson } from "./components/NewPerson";
import { useAddDebtMutation } from "./hooks/useAddDebtMutation";
import { useAddPersonMutation } from "./hooks/useAddPersonMutation";
import useDebtsQuery from "./hooks/useDebtsQuery";
import usePeopleQuery from "./hooks/usePeopleQuery";
import { Debt } from "./interfaces/debt";
import { Person } from "./interfaces/person";

function App() {
  const {
    data: people,
    isLoading: isPeopleLoading,
    isError: isPeopleError,
  } = usePeopleQuery();
  const {
    data: debts,
    isLoading: isDebtsLoading,
    isError: isDebtsError,
  } = useDebtsQuery();

  const [selectedOf, setSelectedOf] = useState<Person | null>(null);
  const [selectedTo, setSelectedTo] = useState<Person | null>(null);
  const [isNewPersonModalVisible, setIsNewPersonModalVisible] =
    useState<boolean>(false);
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
    if (!!selectedTo) {
      return;
    }
    if (!!selectedOf) {
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
    <div className="bg-gray-50 h-screen">
      <button
        className="rounded-lg justify-self-end border border-black m-2 bg-gray-700 text-white hover:bg-gray-800 font-semibold p-2"
        type="button"
        onClick={() => {
          setIsNewPersonModalVisible(true);
        }}
      >
        Add new person
        <FontAwesomeIcon className="ml-2" icon={faUserPlus} />
      </button>
      {isLoading && <>Loading ... </>}
      {isError && <>Error ... </>}
      {!isLoading && !isError && !!debts && !!people && (
        <>
          <DebtGraph
            people={people}
            debts={debts}
            onPersonClick={handlePersonClick}
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
    </div>
  );
}

export default App;
