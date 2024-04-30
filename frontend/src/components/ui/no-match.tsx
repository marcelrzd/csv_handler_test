import { ReactElement } from "react";

function NoMatch(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-screen h-screen gap-6 text-white bg-zinc-800">
      <h2 className="text-2xl font-medium">Nothing to see here</h2>
      <p className="font-extrabold text-green-300">Hands on the work!</p>
    </div>
  );
}

export { NoMatch };
