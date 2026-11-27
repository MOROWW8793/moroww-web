import type { Huis } from '@/lib/hub/huizen';

// De velden van een huis, voor het lid zelf en voor het beheer.
export function HuisVelden({ h }: { h?: Huis }) {
  const k = h?.id ?? 'nieuw';
  return (
    <>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`naam-${k}`}>naam van het huis</label><input id={`naam-${k}`} name="naam" required maxLength={120} defaultValue={h?.naam ?? ''} /></div>
        <div className="veld"><label htmlFor={`adres-${k}`}>straat, nummer en bus</label><input id={`adres-${k}`} name="adres" required autoComplete="street-address" defaultValue={h?.adres ?? ''} /></div>
      </div>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`postcode-${k}`}>postcode</label><input id={`postcode-${k}`} name="postcode" required autoComplete="postal-code" defaultValue={h?.postcode ?? ''} /></div>
        <div className="veld"><label htmlFor={`gemeente-${k}`}>gemeente</label><input id={`gemeente-${k}`} name="gemeente" required autoComplete="address-level2" defaultValue={h?.gemeente ?? ''} /></div>
      </div>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`slk-${k}`}>slaapkamers</label><input id={`slk-${k}`} name="slaapkamers" type="number" min={0} max={50} defaultValue={h?.slaapkamers ?? ''} /></div>
        <div className="veld"><label htmlFor={`bk-${k}`}>badkamers</label><input id={`bk-${k}`} name="badkamers" type="number" min={0} max={50} defaultValue={h?.badkamers ?? ''} /></div>
        <div className="veld"><label htmlFor={`bedden-${k}`}>bedden</label><input id={`bedden-${k}`} name="bedden" placeholder="2 tweepersoons, 1 stapelbed" defaultValue={h?.bedden ?? ''} /></div>
      </div>
      <div className="veld"><label htmlFor={`toegang-${k}`}>hoe komen we binnen</label><textarea id={`toegang-${k}`} name="toegang" placeholder="slot met code, sleutelkluis of iemand ter plaatse" defaultValue={h?.toegang ?? ''} /></div>
      <div className="rij-velden">
        <div className="veld"><label htmlFor={`park-${k}`}>parkeren</label><input id={`park-${k}`} name="parkeren" placeholder="oprit, straat, betalend" defaultValue={h?.parkeren ?? ''} /></div>
        <div className="veld"><label htmlFor={`cn-${k}`}>contact ter plaatse</label><input id={`cn-${k}`} name="contact_naam" defaultValue={h?.contact_naam ?? ''} /></div>
        <div className="veld"><label htmlFor={`ct-${k}`}>telefoon van dat contact</label><input id={`ct-${k}`} name="contact_telefoon" type="tel" defaultValue={h?.contact_telefoon ?? ''} /></div>
      </div>
      <div className="veld"><label htmlFor={`opm-${k}`}>wat we nog moeten weten</label><textarea id={`opm-${k}`} name="opmerkingen" placeholder="alarm, huisdieren, waar het poetsmateriaal staat" defaultValue={h?.opmerkingen ?? ''} /></div>
    </>
  );
}
