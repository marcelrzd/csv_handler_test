import { ReactElement } from "react";

function Header(): ReactElement {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-primary ">
      <div className="flex items-center">
        <div className="flex items-center justify-center h-12 gap-2 font-semibold">
          <span className="text-white">Ultimate</span>
          <span className="text-green-300"> CSV Handler</span>
        </div>
      </div>
    </nav>
  );
}

export { Header };
