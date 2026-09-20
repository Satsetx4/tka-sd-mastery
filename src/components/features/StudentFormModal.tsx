import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, School, KeyRound, ArrowRight, X, RefreshCw, Sparkles } from 'lucide-react';
import { StudentProfile } from '../../types/tka';
import { tapScale } from '../../lib/motion';

interface StudentFormModalProps {
  isOpen: boolean;
  subjectTitle: string;
  initialProfile: StudentProfile | null;
  onClose: () => void;
  onSubmit: (profile: StudentProfile) => void;
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  subjectTitle,
  initialProfile,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [nisn, setNisn] = useState('P130100230');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [tokenCode, setTokenCode] = useState('TKA2026');
  const [inputToken, setInputToken] = useState('TKA2026');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name || '');
      setSchool(initialProfile.school || '');
      setNisn(initialProfile.nisn || 'P130100230');
      setGender(initialProfile.gender || 'L');
    }
  }, [initialProfile]);

  const generateNewToken = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTokenCode(res);
    setInputToken(res);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Silakan masukkan nama lengkap siswa!');
      return;
    }
    if (!school.trim()) {
      setErrorMsg('Silakan masukkan asal sekolah & kelas!');
      return;
    }
    if (inputToken.trim().toUpperCase() !== tokenCode.toUpperCase()) {
      setErrorMsg('Token ujian tidak cocok! Silakan samakan dengan token di atas.');
      return;
    }

    setErrorMsg('');
    onSubmit({
      name: name.trim(),
      school: school.trim(),
      nisn: nisn.trim(),
      gender,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl text-left overflow-y-auto max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider block">
                Konfirmasi Peserta Ujian CBT
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Form Identitas Siswa
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Mata Ujian Display */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">Mata Uji CBT:</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {subjectTitle}
            </span>
          </div>

          {/* Nama Siswa */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Nama Lengkap Siswa *</span>
              <span className="text-[10px] text-slate-400">Untuk nama rapor</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Muhammad Rizky Pratama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Asal Sekolah & Kelas */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Asal Sekolah & Kelas *
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Contoh: SDN 1 Mentari / Kelas 6B"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          {/* Grid NISN & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                NISN / No. Peserta
              </label>
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-num text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Jenis Kelamin
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'L' | 'P')}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="L">Laki-Laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>

          {/* Token Box Ala Pusmendik */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5" /> Token Ujian:
              </span>
              <div className="flex items-center gap-2">
                <span className="font-num text-sm font-extrabold px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 tracking-wider">
                  {tokenCode}
                </span>
                <button
                  type="button"
                  onClick={generateNewToken}
                  title="Ganti Token Baru"
                  className="p-1 rounded-lg text-amber-600 hover:bg-amber-200/50 dark:hover:bg-amber-900/40"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Token otomatis diinput di bawah sesuai prosedur Pusmendik:
            </p>
            <input
              type="text"
              required
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value.toUpperCase())}
              className="w-full px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 font-num text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest text-center"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-xs text-rose-500 font-medium bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
              {errorMsg}
            </p>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <motion.button
              whileTap={tapScale}
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              <span>Mulai Ujian CBT Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
