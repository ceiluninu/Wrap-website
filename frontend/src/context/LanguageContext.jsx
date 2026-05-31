import { createContext, useContext, useState } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('wb_lang') || 'en')

  const toggleLang = () => {
    const next = lang === 'en' ? 'vi' : 'en'
    setLang(next)
    localStorage.setItem('wb_lang', next)
  }

  const t = (path) => {
    const keys = path.split('.')
    let val = translations[lang]
    for (const k of keys) {
      val = val?.[k]
    }
    return val || path
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
