import { Person } from "../interfaces/person";

export function peopleReducer(people: Person[], action: PeopleAction): Person[] {
  const { type, payload } = action;
  switch (type) {
    case "addPerson":
      return [...people, payload.person];
    case 'resetPeople':
      return payload.people;
    default:
      return people;
  }
}

export type PeopleAction =
  | {
      type: "addPerson";
      payload: { person: Person; };
  }
  | {
    type: "resetPeople";
    payload: { people: Person[]; };
  }

export function addPerson(person: Person): PeopleAction {
  return ({
    type: "addPerson",
    payload: { person },
  });
};

export function resetPeople(people: Person[]): PeopleAction {
  return ({
    type: "resetPeople",
    payload: { people },
  });
};
