"use client";
import { useEffect } from "react";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 rounded-2xl border border-red-100">
      <h2 className="text-2xl font-bold text-red-800 mb-2">
        Something went wrong!!
      </h2>
      <p className="text-red-600 mb-6 text-center">
        {error.message || "Sorry! Something went wrong!!"}
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
