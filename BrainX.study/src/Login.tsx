import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function Login({ onLogin, onGoToRegister }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5132/api/auth/login", {
        Email: email,
        Senha: senha,
      });
      // === NOVIDADE AQUI === Salva o ID do usuário logado
      localStorage.setItem("userId", res.data.userId);
      onLogin();
    } catch (error: any) {
      console.error("ERRO DETALHADO:", error.response?.data || error.message);
      const mensagemErro = error.response?.data?.message || "Erro de conexão com o servidor";
      alert(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-fixed/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-surface-container-lowest rounded-3xl shadow-[0_24px_64px_rgba(0,64,161,0.12)] border border-primary/5 p-10">
          
          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center mb-5 shadow-lg shadow-primary/25"
            >
              <Sparkles size={28} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight text-primary font-headline">
              BrainX
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              The Cognitive Sanctuary
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-on-surface font-headline">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Faça login para continuar seus estudos
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-surface-container-low rounded-2xl py-4 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-surface-container-low rounded-2xl py-4 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <a href="#" className="text-xs font-semibold text-primary hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-2xl shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Entrar
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-xs text-outline">ou</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          <p className="text-center text-sm text-on-surface-variant">
            Não tem uma conta?{" "}
            <button onClick={onGoToRegister} className="text-primary font-bold hover:underline">
              Cadastre-se grátis
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}