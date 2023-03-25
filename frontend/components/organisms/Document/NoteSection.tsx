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
    <div className="flex flex-col justify-start h-auto w-[30%] pl-2 border-l">
      <textarea
        className="w-full h-[25%] p-6 text-gray-400 border rounded border-none bg-gray-100"
        onChange={handleChangeTranslation}
        placeholder="Type translation..."
        value={states.translation}
      ></textarea>
      <hr className="block h-[1px] my-2" />
      <textarea
        className="w-full h-[73%] p-6 text-gray-400 border rounded border-none bg-gray-100"
        placeholder="Note something temporarily..."
      ></textarea>
    </div>
  );
};

export default NoteSection;
