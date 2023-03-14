import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPalette,
  faUserPlus,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";
import { Person } from "../interfaces/person";
import { Modal } from "./Modal";

interface Props {
  onSave: (person: Person) => void;
  onClose: () => void;
}

function randomPhotoUrl() {
  let r = (Math.random() + 1).toString(36).substring(7);
  return "https://api.dicebear.com/5.x/lorelei/svg?seed=" + r;
}

function randomHexColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

export const NewPerson: FC<Props> = ({ onSave, onClose }) => {
  const [person, setPerson] = useState<Person>({
    name: "",
    color: randomHexColor(),
    photoUrl: randomPhotoUrl(),
  });
  return (
    <Modal onClose={onClose}>
      <div className="w-72 flex">
        <img
          className="h-24 w-24 rounded-full p-2 border border-black"
          style={{ background: person.color }}
          src={person.photoUrl}
        ></img>
        <div className="ml-4">
          <div className="flex mb-2">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-black rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              @
            </span>
            <input
              type="text"
              className="rounded-none rounded-r-lg bg-gray-50 border border-black text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nickname"
              value={person.name}
              onChange={(e) => {
                setPerson({ ...person, name: e.currentTarget.value });
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              className="rounded-lg border border-black bg-pink-400 hover:bg-pink-500 font-bold py-2 px-4"
              type="button"
              onClick={() =>
                setPerson({ ...person, photoUrl: randomPhotoUrl() })
              }
            >
              <FontAwesomeIcon icon={faWandMagicSparkles} />
            </button>
            <button
              className="rounded-lg border border-black bg-pink-400 hover:bg-pink-500 font-bold py-2 px-4"
              type="button"
              onClick={() => setPerson({ ...person, color: randomHexColor() })}
            >
              <FontAwesomeIcon icon={faPalette} />
            </button>
            <button
              className="rounded-lg border border-black bg-pink-500 hover:bg-pink-600 font-bold py-2 px-4"
              type="button"
              onClick={() => onSave(person)}
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
