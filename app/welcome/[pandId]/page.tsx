export default async function WelcomePage({
  params
}: {
  params: { pandId: string }
}) {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Welcome pagina werkt</h1>
      <p>Pand ID: {params.pandId}</p>
    </div>
  )
}
