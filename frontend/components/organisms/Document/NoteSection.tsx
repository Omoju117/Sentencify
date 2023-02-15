import { Dispatch, SetStateAction, VFC } from "react";

type Props = {
  functions: {
    setTranslation: Dispatch<SetStateAction<string>>;
  };
};

const NoteSection: VFC<Props> = ({ functions }) => {
  const handleBlurTranslation = (event) => {
    functions.setTranslation(event.target.value);
  };

  return (
    <div className="flex flex-col justify-start h-full w-[30%] pl-2 border-l">
      <div className="mb-6">
        <textarea
          className="w-full h-30 p-6 text-gray-400 border rounded"
          onBlur={handleBlurTranslation}
          placeholder="Type translation..."
        ></textarea>
      </div>
    </div>
  );
};

export default NoteSection;
