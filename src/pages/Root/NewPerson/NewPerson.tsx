import { faPalette, faUserPlus, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';

import { Person } from '@interfaces/person';

import { Modal } from '../Modal';

interface Props {
  onSave: (person: Person) => void;
  onClose: () => void;
}

function randomPhotoUrl() {
  const r = (Math.random() + 1).toString(36).substring(7);
  return 'https://api.dicebear.com/5.x/lorelei/svg?seed=' + r;
}

function randomHexColor() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}

export const NewPerson: FC<Props> = ({ onSave, onClose }) => {
  const [person, setPerson] = useState<Person>({
    name: '',
    color: randomHexColor(),
    photoUrl: randomPhotoUrl(),
  });
  return (
    <Modal onClose={onClose}>
      <div className="flex w-72">
        <img
          className="h-24 w-24 rounded-full border border-black p-2"
          alt="avatar"
          style={{ background: person.color }}
          src={person.photoUrl}
        ></img>
        <div className="ml-4">
          <div className="mb-2 flex">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-black bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
              @
            </span>
            <input
              type="text"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-black bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Nickname"
              value={person.name}
              onChange={(e) => {
                setPerson({ ...person, name: e.currentTarget.value });
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              className="rounded-lg border border-black bg-blue-400 py-2 px-4 font-bold hover:bg-blue-500"
              type="button"
              onClick={() => setPerson({ ...person, photoUrl: randomPhotoUrl() })}
            >
              <FontAwesomeIcon icon={faWandMagicSparkles} />
            </button>
            <button
              className="rounded-lg border border-black bg-blue-400 py-2 px-4 font-bold hover:bg-blue-500"
              type="button"
              onClick={() => setPerson({ ...person, color: randomHexColor() })}
            >
              <FontAwesomeIcon icon={faPalette} />
            </button>
            <button
              className="rounded-lg border border-black bg-green-500 py-2 px-4 font-bold hover:bg-green-600"
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
