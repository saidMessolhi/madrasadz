export type UserRole = 'admin' | 'receptionist' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: number;
}

export interface Student {
  id: string;
  name: string;
  level: 'elementary' | 'middle' | 'high';
  branch?: string;
  phone: string;
  enrolledSince: number;
  isActive: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  subjects: string[]; // Subject IDs or names
  payType: 'hourly' | 'percentage';
  payRate: number; // hourly rate or percentage value
  phone: string;
}

export interface Subject {
  id: string;
  name: string;
  level: 'elementary' | 'middle' | 'high';
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
}

export interface Session {
  id: string;
  subjectId: string;
  teacherId: string;
  roomId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  attendance: string[]; // Array of student IDs
}

export interface IntensiveCourse {
  id: string;
  name: string;
  subjectId: string;
  level: string;
  startDate: string;
  endDate: string;
  price: number;
  totalSessions: number;
}

export interface Payment {
  id: string;
  studentId: string;
  type: 'monthly' | 'intensive';
  targetId: string; // Course ID or Subject/Month ID
  amount: number;
  date: number;
  status: 'paid' | 'partial' | 'pending';
  receivedBy: string; // User ID
}
