
import Diagram from 'components/Diagram';
import './App.css';
import Header from 'components/Header';
import Form from 'components/Form';
import Costs from 'components/Costs';

function App() {
  return (
    <div className="App">
      <Header />
      <Diagram />
      <Form />
      <Costs />
    </div>
  );
}

export default App;
