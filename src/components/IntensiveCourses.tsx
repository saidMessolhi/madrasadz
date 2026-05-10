import React, { useState } from 'react';
import { Plus, GraduationCap, Calendar, DollarSign, Users, Copy, Trash2, Edit3, ArrowRight, BookOpen, Save } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import Modal from './ui/Modal';

export default function IntensiveCourses() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRegistrantsModalOpen, setIsRegistrantsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleOpenRegistrants = (course: any) => {
    setSelectedCourse(course);
    setIsRegistrantsModalOpen(true);
  };

  const courses = [
    { 
      id: '1', 
      name: 'مراجعة BEM 2026 - فيزياء', 
      subject: 'فيزياء', 
      level: 'متوسط (رابعة)', 
      start: '2026-05-15', 
      end: '2026-05-25', 
      price: 4500, 
      sessions: 10,
      studentsCount: 24,
      maxStudents: 30,
      status: 'قادم',
      color: 'indigo'
    },
    { 
      id: '2', 
      name: 'دورة تقنيات الذاكرة للبكالوريا', 
      subject: 'تطوير مهارات', 
      level: 'ثانوي (جميع الشعب)', 
      start: '2026-05-01', 
      end: '2026-05-12', 
      price: 6000, 
      sessions: 8,
      studentsCount: 45,
      maxStudents: 50,
      status: 'جارية',
      color: 'emerald'
    },
    { 
      id: '3', 
      name: 'اللغة الإنجليزية المكثفة - مستوى 1', 
      subject: 'الإنجليزية', 
      level: 'متوسط + ثانوي', 
      start: '2026-06-01', 
      end: '2026-06-30', 
      price: 8000, 
      sessions: 20,
      studentsCount: 15,
      maxStudents: 25,
      status: 'مكتملة',
      color: 'slate'
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إنشاء الدورة بنجاح!');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">الدورات المكثفة (Stages)</h1>
          <p className="text-slate-500 font-medium tracking-tight">إدارة المراجعات النهائية والبرامج الخاصة</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          إنشاء دورة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                      course.status === 'جارية' ? "bg-emerald-50 text-emerald-700" :
                      course.status === 'قادم' ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-500"
                    )}>{course.status}</span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-tight">REF-{course.id}092</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{course.subject}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>
                <div className="text-left bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xl font-black text-slate-800 leading-none">{formatCurrency(course.price)}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">للمشارك الواحد</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Calendar, label: 'المدة', value: '١٠ أيام' },
                  { icon: GraduationCap, label: 'مجموع الحصص', value: `${course.sessions} حصة` },
                  { icon: Users, label: 'المقاعد', value: `${course.studentsCount}/${course.maxStudents}` },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50/50 border border-slate-100/50">
                    <stat.icon className="w-4 h-4 text-slate-300 mb-1" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-xs font-bold text-slate-700">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-400">حالة الامتلاء</span>
                  <span className="text-indigo-600">{Math.round((course.studentsCount / course.maxStudents) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-1000" 
                    style={{ width: `${(course.studentsCount / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-4">
                <button 
                  onClick={() => alert(`تعديل الدورة: ${course.name}`)}
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert(`نسخ رابط الدورة: ${course.name}`)}
                  className="text-slate-400 hover:text-amber-600 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert(`حذف الدورة: ${course.name}`)}
                  className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => handleOpenRegistrants(course)}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:gap-2 transition-all"
              >
                إدارة المسجلين
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="إنشاء دورة مكثفة جديدة"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">عنوان الدورة</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
              placeholder="مثال: مراجعة نهائية في العلوم" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">السعر (دج)</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="5000" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">عدد المقاعد</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-slate-700" 
                placeholder="20" 
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            فتح التسجيلات
          </button>
        </form>
      </Modal>
      
      {/* Manage Registrants Modal */}
      <Modal 
        isOpen={isRegistrantsModalOpen} 
        onClose={() => setIsRegistrantsModalOpen(false)} 
        title={`المسجلون في: ${selectedCourse?.name}`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-left" dir="rtl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">نسبة الامتلاء</span>
              <p className="text-lg font-black text-slate-800">{selectedCourse?.studentsCount} / {selectedCourse?.maxStudents}</p>
            </div>
          </div>

          <div className="space-y-3">
             {/* Mock data list */}
            {[
              { id: 1, name: 'سيف الدين بوزيد', status: 'مدفوع', date: '٢٠٢٦-٠٥-٠٥' },
              { id: 2, name: 'مريم قدور', status: 'جزئي', date: '٢٠٢٦-٠٥-٠٦' },
              { id: 3, name: 'عبد الجليل علواني', status: 'غير مدفوع', date: '٢٠٢٦-٠٥-٠٧' },
            ].map((reg) => (
              <div key={reg.id} className="p-4 bg-white border border-slate-100 rounded-xl flex items-center justify-between hover:border-indigo-200 transition-colors" dir="rtl">
                <div>
                  <p className="font-bold text-slate-800">{reg.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">تسجيل: {reg.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tight",
                    reg.status === 'مدفوع' ? "bg-emerald-50 text-emerald-600" : 
                    reg.status === 'جزئي' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {reg.status}
                  </span>
                  <button 
                    onClick={() => alert(`تعديل حالة دفع تلميذ ${reg.name}`)}
                    className="p-1.5 text-slate-300 hover:text-indigo-600 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
             <button 
              onClick={() => {
                alert('جاري تصدير قائمة الحضور بصيغة PDF/Excel...');
                setIsRegistrantsModalOpen(false);
              }}
              className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all hover:bg-slate-800"
             >
                تصدير القائمة
             </button>
             <button 
              onClick={() => setIsRegistrantsModalOpen(false)}
              className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all hover:bg-slate-200"
             >
                إغلاق
             </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
