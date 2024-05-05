import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import JobList from './components/JobList';
import Filters from './components/Filters';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Filters />
        <JobList />
      </div>
    </Provider>
  );
}

export default App;
