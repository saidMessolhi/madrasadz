import React, { useState } from 'react';
import { Plus, BookOpen, User, Layers, ArrowRight, Star, Save } from 'lucide-react';
import { cn } from '../lib/utils';
import Modal from './ui/Modal';

export default function Subjects() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const subjects = [
    { id: 1, name: 'الرياضيات', teacher: 'أحمد بن علي', level: 'ثانوي / متوسط', students: 245, sessions: 18, color: 'indigo' },
    { id: 2, name: 'الفيزياء', teacher: 'سارة لعمري', level: 'ثانوي', students: 180, sessions: 12, color: 'blue' },
    { id: 3, name: 'اللغة العربية', teacher: 'محمد بوشيخ', level: 'جميع الأطوار', students: 320, sessions: 25, color: 'emerald' },
    { id: 4, name: 'الإنجليزية', teacher: 'إيمان قادري', level: 'ابتدائي + متوسط', students: 115, sessions: 10, color: 'amber' },
    { id: 5, name: 'علوم الطبيعة والحياة', teacher: 'خالد منصف', level: 'ثانوي (علوم)', students: 95, sessions: 8, color: 'rose' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إضافة المادة بنجاح!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">المواد التعليمية</h1>
          <p className="text-slate-500 font-medium tracking-tight">إدارة المواد، الربط مع الأساتذة والمستويات</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          إضافة مادة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col">
            <div className={cn("h-1.5 w-full", sub.color === 'indigo' ? "bg-indigo-500" : sub.color === 'blue' ? "bg-blue-500" : sub.color === 'emerald' ? "bg-emerald-500" : sub.color === 'amber' ? "bg-amber-500" : "bg-rose-500")}></div>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{sub.name}</h3>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                     <Layers className="w-3.5 h-3.5" />
                     {sub.level}
                   </div>
                </div>
                <button 
                  onClick={() => alert(`إحصائيات مادة ${sub.name}`)}
                  className={cn("p-2.5 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors")}
                >
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${sub.teacher}`} alt={sub.teacher} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">الأستاذ(ة) المشرف</p>
                  <p className="text-sm font-bold text-slate-700">{sub.teacher}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-2 border border-slate-100 rounded-lg">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">الطلاب</p>
                  <p className="text-sm font-black text-slate-800 tracking-tight">{sub.students}</p>
                </div>
                <div className="p-2 border border-slate-100 rounded-lg">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">حصص / أسبوع</p>
                  <p className="text-sm font-black text-slate-800 tracking-tight">{sub.sessions}</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => alert(`عرض تفاصيل مادة ${sub.name}`)}
              className="w-full py-3 bg-slate-50 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              التفاصيل والتقارير
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="إضافة مادة تعليمية جديدة"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">اسم المادة</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
              placeholder="مثال: الفلسفة" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">المستوى المستهدف</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700">
                <option>ابتدائي</option>
                <option>متوسط</option>
                <option>ثانوي</option>
                <option>جميع المستويات</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">الأستاذ المشرف</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700">
                <option>أحمد بن علي</option>
                <option>سارة لعمري</option>
                <option>محمد بوشيخ</option>
              </select>
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            حفظ البيانات
          </button>
        </form>
      </Modal>
    </div>
  );
}

