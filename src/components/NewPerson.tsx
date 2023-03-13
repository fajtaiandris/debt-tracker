import { FC, useState } from "react";
import { Person } from "../interfaces/person";

interface Props {
  onSave: (person: Person) => void;
}

export const NewPerson: FC<Props> = ({ onSave }) => {
  const [person, setPerson] = useState<Person>({
    name: "",
    color: "",
    photoUrl: "",
  });
  return (
    <div className="p-5">
      <div>
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nick Name
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            type="text"
            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bonnie Green"
            value={person.name}
            onChange={(e) => {
              setPerson({ ...person, name: e.currentTarget.value });
            }}
          />
        </div>

        <label
          htmlFor="website-admin"
          className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >
          Photo Url
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            type="text"
            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://api.dicebear.com/5.x/lorelei/svg?seed=BonnieGreen"
            value={person.photoUrl}
            onChange={(e) => {
              setPerson({ ...person, photoUrl: e.currentTarget.value });
            }}
          />
        </div>

        <label
          htmlFor="website-admin"
          className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >
          Color
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            type="text"
            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="#F123111"
            value={person.color}
            onChange={(e) => {
              setPerson({ ...person, color: e.currentTarget.value });
            }}
          />
        </div>
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => onSave(person)}
        >
          Save
        </button>
      </div>
    </div>
  );
};
