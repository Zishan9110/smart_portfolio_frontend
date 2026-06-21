import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

export default function AnimatedCounter({ value, suffix = '', prefix = '', className = '' }) {
  const { ref, count } = useAnimatedCounter(value);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
