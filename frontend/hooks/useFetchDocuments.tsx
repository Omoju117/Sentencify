import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { DocumentListItem } from "../components/atoms/DocumentBar";
export interface IFetchDocuments {
  data: DocumentListItem[] | undefined;
  error: Error | undefined;
  setDocumentList: Dispatch<SetStateAction<DocumentListItem[]>>;
}

/** Documentのリストをfetchする処理 */
export const useFetchDocuments = (): IFetchDocuments => {
  const fetcher = (url) =>
    fetch(url, { credentials: "include", mode: "cors" }).then((res) =>
      res.json()
    );
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/documents",
    fetcher
  );
  const [documentList, setDocumentList] = useState<DocumentListItem[]>([]);
  useEffect(() => {
    if (data) {
      setDocumentList(data);
    }
    console.log("rerender");
  }, [data]);

  return { data: documentList, error, setDocumentList };
};
