import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const { signIn, signInAsRole } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="p-10 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-900/40 mx-auto mb-6">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">ديزاد سبورت</h1>
          <p className="text-slate-500 font-medium">نظام تسيير مدارس الدعم الخصوصي</p>
          
          <div className="mt-10 space-y-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">الدخول التجريبي (V2)</div>
            
            <div className="space-y-3 relative z-10">
              <button 
                onClick={() => signInAsRole('admin')}
                className="w-full flex items-center justify-center gap-3 bg-indigo-600 py-4 px-6 rounded-xl font-bold text-white hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
              >
                دخول كمدير النظام
              </button>
              
              <button 
                onClick={() => signInAsRole('receptionist')}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-indigo-100 py-4 px-6 rounded-xl font-bold text-slate-700 hover:bg-indigo-50 transition-all active:scale-95"
              >
                دخول كعون استقبال
              </button>
              
              <button 
                onClick={() => signInAsRole('teacher')}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-indigo-100 py-4 px-6 rounded-xl font-bold text-slate-700 hover:bg-indigo-50 transition-all active:scale-95"
              >
                دخول كأستاذ
              </button>
            </div>

            <div className="pt-6">
              <button 
                onClick={signIn}
                className="text-xs text-slate-400 hover:text-indigo-600 font-bold transition-colors"
                disabled
              >
                الدخول الرسمي المربوط بقواعد البيانات (قريباً)
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium italic">تطبيق سحابي آمن للإدارة المدرسية</p>
        </div>
      </div>
    </div>
  );
}
