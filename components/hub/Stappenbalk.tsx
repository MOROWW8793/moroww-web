// De vier stappen van aanmelden tot opstarten, zoals bovenaan elk aanmeldscherm.
const STAPPEN = ['account', 'over jou', 'goedkeuring', 'opstarten'];

export function Stappenbalk({ nu }: { nu: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="aanmeld-stappen" aria-label="stappen">
      {STAPPEN.map((s, i) => (
        <li key={s} className={i + 1 <= nu ? 'aan' : ''} aria-current={i + 1 === nu ? 'step' : undefined}>{i + 1}. {s}</li>
      ))}
    </ol>
  );
}
