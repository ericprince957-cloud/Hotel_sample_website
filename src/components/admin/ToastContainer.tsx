import { useToast } from "@/lib/toast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-[10px] shadow-lg border animate-fade-rise ${
            toast.type === "success"
              ? "bg-white border-[#2F7D5B] text-[#2F7D5B]"
              : toast.type === "error"
              ? "bg-white border-[#B3372F] text-[#B3372F]"
              : "bg-white border-[#0F3D3E] text-[#0F3D3E]"
          }`}
        >
          {toast.type === "success" && <CheckCircle size={18} className="mt-0.5 shrink-0" />}
          {toast.type === "error" && <AlertCircle size={18} className="mt-0.5 shrink-0" />}
          {toast.type === "info" && <Info size={18} className="mt-0.5 shrink-0" />}
          <p className="text-[14px] flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 hover:opacity-70"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
