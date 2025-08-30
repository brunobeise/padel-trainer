interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({ children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-3 ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
    >
      {children}
    </div>
  );
}
