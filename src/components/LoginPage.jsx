import React, { useState } from 'react';
import { ShieldCheck, Vote, Users, Lock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const ColorBar = () => (
  <div className="absolute top-0 left-0 right-0 h-2 flex z-20">
    <div className="flex-1 bg-green-500"></div>
    <div className="flex-1 bg-red-500"></div>
    <div className="flex-1 bg-yellow-500"></div>
  </div>
);

const BackgroundDecoration = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="grid grid-cols-12 gap-8 absolute inset-0 opacity-10">
      {Array(48).fill().map((_, i) => (
        <div key={i} className="w-3 h-3 bg-slate-400 rounded-full animate-pulse" 
             style={{animation: `pulse ${2 + (i % 3)}s infinite ${i * 0.1}s`}} />
      ))}
    </div>
  </div>
);

const LoginPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'scrutateur'
  });
  const [focusedField, setFocusedField] = useState(null);

    // Classes dynamiques basées sur le thème
    const themeClasses = {
      mainBg: isDark 
        ? "bg-gradient-to-br from-slate-900 to-slate-800" 
        : "bg-gradient-to-br from-slate-50 to-slate-100",
      cardBg: isDark 
        ? "bg-white/10 backdrop-blur-xl" 
        : "bg-white",
      inputBg: isDark 
        ? "bg-white/5" 
        : "bg-slate-50",
      inputText: isDark 
        ? "text-white placeholder:text-gray-500" 
        : "text-slate-700 placeholder:text-slate-400",
      inputBorder: isDark 
        ? "border-gray-700" 
        : "border-slate-200",
      iconColor: isDark 
        ? "text-gray-400" 
        : "text-slate-400",
      iconActiveColor: isDark 
        ? "text-teal-400" 
        : "text-teal-600",
      linkText: isDark 
        ? "text-gray-400 hover:text-teal-400" 
        : "text-slate-500 hover:text-teal-600",
      leftPanelBg: isDark 
        ? "bg-white" 
        : "bg-slate-50",
      overlayBg: isDark 
        ? "bg-black/20" 
        : "bg-black/10",
      titleBox: isDark 
        ? "bg-black/60 backdrop-blur-sm" 
        : "bg-white/80 backdrop-blur-sm shadow-lg",
      titleText: isDark 
        ? "text-white" 
        : "text-slate-800",
      subtitleText: isDark 
        ? "text-gray-100" 
        : "text-slate-600",
      selectOptions: isDark 
        ? "bg-slate-800" 
        : "bg-white"
    };  

  return (
    <div className={`min-h-screen ${themeClasses.mainBg} flex items-center justify-center p-6`}>
      <ThemeToggle 
        isDark={isDark} 
        onToggle={() => setIsDark(!isDark)}
        position="absolute"
      />
      <BackgroundDecoration />
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-xl relative transform hover:scale-[1.02] transition-all duration-300">
        <ColorBar />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/5 opacity-50" />
        
        <div className="grid lg:grid-cols-2">
          {/* Left side - Illustrations */}
          <div className="p-12 relative hidden lg:block bg-slate-50 rounded-l-3xl z-10">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black/10 rounded-l-3xl" />
              <img 
                src="/login.jpg" 
                alt="Élection illustration"
                className="w-full h-full object-contain rounded-l-3xl"
              />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="bg-white/80 p-6 rounded-xl backdrop-blur-sm shadow-lg">
                <h1 className="text-4xl font-bold text-slate-800 mb-4 animate-fade-in">
                  Système Électoral
                </h1>
                <p className="text-slate-600 text-lg">
                  Plateforme sécurisée de gestion des élections
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-12 relative ">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-teal-100 rounded-xl">
                <ShieldCheck className="h-8 w-8 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                Connexion
              </h2>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <Users className={`absolute left-4 top-3.5 h-5 w-5 transition-colors duration-200 ${
                  focusedField === 'role' ? 'text-teal-600' : 'text-slate-400'
                }`} />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  onFocus={() => setFocusedField('role')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 outline-none"
                >
                  <option value="scrutateur" className="bg-white">Scrutateur</option>
                  <option value="admin" className="bg-white">Administrateur</option>
                </select>
              </div>

              <div className="relative group">
                <Vote className={`absolute left-4 top-3.5 h-5 w-5 transition-colors duration-200 ${
                  focusedField === 'username' ? 'text-teal-600' : 'text-slate-400'
                }`} />
                <input
                  type="text"
                  placeholder="Identifiant"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="relative group">
                <Lock className={`absolute left-4 top-3.5 h-5 w-5 transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-teal-600' : 'text-slate-400'
                }`} />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-4">
                <button className="w-full py-4 bg-gradient-to-r from-green-500 via-red-500 to-yellow-500 text-white rounded-xl font-semibold transform hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200">
                  Se connecter
                </button>
                
                <a href="#" className="block text-center text-sm text-slate-500 hover:text-teal-600 transition-colors duration-200">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;