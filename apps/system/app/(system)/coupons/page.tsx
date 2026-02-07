'use client'

import { useEffect, useState } from 'react'

type Coupon = {
  id: number
  code: string
  name: string | null
  discount_type: string | null
  discount_value: string
  max_uses: number | null
  used_count: number | null
  valid_from: string | null
  valid_until: string | null
  is_active: number | null
  created_at: string
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    code: '',
    name: '',
    discount_type: 'percentage',
    discount_value: '',
    max_uses: '',
    valid_from: '',
    valid_until: '',
    is_active: 1,
  })
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    fetch('/api/coupons')
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.coupons) setCoupons(res.coupons)
        else if (res.success && res.data) setCoupons(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const totalUses = coupons.reduce((acc, c) => acc + (c.used_count ?? 0), 0)
  const activeCount = coupons.filter((c) => c.is_active === 1).length

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = form.code.trim().toUpperCase()
    if (!code || code.length < 2) {
      alert('Codigo e obrigatorio (min. 2 caracteres).')
      return
    }
    const discountValue = Number(form.discount_value.replace(',', '.'))
    if (Number.isNaN(discountValue) || discountValue < 0) {
      alert('Valor do desconto invalido.')
      return
    }
    setSubmitting(true)
    const res = await fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        name: form.name.trim() || undefined,
        discount_type: form.discount_type === 'fixed' ? 'fixed' : 'percentage',
        discount_value: discountValue,
        max_uses: form.max_uses ? Number(form.max_uses) : null,
        valid_from: form.valid_from || undefined,
        valid_until: form.valid_until || undefined,
        is_active: form.is_active ? 1 : 0,
      }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (data.success) {
      setModalOpen(false)
      setForm({ code: '', name: '', discount_type: 'percentage', discount_value: '', max_uses: '', valid_from: '', valid_until: '', is_active: 1 })
      load()
    } else {
      alert(data.message || 'Erro ao criar cupom')
    }
  }

  const toggleActive = async (couponId: number, currentActive: number | null) => {
    const newStatus = currentActive === 1 ? 0 : 1
    if (!confirm(`Deseja ${newStatus === 1 ? 'ativar' : 'desativar'} este cupom?`)) return
    const res = await fetch(`/api/coupons/${couponId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: newStatus }),
    })
    const data = await res.json()
    if (data.success) load()
    else alert(data.message || 'Erro ao atualizar')
  }

  const formatDiscount = (c: Coupon) => {
    const type = (c.discount_type || 'percentage').toLowerCase()
    const val = Number(c.discount_value)
    return type === 'percentage' ? `${val}%` : `$ ${val.toFixed(2)}`
  }

  if (loading) {
    return (
      <div>
        <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Coupons</h1>
        <p style={{ color: '#64748b' }}>Carregando...</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <h1 style={{ margin: 0, color: '#1a2036', fontSize: 22, fontWeight: 700 }}>Coupons</h1>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            padding: '10px 20px',
            background: '#1a2036',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + Novo cupom
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15, marginBottom: 20 }}>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.06)', textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1a2036' }}>{coupons.length}</div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Total de cupons</div>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.06)', textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>{activeCount}</div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Ativos</div>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.06)', textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>{totalUses}</div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Total de usos</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1a2036', color: '#fff' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Codigo</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Nome</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Desconto</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Tipo</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Usos</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Max.</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Valido ate</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: 24, color: '#64748b', textAlign: 'center' }}>Nenhum cupom cadastrado.</td>
              </tr>
            ) : (
              coupons.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{c.code}</td>
                  <td style={{ padding: '12px 16px' }}>{c.name ?? '?'}</td>
                  <td style={{ padding: '12px 16px' }}>{formatDiscount(c)}</td>
                  <td style={{ padding: '12px 16px' }}>{(c.discount_type || 'percentage') === 'percentage' ? 'Percentual' : 'Valor fixo'}</td>
                  <td style={{ padding: '12px 16px' }}>{c.used_count ?? 0}</td>
                  <td style={{ padding: '12px 16px' }}>{c.max_uses ?? '?'}</td>
                  <td style={{ padding: '12px 16px' }}>{c.valid_until ? new Date(c.valid_until).toLocaleDateString('pt-BR') : '?'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: c.is_active === 1 ? '#dcfce7' : '#fee2e2',
                        color: c.is_active === 1 ? '#166534' : '#991b1b',
                      }}
                    >
                      {c.is_active === 1 ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      type="button"
                      onClick={() => toggleActive(c.id, c.is_active)}
                      style={{
                        padding: '6px 12px',
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: 13,
                      }}
                    >
                      {c.is_active === 1 ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 24,
              maxWidth: 480,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: 20, color: '#1a2036' }}>Novo cupom</h3>
            <form onSubmit={onCreate}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14 }}>Codigo *</label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="WELCOME10"
                  style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14 }}>Nome</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Desconto boas-vindas"
                  style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14 }}>Tipo de desconto</label>
                <select
                  value={form.discount_type}
                  onChange={(e) => setForm((f) => ({ ...f, discount_type: e.target.value }))}
                  style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
                >
                  <option value="percentage">Percentual (%)</option>
                  <option value="fixed">Valor fixo ($)</option>
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14 }}>Valor do desconto *</label>
                <input
                  type="text"
                  required
                  value={form.discount_value}
                  onChange={(e) => setForm((f) => ({ ...f, discount_value: e.target.value }))}
                  placeholder={form.discount_type === 'percentage' ? '10' : '50.00'}
                  style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14 }}>Max. usos</label>
                <input
                  type="number"
                  min={1}
                  value={form.max_uses}
                  onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))}
                  placeholder="Ilimitado"
                  style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14 }}>Valido de</label>
                <input
                  type="date"
                  value={form.valid_from}
                  onChange={(e) => setForm((f) => ({ ...f, valid_from: e.target.value }))}
                  style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14 }}>Valido ate</label>
                <input
                  type="date"
                  value={form.valid_until}
                  onChange={(e) => setForm((f) => ({ ...f, valid_until: e.target.value }))}
                  style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '10px 20px',
                    background: '#1a2036',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Salvando...' : 'Criar cupom'}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    background: '#f1f5f9',
                    color: '#475569',
                    border: '1px solid #e2e8f0',
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
