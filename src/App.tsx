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

function loadDummyPeople(projectId: number): Person[] {
  return [
    {
      name: "Andris",
      color: "#4284f5",
      photoUrl: "https://api.dicebear.com/5.x/lorelei/svg?seed=Andris",
    },
    {
      name: "Szandi",
      color: "#b342f5",
      photoUrl: "https://api.dicebear.com/5.x/lorelei/svg?seed=Szandi",
    },
    {
      name: "Gergo",
      color: "#f5cb42",
      photoUrl: "https://api.dicebear.com/5.x/lorelei/svg?seed=Gergo",
    },
    {
      name: "Tomi",
      color: "#42f56c",
      photoUrl: "https://api.dicebear.com/5.x/lorelei/svg?seed=Tomi",
    },
    {
      name: "Zoli",
      color: "#f5427e",
      photoUrl: "https://api.dicebear.com/5.x/lorelei/svg?seed=Zoli",
    },
  ];
}

function loadDummyDebts(projectId: number): Debt[] {
  return [
    { of: "Andris", to: "Szandi", amount: 1500 },
    { of: "Andris", to: "Gergo", amount: 10000 },
    { of: "Gergo", to: "Szandi", amount: 1500 },
    { of: "Szandi", to: "Tomi", amount: 100 },
  ];
}

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

  const addPersonMutation = useAddPersonMutation();
  const addDebtMutation = useAddDebtMutation();

  const onAddPerson = (person: Person) => {
    addPersonMutation.mutate(person);
  };

  const onAddDebt = async (debt: Debt) => {
    debts && addDebtMutation.mutate({ debt, debts });
  };

  const isLoading = isPeopleLoading || isDebtsLoading;
  const isError = isPeopleError || isDebtsError;

  return (
    <div className="bg-gray-50 h-screen">
      {isLoading && <>Loading ... </>}
      {isError && <>Error ... </>}
      {!isLoading && !isError && !!debts && !!people && (
        <>
          <DebtGraph
            people={people}
            debts={debts}
            onNewDebt={onAddDebt}
          ></DebtGraph>
          <NewPerson onSave={onAddPerson}></NewPerson>
        </>
      )}
    </div>
  );
}

export default App;
