import "./App.css";
import { ConsumeGraph } from "./components/ConsumeGraph";
import { EconomyGraph } from "./components/EconomyGraph";
import { useStore } from "./stores/ConsumeStore";

function App() {
  const { count, inc } = useStore();

  console.log("RENDER");
  return (
    <>
      <h1>Teste</h1>
      <ConsumeGraph />
      <EconomyGraph />

      <h1>Contator</h1>
      <h1>{count}</h1>
      <button onClick={inc}>CONTADOR</button>
    </>
  );
}

export default App;
