import Modal from "@/components/shared/custom/Modal";
import React, { useState } from "react";

interface ShowAllOfferTermsAndConditionProps {
  termsConditions: string[];
  setTermsAndConditions: React.Dispatch<React.SetStateAction<string[]>>;
}

const ShowAllOfferTermsAndCondition: React.FC<
  ShowAllOfferTermsAndConditionProps
> = ({ termsConditions, setTermsAndConditions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleDelete = (index: number) => {
    setTermsAndConditions((prev) => prev.filter((_, i) => i !== index));
    if (termsConditions.length === 0) {
      setIsOpen(false);
    }
  };

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Show All
      </button>

      <Modal isOpen={isOpen} onClose={toggleModal}>
        <h2 className="text-xl font-semibold mb-4">All Terms and Conditions</h2>
        <ul className="space-y-2">
          {termsConditions.map((termsCondition, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{termsCondition}</span>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default ShowAllOfferTermsAndCondition;
