import useSWR from "swr";
import { DocumentListItem } from "../components/atoms/DocumentBar";
export interface IFetchDocuments {
  data: DocumentListItem[] | undefined;
  error: Error | undefined;
}
/** Documentのリストをfetchする処理 */
export const useFetchDocuments = (): IFetchDocuments => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    `http://localhost:3000/documentListItems?userId=1`,
    fetcher
  );

  return { data, error };
};
