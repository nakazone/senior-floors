'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Stage = { id: number; name: string; slug: string; order_num: number | null }
type Lead = { id: number; name: string; email: string; phone: string | null; source: string | null; status: string | null; priority: string | null; created_at: string; pipeline_stage_id: number | null; owner_id: number | null }

export default function PipelinePage() {
  const [stages, setStages] = useState<Stage[]>([])
  const [leadsByStage, setLeadsByStage] = useState<Record<string, Lead[]>>({})
  const [loading, setLoading] = useState(true)
  const [draggedLeadId, setDraggedLeadId] = useState<number | null>(null)
  const [dragOverStageId, setDragOverStageId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/pipeline/leads')
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setStages(res.data.stages || [])
          setLeadsByStage(res.data.leadsByStage || {})
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const moveLead = async (leadId: number, stageId: number) => {
    const res = await fetch('/api/pipeline/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead_id: leadId, stage_id: stageId }),
    })
    const data = await res.json()
    if (data.success) {
      const allLeads = Object.values(leadsByStage).flat()
      const lead = allLeads.find((l) => l.id === leadId)
      if (lead) {
        setLeadsByStage((prev) => {
          const next: Record<string, Lead[]> = {}
          for (const k of Object.keys(prev)) {
            next[k] = prev[k].filter((l) => l.id !== leadId)
          }
          const newLead = { ...lead, pipeline_stage_id: stageId }
          const sk = String(stageId)
          next[sk] = [...(next[sk] || []), newLead]
          return next
        })
      } else {
        fetch('/api/pipeline/leads').then((r) => r.json()).then((res) => {
          if (res.success && res.data) setLeadsByStage(res.data.leadsByStage || {})
        })
      }
    } else {
      alert(data.message || 'Erro ao mover')
    }
  }

  const getLeadsInStage = (stageId: number) => {
    const list = leadsByStage[String(stageId)] || []
    if (stageId === stages[0]?.id) {
      const none = leadsByStage['_none'] || []
      return [...list, ...none]
    }
    return list
  }

  if (loading) {
    return (
      <div>
        <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Pipeline Comercial (Kanban)</h1>
        <p style={{ color: '#64748b' }}>Carregando?</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 0, maxWidth: '100%', overflowX: 'auto' }}>
      <h1 style={{ marginBottom: 8, color: '#1a2036', fontSize: 22, fontWeight: 700 }}>Pipeline Comercial (Kanban)</h1>
      <p style={{ color: '#64748b', marginBottom: 20 }}>Arraste os cards entre as colunas para mover o lead de est?gio.</p>

      {stages.length === 0 ? (
        <p style={{ color: '#e53e3e' }}>Nenhum est?gio no banco. Use CRM - Leads ou execute a migration do pipeline.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: 16,
            minHeight: 400,
            alignItems: 'flex-start',
          }}
          onDragEnd={() => {
            setDraggedLeadId(null)
            setDragOverStageId(null)
          }}
        >
          {stages.map((stage) => {
            const leads = getLeadsInStage(stage.id)
            const isDragOver = dragOverStageId === stage.id
            return (
              <div
                key={stage.id}
                data-stage-id={stage.id}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.dataTransfer.dropEffect = 'move'
                  setDragOverStageId(stage.id)
                }}
                onDragLeave={() => setDragOverStageId(null)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOverStageId(null)
                  const leadId = Number(e.dataTransfer.getData('lead_id') || e.dataTransfer.getData('text/plain'))
                  if (leadId && stage.id) {
                    const cardLead = getLeadsInStage(stage.id).find((l) => l.id === leadId)
                    if (!cardLead || cardLead.pipeline_stage_id !== stage.id) {
                      moveLead(leadId, stage.id)
                    }
                  }
                }}
                style={{
                  flex: '0 0 280px',
                  minWidth: 280,
                  background: isDragOver ? '#e2e8f0' : '#f1f5f9',
                  borderRadius: 12,
                  padding: 12,
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  outline: isDragOver ? '2px dashed #1a2036' : 'none',
                  outlineOffset: -2,
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#475569', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #e2e8f0' }}>
                  {stage.name} <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>({leads.length})</span>
                </h3>
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('lead_id', String(lead.id))
                      e.dataTransfer.setData('text/plain', String(lead.id))
                      e.dataTransfer.effectAllowed = 'move'
                      setDraggedLeadId(lead.id)
                    }}
                    style={{
                      background: '#fff',
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 10,
                      boxShadow: draggedLeadId === lead.id ? '0 8px 24px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
                      cursor: 'grab',
                      borderLeft: '4px solid #1a2036',
                      opacity: draggedLeadId === lead.id ? 0.6 : 1,
                    }}
                  >
                    <Link href={`/leads/${lead.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ fontWeight: 600, color: '#1a2036', marginBottom: 4 }}>{lead.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{lead.email} ? {lead.phone || ''}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{lead.source || ''} ? {new Date(lead.created_at).toLocaleDateString()}</div>
                    </Link>
                  </div>
                ))}
                {leads.length === 0 && (
                  <div style={{ color: '#94a3b8', fontSize: 13, padding: 20, textAlign: 'center', minHeight: 60 }}>Nenhum lead</div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
