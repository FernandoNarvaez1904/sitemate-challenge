"use client";

import { trpc } from "./_trpc/trpc";

export default function Home() {
  const { data } = trpc.sayName.useQuery();
  return <p>Hello {data?.name}</p>;
}
