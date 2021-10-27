import "./App.css";
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      <h1>Memory Game</h1>
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
