import { VFC } from "react";
import { useRouter } from "next/router";

export type DocumentListItem = {
  id: number;
  sentence: string;
  translation: string;
  updatedAt: string;
};

type Props = {
  documentListItem: DocumentListItem;
};

const DocumentBar: VFC<Props> = ({ documentListItem }) => {
  const router = useRouter();
  const handleClickOpenDocument = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/document/${documentListItem.id}`,
      query: {
        isExisting: true,
      },
    });
  };

  return (
    <button
      key={documentListItem.id}
      className="w-[50%] bg-gray-100 py-3 border-l border-b border-r rounded"
      onClick={handleClickOpenDocument}
    >
      {documentListItem.sentence}
    </button>
  );
};

export default DocumentBar;
