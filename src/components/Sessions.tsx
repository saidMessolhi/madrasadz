import React, { useState } from 'react';
import { Plus, Clock, User, BookOpen, MapPin, Save, Printer } from 'lucide-react';
import { cn } from '../lib/utils';
import Modal from './ui/Modal';

export default function Sessions({ role = 'receptionist' }: { role?: string }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sessions = [
    { id: 1, time: '08:30 - 10:00', subject: 'الرياضيات', teacher: 'أحمد بن علي', room: 'القاعة ٠٤', level: '٣ ثانوي (علوم)', attendees: 24, total: 30 },
    { id: 2, time: '10:15 - 11:45', subject: 'الفيزياء', teacher: 'سارة لعمري', room: 'المخبر ٠١', level: '٢ ثانوي (تقني)', attendees: 18, total: 20 },
    { id: 3, time: '13:00 - 14:30', subject: 'اللغة العربية', teacher: 'محمد بوشيخ', room: 'القاعة ١٢', level: '٤ متوسط', attendees: 32, total: 35 },
    { id: 4, time: '14:45 - 16:15', subject: 'الإنجليزية', teacher: 'إيمان قادري', room: 'القاعة ٠٨', level: '١ ثانوي', attendees: 12, total: 15 },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إضافة الحصة إلى الجدول بنجاح!');
    setIsAddModalOpen(false);
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "جدول_الحصص_اليومي";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {role === 'teacher' ? 'جدول حصصي اليومي' : 'جدول الحصص العام'}
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">متابعة الحصص الجارية والقادمة ليوم ١٠ ماي ٢٠٢٦</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            طباعة الجدول
          </button>
          {(role === 'admin' || role === 'receptionist') && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              إضافة حصة
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400">{'<'}</button>
            <span className="font-bold text-slate-700">اليوم، الـ ١٠ من ماي</span>
            <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400">{'>'}</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">توقيت الجزائر العاصمة</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {sessions.map((session) => (
            <div key={session.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-black text-slate-800 leading-none">{session.time.split(' - ')[0]}</span>
                  <div className="h-4 w-px bg-slate-200 my-1"></div>
                  <span className="text-[10px] font-bold text-slate-400">{session.time.split(' - ')[1]}</span>
                </div>
                
                <div className="w-px h-12 bg-slate-100 hidden md:block"></div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{session.subject}</h3>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md">{session.level}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-300" />
                      <span>{session.teacher}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-300" />
                      <span>{session.room}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1 justify-end">
                    <span className="text-xs font-bold text-slate-700">{session.attendees}/{session.total}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">تلميذ حاضر</span>
                  </div>
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(session.attendees / session.total) * 100}%` }}></div>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`بدء تسجيل غيابات حصة ${session.subject}`)}
                  className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95"
                >
                  تسجيل الحضور
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="إضافة حصة دراسية جديدة"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">المادة</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700">
                <option>الرياضيات</option>
                <option>الفيزياء</option>
                <option>اللغة العربية</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">المستوى</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700">
                <option>١ ثانوي</option>
                <option>٢ ثانوي</option>
                <option>٣ ثانوي</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">الوقت</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="08:30 - 10:00" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">القاعة</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="قاعة ٠٤" 
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            تأكيد الحجز
          </button>
        </form>
      </Modal>
    </div>
  );
}
