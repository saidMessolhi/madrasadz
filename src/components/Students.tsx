import React from 'react';
import { Plus, Search, Filter, MoreVertical, Phone, X, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import Modal from './ui/Modal';

export default function Students({ role = 'receptionist' }: { role?: string }) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const isStaff = role === 'admin' || role === 'receptionist';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إضافة التلميذ بنجاح!');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">إدارة التلاميذ</h1>
          <p className="text-slate-500 mt-1 font-medium">إضافة، تعديل، ومتابعة تلاميذ المدرسة</p>
        </div>
        {isStaff && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 font-bold hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>تلميذ جديد</span>
          </button>
        )}
      </div>

      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="إضافة تلميذ جديد"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">الاسم واللقب</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="محمد علي" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">رقم الهاتف</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-mono font-bold text-slate-700" 
                placeholder="05XX XX XX XX" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">المستوى</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700">
                <option>ابتدائي</option>
                <option>متوسط</option>
                <option>ثانوي</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">الشعبة (للثانوي)</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="علوم تجريبية" 
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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="البحث عن تلميذ باسمه أو رقم هاتفه..." 
              className="w-full pr-10 pl-4 py-2.5 bg-slate-100 border-none rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-slate-100 border-none text-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-xs uppercase tracking-wider">
              <option>جميع المستويات</option>
              <option>ابتدائي</option>
              <option>متوسط</option>
              <option>ثانوي</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 italic">
                <th className="px-6 py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">التلميذ</th>
                <th className="px-6 py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">المستوى / الشعبة</th>
                <th className="px-6 py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">رقم الهاتف</th>
                <th className="px-6 py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">تاريخ التسجيل</th>
                <th className="px-6 py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center">الحالة</th>
                <th className="px-6 py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {i}
                      </div>
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600">تلميذ افتراضي {i}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700 text-xs">ثانوي</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase">علوم تجريبية</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs">0555 00 00 {i}0</td>
                  <td className="px-6 py-4 text-slate-400 text-xs font-medium">2026-05-10</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-50 text-green-700 uppercase tracking-wider">نشط</span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">عرض 6 من أصل 1,280 تلميذ</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg font-bold border border-slate-100 cursor-not-allowed">السابق</button>
            <button className="px-4 py-2 bg-white text-slate-700 rounded-lg font-bold border border-slate-200 hover:bg-slate-50">التالي</button>
          </div>
        </div>
      </div>
    </div>
  );
}
