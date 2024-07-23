export default function LoadingOverlay({ color }: any) {
  // 3 dots bopping up and down in order
  return (
    <svg
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <circle
          key={i}
          cx={i === 0 ? '5' : i === 1 ? '12' : '19'}
          cy="12"
          r="1"
          fill={color}
          className={'animate-bounce bg-current text-white'}
          style={{
            animationDuration: '0.8s',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </svg>
  )
}
