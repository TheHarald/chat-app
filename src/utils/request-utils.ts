export async function typedFetch<RequestType, ResponseType>(
  url: string,
  method: string,
  requestBody?: RequestType
): Promise<ResponseType> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const responseData: ResponseType = await response.json();
  return responseData;
}
