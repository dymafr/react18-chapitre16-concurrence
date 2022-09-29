import { lazy, useState, Suspense, useTransition } from "react";
import styles from "./App.module.scss";

const ComposantA = lazy(() => {
  return new Promise((res) => {
    setTimeout(() => {
      res(import("./pages/ComposantA/ComposantA"));
    }, 1000);
  });
});

const ComposantB = lazy(() => {
  return new Promise((res) => {
    setTimeout(() => {
      res(import("./pages/ComposantB/ComposantB"));
    }, 3000);
  });
});

function App() {
  const [page, setPage] = useState("a");
  const [isPending, startTransition] = useTransition();

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <nav className="d-flex p-20">
        <button className="btn btn-primary mr-5" onClick={() => setPage("a")}>
          Composant A
        </button>
        <button
          className="btn btn-primary"
          onClick={() => startTransition(() => setPage("b"))}
        >
          Composant B
        </button>
      </nav>
      <div className="flex-fill p-20">
        <Suspense fallback={<h2>Loading A ...</h2>}>
          {page === "a" && <ComposantA />}
          <Suspense fallback={<h2>Loading B ...</h2>}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptate mollitia voluptatem fuga inventore voluptatibus velit
              asperiores, nostrum enim vel maxime ullam, deleniti eius. Odio
              consequatur aperiam fugiat, iusto cum ab?
            </p>
            {isPending && <small>loading</small>}
            {page === "b" && <ComposantB />}
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
