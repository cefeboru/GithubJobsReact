import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

type ApiFunction = (params: ApiParams) => Promise<AxiosResponse>;
type ApiParams = { query: any };

export function useApi<T>(apiFunction: ApiFunction, params: ApiParams): [boolean, boolean, T, string];
export function useApi(apiFunction: ApiFunction, params: ApiParams) {
  const [data, setData] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function executeApiFunction() {
      try {
        setIsLoading(true);
        const response = await apiFunction(params);
        setData(response.data);
        setIsLoading(false);
        setHasLoaded(true);
      } catch (err) {
        setError("Something went wrong");
        setHasLoaded(true);
        console.error(err);
        setIsLoading(false);
      }
    }
    executeApiFunction();
  }, [apiFunction, params]);

  return [isLoading, hasLoaded, data, error];
}