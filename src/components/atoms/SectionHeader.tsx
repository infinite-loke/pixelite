
export const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between p-4 border-t border-slate-100 group">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
  </div>
);
