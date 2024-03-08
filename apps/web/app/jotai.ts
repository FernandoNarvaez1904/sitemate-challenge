"use client";

import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const jotaiStore = createStore();

export const authTokenAtom = atomWithStorage<string>(
  "authToken",
  "",
  undefined,
  { getOnInit: true },
);
