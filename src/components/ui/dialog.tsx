'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
}

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  const value = React.useMemo<DialogContextValue>(
    () => ({
      open,
      onOpenChange: onOpenChange ?? (() => {}),
    }),
    [open, onOpenChange]
  );
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className = '', children, ...props }, ref) => {
    const { open, onOpenChange } = useDialog();

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onOpenChange(false);
      };
      if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [open, onOpenChange]);

    if (!open) return null;

    const content = (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/80"
          aria-hidden
          onClick={() => onOpenChange(false)}
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={`relative z-50 max-h-[90vh] overflow-auto border border-border bg-background shadow-lg ${className}`}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    );

    if (typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }
    return content;
  }
);
DialogContent.displayName = 'DialogContent';

export { Dialog, DialogContent };
