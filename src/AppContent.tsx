import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserRound, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Search,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useAuth } from './contexts/AuthContext';

// Pages
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Subjects from './components/Subjects';
import Sessions from './components/Sessions';
import Payments from './components/Payments';
import IntensiveCourses from './components/IntensiveCourses';

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean, key?: string }) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 px-6 py-3 transition-all duration-200 group text-sm font-medium",
      active 
        ? "bg-indigo-600 text-white border-r-4 border-indigo-400" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-white" : "text-slate-500 group-hover:text-slate-300")} />
    <span>{label}</span>
  </Link>
);

export default function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();

  const role = user?.role || 'receptionist';

  const menuItems = [
    { to: "/", icon: LayoutDashboard, label: "لوحة التحكم", roles: ['admin', 'receptionist', 'teacher'] },
    { to: "/students", icon: Users, label: "شؤون التلاميذ", roles: ['admin', 'receptionist'] },
    { to: "/teachers", icon: UserRound, label: "الهيئة التدريسية", roles: ['admin'] },
    { to: "/subjects", icon: BookOpen, label: "المواد التعليمية", roles: ['admin'] },
    { to: "/sessions", icon: Calendar, label: "الجداول الدراسية", roles: ['admin', 'receptionist', 'teacher'] },
    { to: "/intensive", icon: GraduationCap, label: "الدورات المكثفة", roles: ['admin', 'receptionist'] },
    { to: "/payments", icon: CreditCard, label: "الشؤون المالية", roles: ['admin', 'receptionist'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden" dir="rtl">
      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "inset-y-0 right-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 transition-transform duration-300 transform lg:relative lg:translate-x-0 no-print",
          !isSidebarOpen && "translate-x-full lg:hidden"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-900/50">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">ديزاد سبورت</span>
        </div>

        <nav className="flex-1 py-6">
          <div className="px-6 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">القائمة الرئيسية</div>
          {filteredMenu.map((item) => (
            <SidebarItem 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.to} 
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="User" />
            </div>
            <div className="text-xs">
              <p className="text-white font-medium truncate max-w-[100px]">{user?.name}</p>
              <p className="text-slate-500">{role === 'admin' ? 'مدير النظام' : role === 'teacher' ? 'أستاذ' : 'موظف استقبال'}</p>
            </div>
            <button className="mr-auto p-1.5 text-slate-500 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 no-print">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden md:flex items-center bg-slate-100 rounded-md px-4 py-2 w-full max-w-md group focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="w-4 h-4 text-slate-400 ml-2" />
              <input 
                type="text" 
                placeholder="البحث عن تلميذ، معلم، أو ملف..." 
                className="bg-transparent border-none text-sm w-full outline-none" 
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 italic">أهلا بك {user?.name.split(' ')[0]}</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-bold uppercase tracking-wider">نشط</span>
            </div>
            <div className="flex items-center gap-1 border-r border-slate-200 pr-6 mr-4 h-8">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button 
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 printable-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.15 }}
              className="max-w-7xl mx-auto h-full"
            >
              <Routes>
                <Route path="/" element={<Dashboard role={role} />} />
                {role === 'admin' && (
                  <>
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/subjects" element={<Subjects />} />
                  </>
                )}
                {(role === 'admin' || role === 'receptionist') && (
                  <>
                    <Route path="/students" element={<Students />} />
                    <Route path="/intensive" element={<IntensiveCourses />} />
                    <Route path="/payments" element={<Payments />} />
                  </>
                )}
                <Route path="/sessions" element={<Sessions role={role} />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
