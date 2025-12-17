import { Provider } from 'react-redux';
import { mystore } from './redux/store';
import AppNavigator from './navigation/index';

export default function App() {
  return (
    <Provider store={mystore}>
   < AppNavigator />
    </Provider>
  );
}

