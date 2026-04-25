/**
 * AnimatedBlob — atmospheric background blob with drift animation.
 * Uses CSS keyframes defined in global.css.
 */
export default function AnimatedBlob({
  color = 'rgba(249,115,22,0.18)',
  size = 520,
  top,
  left,
  right,
  bottom,
  animationVariant = 1,
  delay = 0,
}) {
  const style = {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '999px',
    background: color,
    filter: 'blur(90px)',
    pointerEvents: 'none',
    top,
    left,
    right,
    bottom,
    animation: `blob-drift${animationVariant === 2 ? '-2' : ''} ${14 + delay}s ease-in-out ${delay}s infinite`,
    willChange: 'transform',
  }

  return <div style={style} aria-hidden="true" />
}
