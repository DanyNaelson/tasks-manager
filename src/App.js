import './App.css';
import MainContainer from './containers/MainContainer';
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Container fluid className="App">
      <MainContainer />
    </Container>
  );
}

export default App;
