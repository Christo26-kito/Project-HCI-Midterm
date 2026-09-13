import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/StoreContext'
import { sfx } from '../lib/sound'

export default function Footer() {
  const { t } = useStore()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      sfx.error()
      return
    }
    setDone(true)
    sfx.success()
    setEmail('')
    setTimeout(() => setDone(false), 3000)
  }

  const cols = [
    { title: t('footer.shop'), links: [t('footer.l1'), t('footer.l2'), t('footer.l3')] },
    { title: t('footer.help'), links: [t('footer.h1'), t('footer.h2'), t('footer.h3')] },
    { title: t('footer.about'), links: [t('footer.a1'), t('footer.a2'), t('footer.a3')] },
  ]

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.4fr] lg:px-8">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">
            SOLE<span className="text-accent">⌁</span>ARCHIVE
          </p>
          <p className="mt-2 max-w-xs font-serif text-lg italic leading-snug text-muted">{t('footer.tag')}</p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="label-mega mb-3">{c.title}</p>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-muted transition-colors duration-300 hover:text-ink"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="label-mega mb-3">Newsletter</p>
          <p className="text-sm text-muted">{t('footer.news')}</p>
          <form onSubmit={subscribe} className="mt-3 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.newsPh')}
              className="field !py-2.5 text-sm"
              aria-label={t('footer.newsPh')}
            />
            <motion.button whileTap={{ scale: 0.95 }} type="submit" className="btn-primary shrink-0 !px-4 !py-2.5 text-xs">
              {t('footer.newsBtn')}
            </motion.button>
          </form>
          {done && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs font-semibold text-ok"
            >
              {t('footer.newsOk')}
            </motion.p>
          )}
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 SOLE⌁ARCHIVE. {t('footer.rights')}</p>
          <p>{t('footer.demo')}</p>
        </div>
      </div>
    </footer>
  )
}
