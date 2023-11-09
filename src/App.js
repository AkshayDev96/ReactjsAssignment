import './App.css';
import Box from './UserForm';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { store } from './store'
import { Provider } from 'react-redux'
import ViewUsers from './ViewUsers';

function App() {
  return (
    <Provider store={store}>
    <PrimeReactProvider>
    <div className="container">
      {/* <Demo/> */}
      <Box/>
    </div>
    <div className='container-fluid' style={{maxWidth:"60%",overflow:'auto'}}>
    <ViewUsers/>

    </div>
    </PrimeReactProvider>
    </Provider>
  );
}

export default App;
