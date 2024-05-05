import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import JobList from './components/JobList';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Candidate Application Platform</h1>
        <JobList />
      </div>
    </Provider>
  );
}

export default App;
