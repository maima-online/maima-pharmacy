import { getSession, useSession } from "next-auth/react";

export const fetcher = async (arg: any, ...args: any) => {
  const session = await getSession();
  return fetch(arg, {
    headers: {
      Authorization: `Bearer ${session?.accessToken ?? ""}`,
    },
  }).then((res) => res.json());
};
