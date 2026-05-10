import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  CreditCard, 
  ArrowUpRight,
  GraduationCap,
  Plus,
  Calendar,
  Save,
  FileText
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import Modal from './ui/Modal';

const data = [
  { name: 'سبت', students: 400, revenue: 2400 },
  { name: 'أحد', students: 300, revenue: 1398 },
  { name: 'اثنين', students: 200, revenue: 9800 },
  { name: 'ثلاثاء', students: 278, revenue: 3908 },
  { name: 'أربعاء', students: 189, revenue: 4800 },
  { name: 'خميس', students: 239, revenue: 3800 },
  { name: 'جمعة', students: 349, revenue: 4300 },
];

const StatCard = ({ title, value, detail, color }: { title: string, value: string | number, detail: string, color: string }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <div className="flex items-end justify-between mt-1">
      <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
      <div className={cn("p-2 rounded-lg font-bold", color)}>
        <TrendingUp className="w-5 h-5 text-indigo-600" />
      </div>
    </div>
    <p className={cn("text-xs mt-3 flex items-center gap-1 font-bold", detail.includes('+') ? "text-green-600" : "text-amber-600")}>
      {detail}
    </p>
  </div>
);

export default function Dashboard({ role = 'receptionist' }: { role?: string }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const isStaff = role === 'admin' || role === 'receptionist';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ البيانات بنجاح!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">مرحباً بك مجدداً</h1>
          <p className="text-slate-500 font-medium tracking-tight">
            {role === 'admin' ? 'إليك نظرة شاملة على أداء المؤسسة اليوم' : 
             role === 'teacher' ? 'إليك جدول حصصك وطلابك لهذا اليوم' : 
             'إليك ملخص سريع لعمليات التسجيل والحضور اليوم'}
          </p>
        </div>
        {isStaff && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            إضافة سجل جديد
          </button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {role === 'teacher' ? (
          <>
            <StatCard title="حصص اليوم" value="٤" detail="أول حصة تبدأ على ٠٩:٠٠" color="bg-indigo-50 text-indigo-600" />
            <StatCard title="مجموع الطلاب" value="٨٥" detail="عبر ٣ مستويات مختلفة" color="bg-blue-50 text-blue-600" />
            <StatCard title="تقييم الأداء" value="٤.٩" detail="استناداً لآخر ٢٠ تقييم" color="bg-emerald-50 text-emerald-600" />
            <StatCard title="ساعات العمل" value="١٢" detail="هذا الأسبوع حتى الآن" color="bg-amber-50 text-amber-600" />
          </>
        ) : (
          <>
            <StatCard title="إجمالي التلاميذ" value="١,٢٤٠" detail="+١٢ تلميذ جديد هذا الشهر" color="bg-indigo-50 text-indigo-600" />
            <StatCard title="المعلمون" value="٨٦" detail="بنسبة ١:١٤ لكل طالب" color="bg-blue-50 text-blue-600" />
            <StatCard title="الحضور اليومي" value="٩٤.٥٪" detail="-١.٢٪ عن يوم أمس" color="bg-emerald-50 text-emerald-600" />
            <StatCard title="الحافلات المدرسية" value="١٨" detail="جميعها في الخدمة حالياً" color="bg-amber-50 text-amber-600" />
          </>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area based on Role */}
        <div className="lg:col-span-2 space-y-6">
          {role === 'teacher' ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">حصصك القادمة اليوم</h4>
                <Link to="/sessions" className="text-indigo-600 text-sm font-bold hover:underline">عرض الجدول الكامل</Link>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { time: '٠٩:٠٠ - ١٠:٣٠', subject: 'رياضيات - ٢ ثانوي', room: 'قاعة ٠٤', status: 'بعد ١٥ دقيقة' },
                  { time: '١١:٠٠ - ١٢:٣٠', subject: 'رياضيات - ٣ ثانوي', room: 'قاعة ٠٩', status: 'قادم' }
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-col leading-none">
                        <span>{s.time.split(' - ')[0]}</span>
                        <div className="w-4 h-[1px] bg-indigo-400 my-1"></div>
                        <span>{s.time.split(' - ')[1]}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{s.subject}</p>
                        <p className="text-xs text-slate-400 font-medium">{s.room}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-1 rounded-md border border-indigo-100">{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-bold text-slate-700">آخر تحديثات الطلاب والمدفوعات</h4>
                <Link to="/students" className="text-indigo-600 text-sm font-bold hover:underline">عرض الكل</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-3">اسم التلميذ</th>
                      <th className="px-6 py-3">المستوى / الفصل</th>
                      <th className="px-6 py-3">الحالة</th>
                      <th className="px-6 py-3 text-left">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100 font-medium">
                    {[
                      { name: 'سارة خالد العتيبي', level: 'الثاني متوسط - أ', status: 'دفع جزئي', color: 'blue', amount: 2000 },
                      { name: 'أحمد لعمري', level: 'الثالث ابتدائي - ج', status: 'سداد كامل', color: 'green', amount: 5000 },
                      { name: 'ليلى يوسف الصالح', level: 'الأول ثانوي - ب', status: 'تسجيل جديد', color: 'orange', amount: 0 },
                      { name: 'عبدالعزيز فهد القحطاني', level: 'الخامس ابتدائي - أ', status: 'غرامة تأخير', color: 'red', amount: 500 },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 font-bold text-slate-900 group-hover:text-indigo-600">{row.name}</td>
                        <td className="px-6 py-4 text-slate-500">{row.level}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-md text-[10px] font-bold",
                            row.color === 'blue' ? "bg-blue-50 text-blue-700" :
                            row.color === 'green' ? "bg-green-50 text-green-700" :
                            row.color === 'orange' ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"
                          )}>{row.status}</span>
                        </td>
                        <td className="px-6 py-4 text-left font-mono font-bold text-slate-600">
                          {row.amount > 0 ? formatCurrency(row.amount) : '---'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg shadow-indigo-200">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Calendar className="w-5 h-5 text-indigo-300" /> مفكرة التنبيهات
            </h4>
            <div className="space-y-4">
              {[
                { label: 'تسليم نقاط اختبار الرياضيات', time: 'الإثنين، ٠٩:٠٠' },
                { label: 'اجتماع أولياء الأمور (متوسط)', time: 'الثلاثاء، ١٦:٣٠' },
                { label: 'بداية التسجيل للدورات الصيفية', time: 'الخميس، ١٠:٠٠' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-indigo-800 pb-2">
                  <span className="text-[10px] text-indigo-200 font-medium max-w-[140px] truncate">{item.label}</span>
                  <span className="text-[9px] font-bold bg-indigo-800 px-2 py-1 rounded tracking-tight">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex-1 flex flex-col">
            <h4 className="font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">إحصائيات {role === 'teacher' ? 'الطلاب الجدد' : 'توزيع المستويات'}</h4>
            <div className="space-y-6 flex-1">
              {[
                { name: 'الابتدائي', val: 45, color: 'bg-indigo-500' },
                { name: 'المتوسط', val: 30, color: 'bg-blue-400' },
                { name: 'الثانوي', val: 25, color: 'bg-emerald-400' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-bold mb-1 text-slate-600 uppercase tracking-widest">
                    <span>{item.name}</span>
                    <span>{item.val}٪</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            {role === 'admin' && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                 <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full py-2 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors"
                >
                  عرض التقرير السنوي
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="إضافة سجل جديد للنظام"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">نوع السجل</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 outline-none focus:border-indigo-600 transition-colors">
              <option>تسجيل تلميذ جديد</option>
              <option>عملية دفع</option>
              <option>غياب معلم</option>
              <option>تعديل جدول</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">الوصف / ملاحظات</label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 outline-none focus:border-indigo-600 transition-colors h-24"
              placeholder="اكتب التفاصيل هنا..."
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
          >
            <Save className="w-5 h-5" />
            حفظ البيانات
          </button>
        </form>
      </Modal>

      {/* Annual Report Modal */}
      <Modal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        title="التقرير المالي والإداري السنوي"
      >
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-800">تقرير السنة الدراسية ٢٠٢٥-٢٠٢٦</p>
              <p className="text-xs text-slate-500 font-medium tracking-tight">آخر تحديث: منذ يومين</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">إجمالي المداخيل</p>
              <p className="text-xl font-black text-indigo-900 tracking-tight">٤،٥٠٠،٠٠٠ دج</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">نسبة النجاح</p>
              <p className="text-xl font-black text-emerald-900 tracking-tight">٩٢٪</p>
            </div>
          </div>

          <button 
            onClick={() => {
              alert('جاري البدء في تحميل ملف PDF...');
              setIsReportModalOpen(false);
            }}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
          >
            تحميل التقرير الكامل (PDF)
          </button>
        </div>
      </Modal>
    </div>
  );
}
