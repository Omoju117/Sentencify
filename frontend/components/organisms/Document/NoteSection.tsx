import { Dispatch, SetStateAction, VFC } from "react";
import { DocumentScheme } from "../../../pages/document/[documentId]";

type Props = {
  states: {
    translation: string;
  };
  functions: {
    setDocument: Dispatch<SetStateAction<DocumentScheme>>;
  };
};

const NoteSection: VFC<Props> = ({ states, functions }) => {
  const handleChangeTranslation = (event) => {
    functions.setDocument((prev) => ({
      ...prev,
      translation: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col justify-start h-full w-[30%] pl-2 border-l">
      <div className="mb-6">
        <textarea
          className="w-full h-30 p-6 text-gray-400 border rounded"
          onChange={handleChangeTranslation}
          placeholder="Type translation..."
          value={states.translation}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteSection;
