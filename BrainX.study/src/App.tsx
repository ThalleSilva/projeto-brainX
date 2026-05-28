import { useState } from "react";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Dashboard from "./Dashboard";

export default function App() {
  const [view, setView] = useState<'login' | 'register' | 'dashboard'>('login');

  if (view === 'dashboard') {
    // Passamos a função de voltar para o login aqui
    return <Dashboard onLogout={() => setView('login')} />;
  }

  if (view === 'register') {
    return <Cadastro onRegister={() => setView('login')} onGoToLogin={() => setView('login')} />;
  }

  return <Login onLogin={() => setView('dashboard')} onGoToRegister={() => setView('register')} />;
}