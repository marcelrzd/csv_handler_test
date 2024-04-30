import { ReactElement } from "react";

function Footer(): ReactElement {
  return (
    <footer className="p-4 text-center bg-light-blue text-primary">
      <p>
        © 2024{" "}
        <a className="font-semibold" href="https://github.com/marcelrzd">
          Marcel
        </a>
      </p>
    </footer>
  );
}

export { Footer };
