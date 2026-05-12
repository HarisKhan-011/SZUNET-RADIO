import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { brandAssets } from '../data/channels'
import redBackground from '../assets/images/Rectangle 19.png'
import ScheduleSection from '../sections/ScheduleSection'
import RadioChartsSection from '../sections/RadioChartsSection'
import FooterSection from '../sections/FooterSection'
import './SecondRadioPage.css'

const navItems = ['ELECTRIC', 'SZUNET', 'RELAX', 'OLSCHOOL', 'POWER']

const calendarMonths = [
  { label: 'APR', year: 2026, days: 30, offset: 2, defaultDay: 8 },
  { label: 'MAY', year: 2026, days: 31, offset: 4, defaultDay: 12 },
]

function RadioHeader() {
  return (
    <header className="second-radio-header">
      <a className="second-logo" href="/" aria-label="SZUNET RADIO home">
        <img src={brandAssets.stationLogo} alt="SZUNET RADIO" />
      </a>

      <nav className="second-nav" aria-label="Radio categories">
        {navItems.map((item, index) => (
          <a
            className={index === 1 ? 'is-active' : ''}
            href={`#${item.toLowerCase()}`}
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}

function CalendarWidget() {
  const [monthIndex, setMonthIndex] = useState(0)
  const month = calendarMonths[monthIndex]
  const [selectedDay, setSelectedDay] = useState(month.defaultDay)

  const calendarCells = useMemo(() => {
    const blanks = Array.from({ length: month.offset }, (_, index) => ({
      id: `blank-${month.label}-${index}`,
      day: null,
    }))
    const days = Array.from({ length: month.days }, (_, index) => ({
      id: `${month.label}-${index + 1}`,
      day: index + 1,
    }))

    return [...blanks, ...days]
  }, [month])

  function changeMonth(direction) {
    setMonthIndex((currentIndex) => {
      const nextIndex =
        (currentIndex + direction + calendarMonths.length) % calendarMonths.length
      setSelectedDay(calendarMonths[nextIndex].defaultDay)
      return nextIndex
    })
  }

  return (
    <motion.article
      className="calendar-widget"
      aria-label={`${month.label} ${month.year} calendar`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
    >
      <div className="calendar-topbar">
        <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>
          {'<'}
        </button>
        <strong>
          {month.label} <span>{month.year}</span>
        </strong>
        <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>
          {'>'}
        </button>
      </div>

      <div className="calendar-weekdays" aria-hidden="true">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>

      <div className="calendar-days">
        {calendarCells.map((cell) =>
          cell.day ? (
            <button
              className={selectedDay === cell.day ? 'is-selected' : ''}
              type="button"
              aria-label={`${month.label} ${cell.day}, ${month.year}`}
              aria-pressed={selectedDay === cell.day}
              key={cell.id}
              onClick={() => setSelectedDay(cell.day)}
            >
              {cell.day}
            </button>
          ) : (
            <span aria-hidden="true" key={cell.id} />
          ),
        )}
      </div>
    </motion.article>
  )
}

function TimeWidget() {
  return (
    <motion.div
      className="time-widget"
      aria-label="Current time 17:25"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.38, ease: 'easeOut', delay: 0.25 }}
    >
      <span className="time-chevron time-chevron--top" aria-hidden="true" />
      <time dateTime="17:25">17:25</time>
      <span className="time-chevron time-chevron--bottom" aria-hidden="true" />
    </motion.div>
  )
}

function RocketIllustration() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="rocket-wrap"
      aria-hidden="true"
      animate={prefersReducedMotion ? undefined : { y: [-4, 7, -4], rotate: [-1, 1, -1] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="rocket">
        <span className="rocket-nose" />
        <span className="rocket-body" />
        <span className="rocket-window" />
        <span className="rocket-fin rocket-fin--left" />
        <span className="rocket-fin rocket-fin--right" />
        <span className="rocket-flame" />
      </div>
      <div className="rocket-clouds">
        <span />
        <span />
        <span />
        <span />
      </div>
    </motion.div>
  )
}

function EditorialCopy() {
  return (
    <motion.div
      className="editorial-copy"
      initial={{ opacity: 0, x: -22, rotate: -5 }}
      animate={{ opacity: 1, x: 0, rotate: -5 }}
      transition={{ duration: 0.48, ease: 'easeOut' }}
    >
      <p>MEGTETSZETT?</p>
      <p>KERESD</p>
      <p>VISSZA!</p>
    </motion.div>
  )
}

function DecorativeElements() {
  return (
    <div className="second-decor" aria-hidden="true">
      <span className="decor-cross decor-cross--one" />
      <span className="decor-cross decor-cross--two" />
      <span className="decor-cross decor-cross--three" />
      <span className="decor-dot decor-dot--one" />
      <span className="decor-dot decor-dot--two" />
      <span className="decor-lines" />
      <span className="decor-triangles" />
      <span className="decor-wave" />
    </div>
  )
}

function ScheduleTimelineSection() {
  return (
    <div className="second-schedule-wrap">
      <ScheduleSection />
    </div>
  )
}

function HeroRadioSection() {
  return (
    <section className="second-hero" aria-label="SZUNET RADIO archive hero">
      <img className="second-hero-bg" src={redBackground} alt="" aria-hidden="true" />
      <div className="second-hero-overlay" />
      <DecorativeElements />

      <RadioHeader />

      <div className="second-hero-stage">
        <EditorialCopy />
        <CalendarWidget />
        <TimeWidget />
        <RocketIllustration />
      </div>

      <ScheduleTimelineSection />
    </section>
  )
}

function ChartsSection() {
  return (
    <section className="charts-section" aria-label="Charts">
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        CHARTS
      </motion.h1>
    </section>
  )
}

function SecondRadioPage() {
  return (
    <main className="second-page">
      <HeroRadioSection />
      <ChartsSection />
      <RadioChartsSection />
      <FooterSection />
    </main>
  )
}

export default SecondRadioPage
