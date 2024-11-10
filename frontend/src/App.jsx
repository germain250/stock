import { AuthProvider } from './context/AuthContext'; 
import AppRouter from './router';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRouter />  
      </div>
    </AuthProvider>
  );
}

export default App;
