"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111118",
            color: "#e2e8f0",
            border: "1px solid #1e1e2e",
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
}