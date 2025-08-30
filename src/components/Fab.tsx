interface FabProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Fab({ onClick, children }: FabProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full px-5 py-3 shadow-lg text-lg font-medium hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
