import { Dispatch, SetStateAction, VFC } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "../../apis/api";
import Image from "next/image";

export type DocumentListItem = {
  id: number;
  sentence: string;
  translation: string;
  updatedAt: string;
};

type Props = {
  documentListItem: DocumentListItem;
  functions: {
    setDocumentList: Dispatch<SetStateAction<DocumentListItem[]>>;
  };
};

const DocumentBar: VFC<Props> = ({ documentListItem, functions }) => {
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
        functions.setDocumentList((prev) => {
          const shallowCopiedArr = [...prev];
          const deleteIndex = prev.findIndex(
            (document) => document.id === documentListItem.id
          );
          shallowCopiedArr.splice(deleteIndex, 1);
          return shallowCopiedArr;
        });
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
        className="w-[40px] flex justify-center items-center rounded bg-gray-100 py-3 border-b border-r"
        onClick={handleClickDeleteDocument}
      >
        <Image
          src="/img/delete.svg"
          width={24}
          height={24}
          alt="delete-button"
        />
      </button>
    </div>
  );
};

export default DocumentBar;
