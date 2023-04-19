/** マークの色を取得する */
export const getMarkColorStyle = (markType: string, purpose = "") => {
  if (purpose === "picker") {
    switch (markType) {
      case "show":
        return "bg-orange-200";
      case "note":
        return "bg-purple-200";
      case "":
      default:
        return "bg-gray-100";
    }
  } else {
    switch (markType) {
      case "show":
        return "bg-orange-300";
      case "note":
        return "bg-purple-300";
      case "":
      default:
        return "bg-gray-100";
    }
  }
};
