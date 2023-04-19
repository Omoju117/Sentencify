import { Dispatch, SetStateAction, useContext, useEffect, VFC } from "react";
import { MarkContext } from "../../pages/_app";
import { getMarkColorStyle } from "../../utils/colorUtil";

type Props = {
  functions: {
    setMark: Dispatch<SetStateAction<string>>;
  };
};

const MarkPicker: VFC<Props> = ({ functions }) => {
  // コンテキストから値を取得
  const currentPickedMark = useContext(MarkContext);
  useEffect(() => {
    functions.setMark("show");
  }, []);
  return (
    <select
      className={
        getMarkColorStyle(currentPickedMark, "picker") +
        " flex w-[10%] h-20 rounded border cursor-pointer text-center"
      }
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
