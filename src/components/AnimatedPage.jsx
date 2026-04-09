export default function AnimatedPage({ children, className = '' }) {
  const safeClassName = typeof className === 'string' ? className : '';
  // Simplified temporarily to guarantee rendering and prevent Framer Motion routing issues
  return (
    <div className={`w-full ${safeClassName}`}>
      {children}
    </div>
  );
}
