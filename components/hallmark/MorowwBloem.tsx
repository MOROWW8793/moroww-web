/**
 * De moroww-bloem — vijf blaadjes uit het officiële logo (Moroww_Logo_01_RGB).
 * Elke blaadje zit in een eigen <g> zodat CSS er onafhankelijk op kan werken
 * (ademen in stagger); de inner transform op elke ellips/path blijft intact.
 *
 * Gebruik:
 *   <MorowwBloem size={48} />                 // decoratief, aria-hidden
 *   <MorowwBloem size={128} label="moroww" /> // als wordmerkvervanger
 *
 * Animatie: continue ademhaling per blaadje met per-petal delay; opt-out via
 * animated={false}. Reduced-motion pauzeert vanzelf (regel in hallmark.css).
 */
export function MorowwBloem({
  size = 80,
  animated = true,
  label,
}: {
  size?: number
  animated?: boolean
  label?: string
}) {
  const h = Math.round((size * 180) / 240)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 180"
      width={size}
      height={h}
      className={animated ? 'hm-bloem hm-bloem-anim' : 'hm-bloem'}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ display: 'block' }}
    >
      <g className="hm-bloem-petal">
        <ellipse cx="44.076" cy="128.483" rx="22.275" ry="44.887" transform="translate(-90.931 143.433) rotate(-77.384)" fill="#fea05e" />
      </g>
      <g className="hm-bloem-petal">
        <path d="M83.973,58.421c13.713,21.956,17.027,45.293,7.403,52.124-9.624,6.831-28.542-5.43-42.255-27.386-13.713-21.956-17.027-45.293-7.403-52.124,9.624-6.831,28.542,5.43,42.255,27.386Z" fill="#fea05e" />
      </g>
      <g className="hm-bloem-petal">
        <ellipse cx="120.703" cy="47.007" rx="47.615" ry="20.999" transform="translate(52.972 157.422) rotate(-79.753)" fill="#fea05e" />
      </g>
      <g className="hm-bloem-petal">
        <path d="M186.441,89.675c-20.561,14.595-42.432,18.095-48.85,7.818-6.418-10.277,5.046-30.439,25.607-45.034,20.561-14.595,42.432-18.095,48.85-7.818,6.418,10.277-5.046,30.439-25.607,45.034Z" fill="#fea05e" />
      </g>
      <g className="hm-bloem-petal">
        <ellipse cx="197.196" cy="128.875" rx="22.275" ry="44.887" transform="translate(28.363 293.163) rotate(-77.384)" fill="#fea05e" />
      </g>
    </svg>
  )
}
