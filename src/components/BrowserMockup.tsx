interface BrowserMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const BrowserMockup = ({ children, className = "" }: BrowserMockupProps) => {
  return (
    <div className={`bg-background rounded-xl shadow-2xl overflow-hidden border border-border ${className}`}>
      {/* Browser Chrome */}
      <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
        {/* macOS Window Controls */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {/* Address Bar */}
        <div className="flex-1 ml-4">
          <div className="bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground max-w-md">
            yourhype.app
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="bg-background p-0">
        {children}
      </div>
    </div>
  );
};
