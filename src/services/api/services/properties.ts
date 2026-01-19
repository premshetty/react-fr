import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Property, PropertyDetails } from "../types/property";
import { RequestConfigType } from "./types/request-config";

export type PropertyRequest = {
  id: Property["id"];
};

export type PropertyResponse = PropertyDetails;

export function useGetPropertyService() {
  const fetch = useFetch();

  return useCallback(
    (data: PropertyRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/properties/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PropertyResponse>);
    },
    [fetch]
  );
}
