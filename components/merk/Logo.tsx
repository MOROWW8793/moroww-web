// Het echte moroww-logo: vijf blaadjes en het woordmerk.
// Enkel de kleur van de blaadjes verschilt per merk; het woordmerk is donker of wit.

export const BLAADJES = {
  moroww: '#fea05e',
  how: '#a994f0',
  hub: '#7fa0c9',
  advisory: '#F2C94C',
} as const;

type Props = {
  petal?: string;
  ink?: string;
  height?: number;
  title?: string;
  className?: string;
};

export function Logo({ petal = BLAADJES.moroww, ink = '#0b0700', height = 24, title = 'moroww', className }: Props) {
  const width = (height * 1000) / 152.727;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 152.727"
      width={width}
      height={height}
      role="img"
      aria-label={title}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'baseline' }}
    >
      <g fill={petal}>
        <ellipse cx="44.076" cy="128.483" rx="22.275" ry="44.887" transform="translate(-90.931 143.433) rotate(-77.384)" />
        <path d="M83.973,58.421c13.713,21.956,17.027,45.293,7.403,52.124-9.624,6.831-28.542-5.43-42.255-27.386-13.713-21.956-17.027-45.293-7.403-52.124,9.624-6.831,28.542,5.43,42.255,27.386Z" />
        <ellipse cx="120.703" cy="47.007" rx="47.615" ry="20.999" transform="translate(52.972 157.422) rotate(-79.753)" />
        <path d="M186.441,89.675c-20.561,14.595-42.432,18.095-48.85,7.818-6.418-10.277,5.046-30.439,25.607-45.034,20.561-14.595,42.432-18.095,48.85-7.818,6.418,10.277-5.046,30.439-25.607,45.034Z" />
        <ellipse cx="197.196" cy="128.875" rx="22.275" ry="44.887" transform="translate(28.363 293.163) rotate(-77.384)" />
      </g>
      <g fill={ink}>
        <path d="M358.631,61.061c-12.82,0-22.667,9.663-22.667,23.413v56.938h-15.976V48.517h15.976v13.657c6.497-10.215,17.457-15.976,27.867-15.976,13.841,0,24.986,7.059,29.818,20.338,6.037-12.912,18.581-20.338,30.471-20.338,18.765,0,32.412,12.728,32.412,36.13v59.084h-15.69v-55.641c0-17.284-8.55-24.71-21.829-24.71-12.82,0-22.851,9.663-22.851,23.413v56.938h-15.7v-55.641c0-17.284-8.458-24.71-21.829-24.71Z" />
        <path d="M517.689,46.198c26.293,0,43.935,19.225,43.935,48.399s-17.641,48.766-43.935,48.766c-26.569,0-44.313-19.511-44.313-48.766s17.743-48.399,44.313-48.399ZM517.689,60.591c-17.743,0-28.05,12.452-28.05,34.006,0,21.829,10.307,34.363,28.05,34.363,17.468,0,27.683-12.534,27.683-34.363,0-21.554-10.215-34.006-27.683-34.006Z" />
        <path d="M594.465,48.517v14.771c6.221-10.123,16.436-15.792,26.191-15.792h4.178v16.538h-4.454c-15.047,0-25.915,9.193-25.915,22.289v55.089h-15.976V48.517h15.976Z" />
        <path d="M674.519,46.198c26.293,0,43.935,19.225,43.935,48.399s-17.641,48.766-43.935,48.766c-26.569,0-44.313-19.511-44.313-48.766s17.743-48.399,44.313-48.399ZM674.519,60.591c-17.743,0-28.05,12.452-28.05,34.006,0,21.829,10.307,34.363,28.05,34.363,17.468,0,27.683-12.534,27.683-34.363,0-21.554-10.215-34.006-27.683-34.006Z" />
        <path d="M741.172,48.517l18.857,74.498,22.013-74.498h18.203l21.462,74.498,19.786-74.498h17.09l-28.418,92.895h-17.468l-21.646-74.876-21.829,74.876h-18.111l-26.937-92.895h16.998Z" />
        <path d="M882.589,48.517l18.857,74.498,22.013-74.498h18.203l21.462,74.498,19.786-74.498h17.09l-28.418,92.895h-17.468l-21.646-74.876-21.829,74.876h-18.111l-26.937-92.895h16.998Z" />
      </g>
    </svg>
  );
}

// Het merkteken van een submerk: het moroww-logo met de eigen blaadjes, gevolgd door het tweede woord.
export function MerkTeken({ merk, op = 'licht', size = 22 }: { merk: 'how' | 'hub' | 'advisory'; op?: 'licht' | 'donker'; size?: number }) {
  const ink = op === 'donker' ? '#ffffff' : '#0b0700';
  return (
    <span className={`merkteken merkteken-${merk}`} style={{ fontSize: size, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'baseline', gap: '0.25em' }}>
      <Logo petal={BLAADJES[merk]} ink={ink} height={Math.round(size * 0.78)} title="moroww" />{' '}
      {merk === 'advisory' ? (
        <span className="merkteken-woord">advisory</span>
      ) : merk === 'how' ? (
        <span className="merkteken-woord">how</span>
      ) : (
        <i className="merkteken-woord">hub</i>
      )}
    </span>
  );
}
