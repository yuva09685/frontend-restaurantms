"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // ✅ Ensure correct path

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
