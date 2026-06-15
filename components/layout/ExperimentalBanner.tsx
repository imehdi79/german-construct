import { AlertTriangle } from "lucide-react";

export function ExperimentalBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-aman-gold text-white text-xs font-medium py-1.5">
      <div className="container-aman">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle size={13} className="shrink-0" />
          <span>Experimentelle Version – diese Website befindet sich noch in der Entwicklung.</span>
        </div>
      </div>
    </div>
  );
}
