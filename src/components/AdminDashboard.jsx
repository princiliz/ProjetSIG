import React, { useState } from 'react';
import {
  Layout,
  BarChart3,
  Users,
  BoxIcon,
  Settings,
  Search,
  Shield,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import PollingStations from './PollingStations';

// Layout principal de l'admin
const AdminDashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('bureaux');

  const themeClasses = {
    mainBg: isDark ? 'bg-slate-900' : 'bg-slate-50',
    cardBg: isDark ? 'bg-slate-800' : 'bg-white',
    text: isDark ? 'text-white' : 'text-slate-800',
    secondaryText: isDark ? 'text-slate-300' : 'text-slate-600',
    sidebarBg: isDark ? 'bg-slate-800' : 'bg-white',
    border: isDark ? 'border-slate-700' : 'border-slate-200',
    hover: isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
  };

  const navigationItems = [
    { id: 'bureaux', label: 'Bureaux de vote', icon: Layout },
    { id: 'resultats', label: 'Résultats', icon: BarChart3 },
    { id: 'scrutateurs', label: 'Scrutateurs', icon: Users },
    { id: 'centres', label: 'Centres de vote', icon: BoxIcon },
    { id: 'securite', label: 'Sécurité', icon: Shield },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'bureaux':
        return <PollingStations themeClasses={themeClasses} />;
      default:
        return <PollingStations themeClasses={themeClasses} />;
    }
  };

  return (
    <div className={`h-screen flex ${themeClasses.mainBg}`}>
      {/* Sidebar */}
      <div className={`
        ${themeClasses.sidebarBg} ${themeClasses.border}
        fixed lg:static inset-y-0 left-0 z-50
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300
        w-64 border-r
      `}>
        {/* Logo */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-teal-500" />
            <span className={`text-lg font-bold ${themeClasses.text}`}>Admin Electoral</span>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className={`h-6 w-6 ${themeClasses.text}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                  ${activeSection === item.id 
                    ? 'bg-teal-500 text-white' 
                    : `${themeClasses.text} ${themeClasses.hover}`
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${themeClasses.border}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-white font-medium">AA</span>
            </div>
            <div>
              <p className={`font-medium ${themeClasses.text}`}>Admin Alpha</p>
              <p className={`text-sm ${themeClasses.secondaryText}`}>admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className={`${themeClasses.cardBg} border-b ${themeClasses.border} py-4 px-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className={`h-6 w-6 ${themeClasses.text}`} />
              </button>
              <h1 className={`text-xl font-bold ${themeClasses.text}`}>
                {navigationItems.find(item => item.id === activeSection)?.label}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle 
                isDark={isDark} 
                onToggle={() => setIsDark(!isDark)}
                position="relative"
              />
              <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;