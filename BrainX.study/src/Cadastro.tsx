import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function Cadastro({ onRegister, onGoToLogin }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    
    setLoading(true);
    try {
      await axios.post("http://localhost:5132/api/auth/register", {
        Email: email,
        Senha: senha,
      });
      alert("Cadastro realizado com sucesso!");
      onRegister();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md px-6">
        <div className="bg-surface-container-lowest rounded-3xl shadow-[0_24px_64px_rgba(0,64,161,0.12)] border border-primary/5 p-10">
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center mb-5">
              <Sparkles size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-primary font-headline">Cadastre-se</h1>
            <p className="text-sm text-on-surface-variant mt-1">Crie sua conta para começar</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low rounded-2xl py-4 pl-12 pr-4 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <input
                type="password"
                placeholder="Crie uma senha forte"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-surface-container-low rounded-2xl py-4 pl-12 pr-4 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Carregando..." : <>Criar Conta <ArrowRight size={18} /></>}
          </motion.button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-xs text-outline">ou</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          <p className="text-center text-sm text-on-surface-variant">
            Já tem uma conta?{" "}
            <button onClick={onGoToLogin} className="text-primary font-bold hover:underline">
              Fazer login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}