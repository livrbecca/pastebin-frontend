import "./App.css";
import ListPastes from "./components/ListPastes";
import PasteForm from "./components/PasteForm";

function App() {
  return (
    <div className="App">
      <PasteForm />
      <ListPastes />
    </div>
  );
}

export default App;
