import { VFC } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "../../apis/api";

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
  const handleClickDeleteDocument = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("documentId", documentListItem.id.toString());

    axiosInstance
      .delete("/document", { data: params })
      .then((res) => {
        console.log("delete success: ", res);
      })
      .catch((err) => {
        console.log("request err: ", err);
      });
  };

  return (
    <div className="flex w-[75%]">
      <button
        key={documentListItem.id}
        className="w-full bg-gray-100 py-3 border-l border-b border-r rounded"
        onClick={handleClickOpenDocument}
      >
        {documentListItem.sentence}
      </button>
      <button
        className="w-[40px] rounded bg-gray-100 py-3"
        onClick={handleClickDeleteDocument}
      >
        D
      </button>
    </div>
  );
};

export default DocumentBar;
