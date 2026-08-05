import React from "react";
import { Link } from "react-router-dom";
import PageBack from "../Components/CommonDetails/PageBack";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">

        <div className="flex justify-center mb-6">
          <PageBack />
        </div>

        <h1 className="text-6xl font-bold">404</h1>

        <p className="mt-4 text-slate-600">
          Page not found
        </p>

        <Link
          to="/"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Go Home
        </Link>

      </div>
    </div>
  );
}