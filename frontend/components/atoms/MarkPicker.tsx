import { Dispatch, SetStateAction, VFC } from "react";

type Props = {
  functions: {
    setMark: Dispatch<SetStateAction<string>>;
  };
};

const MarkPicker: VFC<Props> = ({ functions }) => {
  return (
    <select
      className="flex w-[10%] h-20 rounded border cursor-pointer text-center"
      onChange={(e) => {
        functions.setMark(e.target.value);
        console.log(e.target.value + " picker clicked");
      }}
    >
      <option value="show">show</option>
      <option value="note">note</option>
      <option value="">normal</option>
    </select>
  );
};

export default MarkPicker;
