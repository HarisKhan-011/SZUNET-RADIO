import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { scheduleItems } from '../data/schedule'
import './ScheduleSection.css'

const DEFAULT_ACTIVE_ITEM_ID = '1745'
const TICK_COUNT = 96

function getAnchor(index, total) {
  return `${((index + 0.5) / total) * 100}%`
}

function ScheduleTrackCard({ item, index, isActive, onSelect, anchor }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      className={`schedule-card snap-center ${isActive ? 'is-active' : ''}`}
      style={{ '--card-anchor': anchor }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.025 : 1,
        y: isActive ? -4 : 0,
      }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.035,
        duration: 0.22,
        ease: 'easeOut',
      }}
    >
      <motion.button
        className="schedule-card-button group"
        type="button"
        aria-label={`Play ${item.artist} - ${item.title} at ${item.time}`}
        aria-pressed={isActive}
        onClick={() => onSelect(item.id)}
        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      >
        <div className="schedule-copy">
          <span>{item.artist}</span>
          <strong>{item.title}</strong>
        </div>

        <div className="schedule-cover-wrap">
          <img
            className="schedule-cover"
            src={item.cover}
            alt={`${item.artist} - ${item.title}`}
          />
          <span className="schedule-play" aria-hidden="true">
            {isActive ? (
              <span className="schedule-equalizer">
                <i />
                <i />
                <i />
              </span>
            ) : (
              <span className="schedule-play-icon" />
            )}
          </span>
        </div>

        <time className="schedule-time" dateTime={item.time}>
          {item.time}
        </time>
      </motion.button>
    </motion.article>
  )
}

function ScheduleTimeline({ items, activeIndex, activeItem, onSelect }) {
  const progress = getAnchor(activeIndex, items.length)
  const minorTicks = Array.from({ length: TICK_COUNT }, (_, index) => index)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="schedule-timeline"
      style={{ '--timeline-progress': progress }}
      aria-label="Schedule progress timeline"
    >
      <div className="timeline-progress-lane" aria-hidden="true">
        <motion.span
          className="timeline-progress"
          initial={false}
          animate={{ width: progress }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: 'easeOut' }}
        />
      </div>

      <div className="timeline-ruler" aria-hidden="true">
        <div className="timeline-minor-ticks">
          {minorTicks.map((tick) => (
            <span
              className={tick % 12 === 0 ? 'is-measure' : tick % 4 === 0 ? 'is-mid' : ''}
              key={tick}
            />
          ))}
        </div>
      </div>

      <ol className="timeline-major-ticks">
        {items.map((item, index) => {
          const position = getAnchor(index, items.length)

          return (
            <li
              className={index === activeIndex ? 'is-active' : ''}
              key={item.id}
              style={{ '--tick-position': position }}
            >
              <button
                type="button"
                aria-label={`Jump to ${item.time}, ${item.artist} - ${item.title}`}
                onClick={() => onSelect(item.id)}
              >
                <span className="major-tick-line" aria-hidden="true" />
                <time dateTime={item.time}>{item.time}</time>
              </button>
            </li>
          )
        })}
      </ol>

      <motion.div
        className="timeline-now"
        aria-live="polite"
        initial={false}
        animate={{ left: progress }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: 'easeOut' }}
      >
        <span>{activeItem.time}</span>
      </motion.div>
    </div>
  )
}

function ScheduleSection() {
  const [activeItemId, setActiveItemId] = useState(DEFAULT_ACTIVE_ITEM_ID)

  const activeIndex = useMemo(() => {
    const index = scheduleItems.findIndex((item) => item.id === activeItemId)
    return index >= 0 ? index : 0
  }, [activeItemId])

  const activeItem = scheduleItems[activeIndex] ?? scheduleItems[0]

  return (
    <section className="schedule-section" aria-label="Upcoming songs timeline">
      <div className="schedule-board">
        <div className="schedule-scroll overflow-x-auto scroll-smooth">
          <div className="schedule-grid">
            {scheduleItems.map((item, index) => (
              <ScheduleTrackCard
                anchor={getAnchor(index, scheduleItems.length)}
                item={item}
                index={index}
                isActive={item.id === activeItem.id}
                key={item.id}
                onSelect={setActiveItemId}
              />
            ))}
          </div>

          <ScheduleTimeline
            items={scheduleItems}
            activeIndex={activeIndex}
            activeItem={activeItem}
            onSelect={setActiveItemId}
          />
        </div>
      </div>
    </section>
  )
}

export default ScheduleSection
