import Routers from "./Routes/Routers";
import { Provider } from 'react-redux';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}

export default App;
