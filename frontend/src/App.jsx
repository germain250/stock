import { AuthProvider } from './context/AuthContext';
import AppRouter from './router';
import NavBar from './components/NavBar';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <AppRouter />  
      </div>
    </AuthProvider>
  );
}

export default App;
