import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { StudentProfile } from '../../types/tka';

interface Props {
  isOpen: boolean;
  subjectTitle: string;
  initialProfile: StudentProfile | null;
  onClose: () => void;
  onSubmit: (profile: StudentProfile) => void;
}

export const StudentFormModal: React.FC<Props> = ({ isOpen, subjectTitle, initialProfile, onClose, onSubmit }) => {
  const [name, setName] = useState(initialProfile?.name ?? '');
  const [school, setSchool] = useState(initialProfile?.school ?? '');
  const dialog = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    nameInput.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialog.current) return;
      const controls = [...dialog.current.querySelectorAll<HTMLElement>('button, input')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus(); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="student-dialog-title" className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
      <div className="flex justify-between items-start gap-3">
        <div><h2 id="student-dialog-title" className="text-lg font-bold">Mulai latihan CBT</h2><p className="text-sm text-slate-500">{subjectTitle} · 75 menit</p></div>
        <button type="button" aria-label="Tutup" onClick={onClose} className="min-w-11 min-h-11 rounded-xl border flex items-center justify-center"><X size={18}/></button>
      </div>
      <p className="text-sm">Identitas boleh dikosongkan. Nama yang diisi hanya dipakai pada hasil latihan di perangkat ini.</p>
      <form onSubmit={event => { event.preventDefault(); onSubmit({ name: name.trim(), school: school.trim() }); }} className="space-y-4">
        <label className="block text-sm font-medium">Nama (opsional)<input ref={nameInput} autoComplete="name" maxLength={80} value={name} onChange={event => setName(event.target.value)} className="mt-1 block w-full min-h-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-3" /></label>
        <label className="block text-sm font-medium">Sekolah (opsional)<input maxLength={100} value={school} onChange={event => setSchool(event.target.value)} className="mt-1 block w-full min-h-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-3" /></label>
        <button type="submit" className="w-full min-h-11 rounded-xl bg-indigo-600 text-white font-semibold active:scale-[.97]">Mulai latihan</button>
      </form>
    </div>
  </div>;
};
