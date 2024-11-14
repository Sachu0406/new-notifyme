import { useState, useEffect } from "react";
import { UseFetchResult } from "../Shared/ObjectModals";
import Spinner from "../Shared/Spinner";

const useFetch = (url: string): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("😔 Error in fetching data! 😔");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
