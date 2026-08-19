import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Printer, CheckCircle, Edit3, Check } from 'lucide-react';
import { Course, UserProfile } from '../types';

interface CertificateModalProps {
  course: Course | null;
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateName?: (newName: string) => void;
}

// Generate random 32 hexadecimal letters & numbers with 4 hyphens (8-4-4-4-12 format)
const generate32HexId = (): string => {
  const hexChars = '0123456789abcdef';
  const getHexChunk = (len: number) => {
    let chunk = '';
    for (let i = 0; i < len; i++) {
      chunk += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
    }
    return chunk;
  };
  return `${getHexChunk(8)}-${getHexChunk(4)}-${getHexChunk(4)}-${getHexChunk(4)}-${getHexChunk(12)}`;
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  user,
  isOpen,
  onClose,
  onUpdateName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.displayName || '');
  const [verificationId] = useState<string>(() => generate32HexId());

  useEffect(() => {
    if (user?.displayName) {
      setEditedName(user.displayName);
    }
  }, [user?.displayName]);

  const currentDisplayName = editedName.trim() || user?.displayName || 'Learner';

  useEffect(() => {
    if (!isOpen || !course || !user || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions (High Resolution 1920x1080)
    canvas.width = 1920;
    canvas.height = 1080;

    // Background Dark Luxury Canvas
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer Decorative Cyan/Indigo Borders
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Decorative Corner Elements
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(40, 40, 60, 60);
    ctx.fillRect(canvas.width - 100, 40, 60, 60);
    ctx.fillRect(40, canvas.height - 100, 60, 60);
    ctx.fillRect(canvas.width - 100, canvas.height - 100, 60, 60);

    // Header Branding: "EduPulse"
    ctx.textAlign = 'center';

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('EduPulse', canvas.width / 2, 160);

    // Main Header: "Certificate of Completion"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px sans-serif';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 250);

    // Subtitle: "Proudly presented to"
    ctx.fillStyle = '#94a3b8';
    ctx.font = '28px sans-serif';
    ctx.fillText('Proudly presented to', canvas.width / 2, 340);

    // Student Name
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 72px serif';
    ctx.fillText(currentDisplayName, canvas.width / 2, 440);

    // Line under name
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 300, 470);
    ctx.lineTo(canvas.width / 2 + 300, 470);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Body Text: "for successfully completing"
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '30px sans-serif';
    ctx.fillText('for successfully completing', canvas.width / 2, 540);

    // Course Title directly after "for successfully completing"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(`"${course.title}"`, canvas.width / 2, 620);

    // Date & Verification ID (Bottom Left)
    const issueDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Date of Issue: ${issueDate}`, 160, 880);
    ctx.fillText(`Verification ID: ${verificationId}`, 160, 920);

    // Right Side Bottom: "Kontham Nikith Reddy & Team"
    ctx.textAlign = 'right';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'italic bold 36px serif';
    ctx.fillText('EduPlus Pro Academy', canvas.width - 160, 880);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px sans-serif';
    ctx.fillText('Authorized Certification Signatory', canvas.width - 160, 920);
  }, [isOpen, course, user, currentDisplayName, verificationId]);

  if (!isOpen || !course || !user) return null;

  const handleSaveName = () => {
    if (onUpdateName && editedName.trim()) {
      onUpdateName(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `EduPulse_Certificate_${course.title.replace(/\s+/g, '_')}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const windowContent = `<img src="${dataUrl}" style="width:100%; height:auto;" />`;
    const printWin = window.open('', '', 'width=1000,height=700');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
        printWin.close();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-100 my-auto flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <CheckCircle className="w-4 h-4" /> Official Verified Certificate
          </div>
          <h2 className="text-2xl font-bold text-white">Course Completion Certificate</h2>

          {/* Student Name Edit Section */}
          <div className="mt-2 flex items-center justify-center gap-2 max-w-md mx-auto">
            {isEditingName ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter your full name for certificate"
                  className="flex-1 bg-slate-950 border border-cyan-500/80 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-cyan-400 transition-colors"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-xl">
                <span className="text-xs text-slate-400">Printed Name:</span>
                <span className="text-sm font-bold text-cyan-400">{currentDisplayName}</span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                  title="Edit name printed on certificate"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Canvas Preview */}
        <div className="w-full aspect-[16/9] max-h-[480px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl mb-6">
          <canvas ref={canvasRef} className="w-full h-full object-contain" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG Certificate</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
