import React, { useState } from 'react';
import { Plus, CreditCard, ArrowUpRight, ArrowDownRight, Search, Filter, FileText, Download, Save } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import Modal from './ui/Modal';

export default function Payments() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const transactions = [
    { id: 1, student: 'أحمد بن علي', type: 'اشتراك شهري', item: 'الرياضيات', date: '٢٠٢٦-٠٥-١٠', amount: 3500, method: 'نقداً', status: 'مكتمل' },
    { id: 2, student: 'سارة لعمري', type: 'دورة مكثفة', item: 'فيزياء باك', date: '٢٠٢٦-٠٥-١٠', amount: 5000, method: 'بريدي موب', status: 'مكتمل' },
    { id: 3, student: 'محمد بوشيخ', type: 'اشتراك شهري', item: 'اللغة العربية', date: '٢٠٢٦-٠٥-٠٩', amount: 2500, method: 'نقداً', status: 'معلق' },
    { id: 4, student: 'إيمان قادري', type: 'تسجيل', item: 'رسوم سنوية', date: '٢٠٢٦-٠٥-٠٩', amount: 2000, method: 'نقداً', status: 'مكتمل' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم تسجيل عملية الدفع بنجاح! جاري طباعة الوصل...');
    setIsAddModalOpen(false);
  };

  const handleExport = () => {
    alert('جاري توليد تقرير المدفوعات بصيغة CSV/PDF...');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">المدفوعات والمستحقات</h1>
          <p className="text-slate-500 font-medium tracking-tight">متابعة المداخيل، الفواتير، ونظام مستحقات الأساتذة</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            تصدير التقرير
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            دفع جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">مداخيل اليوم</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{formatCurrency(13500)}</h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-green-600 font-bold mt-2">▲ ٨٪ مقارنة بنفس اليوم من الأسبوع الماضي</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">المدفوعات المعلقة</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{formatCurrency(45000)}</h3>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-amber-600 font-bold mt-2">١٢ تلميذ لم يسددوا حقوق الشهر</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">مستحقات الأساتذة</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{formatCurrency(82000)}</h3>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-indigo-600 font-bold mt-2">جاهزة للصرف نهاية هذا الأسبوع</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1 group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="البحث عن وصل دفع برقم المعاملة أو اسم التلميذ..." 
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-xs"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
             <button 
              onClick={() => alert('تصفية النتائج قيد التطوير...')}
              className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-slate-600 transition-colors shadow-sm"
             >
               <Filter className="w-4 h-4" />
             </button>
             <select className="bg-white border border-slate-200 text-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-[10px] uppercase tracking-widest shadow-sm">
              <option>جميع المعاملات</option>
              <option>مكتملة</option>
              <option>معلقة</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">
                <th className="px-6 py-4">التلميذ</th>
                <th className="px-6 py-4 text-center">نوع الدفع</th>
                <th className="px-6 py-4 text-center">الطريقة</th>
                <th className="px-6 py-4 text-center">التاريخ</th>
                <th className="px-6 py-4 text-left">المبلغ</th>
                <th className="px-6 py-4 text-center">الحالة</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {transactions.map((tr) => (
                <tr key={tr.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{tr.student}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tight">{tr.item}</div>
                  </td>
                  <td className="px-6 py-4 text-center text-xs text-slate-500 font-bold">{tr.type}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-bold rounded uppercase tracking-widest">{tr.method}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-[10px] text-slate-400 font-mono">{tr.date}</td>
                  <td className="px-6 py-4 text-left font-mono font-black text-slate-800">{formatCurrency(tr.amount)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                      tr.status === 'مكتمل' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    )}>{tr.status}</span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button 
                      onClick={() => alert(`جاري توليد ملف PDF لوصل دفع: ${tr.student}`)}
                      className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-white rounded-lg transition-all"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="تسجيل عملية دفع جديدة"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">اسم التلميذ</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
              placeholder="البحث عن تلميذ..." 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">المبلغ (دج)</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="2500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">طريقة الدفع</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700">
                <option>نقداً</option>
                <option>بريدي موب</option>
                <option>شيك</option>
              </select>
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            حفظ وطباعة الوصل
          </button>
        </form>
      </Modal>
    </div>
  );
}

