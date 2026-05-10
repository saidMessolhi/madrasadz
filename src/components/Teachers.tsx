import React, { useState } from 'react';
import { Plus, UserCheck, Calculator, Clock, Star, Save } from 'lucide-react';
import { cn } from '../lib/utils';
import Modal from './ui/Modal';

export default function Teachers() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إضافة الأستاذ بنجاح!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">إدارة الأساتذة</h1>
          <p className="text-slate-500 font-medium tracking-tight">بيانات الطاقم التعليمي وتوزيع الحصص</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          أستاذ جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group p-1">
            <div className="p-5">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-indigo-200 transition-colors">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=T${i}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">أستاذ افتراضي {i}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest text-center">الرياضيات</span>
                      <span className="text-[10px] text-slate-400 font-bold">• ثانوي</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md uppercase tracking-wider">نشط</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold">4.8</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">الساعات الأسبوعية</span>
                  </div>
                  <span className="font-bold text-slate-700 text-xs leading-none">12 ساعة</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calculator className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">نظام المستحقات</span>
                  </div>
                  <span className="font-bold text-indigo-600 text-xs leading-none">نسبة (35%)</span>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between rounded-b-xl">
              <button 
                onClick={() => alert(`تعديل ملف الأستاذ رقم ${i}`)}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
              >تعديل الملف</button>
              <button 
                onClick={() => alert(`عرض جدول الأستاذ رقم ${i}`)}
                className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center gap-1.5"
              >
                عرض الجدول
                <Clock className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="إضافة أستاذ جديد"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">الاسم الكامل</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
              placeholder="مثال: د. أحمد لعمري" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">المادة</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="الرياضيات" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">الهاتف</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="06XX XX XX XX" 
              />
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
