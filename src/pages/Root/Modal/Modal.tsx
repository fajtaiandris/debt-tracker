import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<Props> = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 h-screen w-screen bg-black bg-opacity-80">
      <div className="relative mx-auto mt-10 flex w-fit items-center rounded-xl border-2 border-black bg-gray-100 p-5">
        <button
          className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full border border-black bg-red-500 font-bold transition hover:rotate-12 hover:scale-110 hover:bg-red-500"
          type="button"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        {children}
      </div>
    </div>
  );
};
