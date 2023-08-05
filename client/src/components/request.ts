// export async function request<TResponse>(url: string): Promise<TResponse> {
//   const response = await fetch(url, {
//     method: "Get",
//     headers: {
//       "Content-Type": "application/json",
//       "Apollo-Require-Preflight": "true",
//     },
//   });
//   const data = await response.json();
//   return data as TResponse;
// }
