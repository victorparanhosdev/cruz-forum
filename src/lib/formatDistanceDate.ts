import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDistanceDate(date: string | Date) {
  const result = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  })
  return result
}
