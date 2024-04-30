import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";

function Layout(): ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow gap-8 px-12 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { Layout };
