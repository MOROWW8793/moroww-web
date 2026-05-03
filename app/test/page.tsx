export default function TestPage() {
  return (
    <div>
      <h1>Foto test</h1>
      <img src="/images/fp-exterieur.jpg" alt="test"
        style={{ width: '400px', height: '300px',
        objectFit: 'cover' }} />
      <img src="/images/hero.jpg" alt="hero test"
        style={{ width: '400px', height: '300px',
        objectFit: 'cover' }} />
    </div>
  )
}
