import { Dispatch, SetStateAction, VFC } from "react";

type Props = {
  markType: string;
  setMark: Dispatch<SetStateAction<string>>;
};

// TODO: make this utilize
const getBgStyle = (mark: string) => {
  switch (mark) {
    case "show":
      return "bg-orange-300";
    case "note":
      return "bg-purple-300";
    case "":
    default:
      return "bg-gray-100";
  }
};

const MarkPicker: VFC<Props> = ({ markType, setMark }) => {
  return (
    <button
      className={
        getBgStyle(markType) + " flex w-[15%] h-20 rounded cursor-pointer"
      }
      onClick={() => {
        setMark(markType);
        console.log(markType + " picker clicked");
      }}
    ></button>
  );
};

export default MarkPicker;
