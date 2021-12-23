import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from "./routers";
import LoadingComponent from "@/compontents/Loading";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent />}>
        <RenderRouter />
      </Suspense>
    </BrowserRouter>
  );
}
