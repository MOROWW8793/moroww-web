'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Stappenbalk } from '@/components/hub/Stappenbalk';

// Aanmelden in twee schermen: eerst het account, dan wie je bent. Eén formulier,
// één keer versturen; "ga verder" kijkt alleen het e-mailadres en het wachtwoord na.
export function AanmeldStappen({ actie, fout, startOp, minWachtwoord }: { actie: (f: FormData) => Promise<void>; fout?: string; startOp: 1 | 2; minWachtwoord: number }) {
  const [stap, zetStap] = useState<1 | 2>(startOp);
  const email = useRef<HTMLInputElement>(null);
  const wachtwoord = useRef<HTMLInputElement>(null);
  const verder = () => {
    if (email.current?.reportValidity() && wachtwoord.current?.reportValidity()) zetStap(2);
  };

  return (
    <div className="aanmeld">
      <Stappenbalk nu={stap} />
      <form action={actie} className="hub-form aanmeld-kaart">
        <div hidden={stap !== 1} className="aanmeld-deel">
          <h1 className="aanmeld-titel">maak je account aan</h1>
          <p className="klein">Daarna stel je jezelf kort voor. Je betaalt nog niets.</p>
          <div className="veld"><label htmlFor="email">e-mailadres</label><input ref={email} id="email" name="email" type="email" required autoComplete="email" placeholder="naam@voorbeeld.be" /></div>
          <div className="veld"><label htmlFor="wachtwoord">wachtwoord</label><input ref={wachtwoord} id="wachtwoord" name="wachtwoord" type="password" required minLength={minWachtwoord} autoComplete="new-password" /></div>
          <p className="klein">Minstens {minWachtwoord} tekens.</p>
          {fout && stap === 1 ? <p className="hub-fout">{fout}</p> : null}
          <button type="button" className="btn btn-primair" onClick={verder}>ga verder</button>
          <p className="klein">Al lid? <Link href="/hub/inloggen">log in</Link></p>
        </div>
        <div hidden={stap !== 2} className="aanmeld-deel">
          <h1 className="aanmeld-titel">wie ben je?</h1>
          <p className="klein">We keuren elk lid persoonlijk goed. Hiermee weten we voor wie we werken.</p>
          <div className="veld"><label htmlFor="naam">naam</label><input id="naam" name="naam" required={stap === 2} autoComplete="name" /></div>
          <fieldset className="hub-chips">
            <legend>ik ben</legend>
            <label><input type="radio" name="soort" value="eigenaar" defaultChecked /><span>eigenaar die zelf verhuurt</span></label>
            <label><input type="radio" name="soort" value="property-manager" /><span>property manager</span></label>
          </fieldset>
          <div className="rij-velden">
            <div className="veld"><label htmlFor="aantal">aantal huizen</label><input id="aantal" name="aantal" type="number" min={1} max={999} inputMode="numeric" /></div>
            <div className="veld"><label htmlFor="telefoon">telefoon</label><input id="telefoon" name="telefoon" type="tel" autoComplete="tel" placeholder="04.." /></div>
          </div>
          <div className="veld"><label htmlFor="streek">in welke streek liggen je huizen</label><input id="streek" name="streek" placeholder="gemeente of regio" /></div>
          {fout && stap === 2 ? <p className="hub-fout">{fout}</p> : null}
          <button type="submit" className="btn btn-primair">verstuur mijn aanvraag</button>
          <button type="button" className="aanmeld-terug" onClick={() => zetStap(1)}>terug naar je account</button>
        </div>
      </form>
    </div>
  );
}
