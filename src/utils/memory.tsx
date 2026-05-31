import { format } from "date-fns";
import { ExerciseResult, Session } from "../model/model";

const CURR_SESSION_KEY = 'curr_session'
const SESSION_HISTORY_KEY = 'session_history'
const MAX_SESSIONS = 100
const DATE_FORMAT = "yyyy-MM-dd HH:mm"

export function getCurrentSession(): Session | undefined {
  const raw = localStorage.getItem(CURR_SESSION_KEY)
  return raw ? JSON.parse(raw) : undefined
}

export function addToCurrentSession(result: ExerciseResult) {
  const date = format(new Date(), DATE_FORMAT)
  const currSession = getCurrentSession() ?? new Session(date, [])

  currSession.results = [...currSession.results, result]

  localStorage.setItem(CURR_SESSION_KEY, JSON.stringify(currSession))
}

export function deleteCurrentSession() {
  localStorage.removeItem(CURR_SESSION_KEY)
}

export function getSessions(): Session[] {
  const raw = localStorage.getItem(SESSION_HISTORY_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveSession(session: Session) {
  const sessions = getSessions()

  sessions.unshift(session)

  const trimmed = sessions.slice(0, MAX_SESSIONS)
  localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(trimmed))
}
