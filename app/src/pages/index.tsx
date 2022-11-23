import React, { ReactElement } from "react";
import Layout from "../components/layout";

export default function index() {
  return <div>hola</div>;
}

index.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Dashboard">{page}</Layout>;
};
