import type { Register } from 'claude-code'

type Measure = {
  context: { tokens?: number; window: number; percent?: number }
  rateLimits: { kind: string; percentUsed: number }[]
  cost?: { usd: number }
}

const k = (n: number) => `${Math.round(n / 1000)}k`

const LABEL: Record<string, string> = { five_hour: '5h', seven_day: '7d', spend_limit: 'spend' }

const line = (m: Measure): string => {
  const { tokens, window, percent } = m.context
  const parts = [
    tokens === undefined || percent === undefined
      ? 'ctx --'
      : `ctx ${percent}% (${k(tokens)}/${k(window)})`,
  ]

  for (const r of m.rateLimits) {
    parts.push(`${LABEL[r.kind] ?? r.kind} ${Math.round(r.percentUsed)}%`)
  }

  if (m.cost) parts.push(`$${m.cost.usd.toFixed(2)}`)

  return parts.join(' | ')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    $.ui.status(line(await $.session.usage()))

    return next(e)
  })

  on('session.measure', ($, e, next) => {
    $.ui.status(line(e))

    return next(e)
  })
}
