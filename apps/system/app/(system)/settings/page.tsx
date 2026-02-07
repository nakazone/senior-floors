export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ marginBottom: 24, color: '#1a2036', fontSize: 22, fontWeight: 700 }}>Settings</h1>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#333', paddingBottom: 10, borderBottom: '2px solid #e2e8f0' }}>
          Configuracao do painel
        </h2>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Usuarios admin</label>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            O primeiro usuario admin e criado via variavel de ambiente <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>ADMIN_PASSWORD</code> e script <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>npm run create-admin</code> (email: leads@senior-floors.com).
          </p>
          <p style={{ fontSize: 14, color: '#333', marginTop: 8 }}><strong>Status:</strong> Autenticacao por sessao ativa.</p>
        </div>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Titulo do sistema</label>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>Senior Floors System (alteravel em configuracao do projeto).</p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#333', paddingBottom: 10, borderBottom: '2px solid #e2e8f0' }}>
          CRM
        </h2>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Leads e banco de dados</label>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 5 }}>
            Os leads sao salvos no MySQL. Configure <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>DATABASE_URL</code> no .env (ou nas variaveis de ambiente do Netlify).
          </p>
          <p style={{ fontSize: 14, color: '#333', marginTop: 8 }}><strong>Modulos:</strong> CRM - Leads, Pipeline, Visitas, Orcamentos, Customers, Projects, Coupons, Users.</p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: '#333', paddingBottom: 10, borderBottom: '2px solid #e2e8f0' }}>
          Informacoes do sistema
        </h2>
        <div style={{ background: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 15 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333' }}>Data/hora do servidor</label>
          <p style={{ fontSize: 14, color: '#333', marginTop: 5 }}>{new Date().toLocaleString('pt-BR')}</p>
        </div>
      </section>

      <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: 15, borderRadius: 6, marginTop: 20 }}>
        <h3 style={{ marginBottom: 10, color: '#0369a1' }}>Seguranca</h3>
        <ul style={{ marginLeft: 20, color: '#64748b', fontSize: 14, lineHeight: 1.8 }}>
          <li>Altere a senha padrao apos o primeiro acesso.</li>
          <li>Use senha forte (letras, numeros e simbolos).</li>
          <li>Nao compartilhe credenciais publicamente.</li>
          <li>Faca logout ao terminar o uso do painel.</li>
        </ul>
      </div>
    </div>
  )
}
