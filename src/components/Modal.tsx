import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<Props> = ({ onClose, children }) => {
  return (
    <div className="bg-black bg-opacity-80 h-screen fixed top-0 w-screen">
      <div className="relative p-5 w-fit mx-auto mt-10 bg-gray-100 rounded-xl border-2 items-center flex border-black">
        <button
          className="absolute -right-4 -top-4 rounded-full border h-8 w-8 flex items-center justify-center transition hover:scale-110 hover:rotate-12 border-black bg-red-500 hover:bg-red-500 font-bold"
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
