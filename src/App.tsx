import { Route, Switch } from 'react-router-dom';
import Job from './components/Job';
import JobsBoard from './components/JobsBoard';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={JobsBoard} />
      <Route path="/job/:id" exact component={Job} />
    </Switch>
  );
}

export default App;
