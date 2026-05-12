import { motion, useReducedMotion } from 'framer-motion'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import { radioChartRows } from '../data/radioCharts'
import './RadioChartsSection.css'

function ChartLabel({ label }) {
  return (
    <div className="chart-label" aria-hidden="true">
      <span>{label}</span>
    </div>
  )
}

function ReactionIcons({ trend }) {
  return (
    <div className="reaction-icons" aria-label={trend === 'up' ? 'Rising track' : 'Hot track'}>
      <img src={likeIcon} alt="" aria-hidden="true" />
      <img src={dislikeIcon} alt="" aria-hidden="true" />
    </div>
  )
}

function MusicMeta({ artist, title }) {
  return (
    <div className="music-meta">
      <strong>{artist}</strong>
      <span>{title}</span>
    </div>
  )
}

function RankingNumber({ rank }) {
  return (
    <motion.div
      className="ranking-number"
      aria-label={`Rank ${rank}`}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {rank}
    </motion.div>
  )
}

function ChartCard({ card, rank, rowTone }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      className="chart-card"
      aria-label={`${rank}. ${card.artist} - ${card.title}`}
      whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.025 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="chart-cover">
        <img src={card.image} alt={`${card.artist} - ${card.title}`} style={{ objectPosition: card.imagePosition }} />
        <ReactionIcons trend={card.trend} />
        <span className={`chart-rank-chip chart-rank-chip--${rowTone}`}>#{rank}</span>
      </div>
      <MusicMeta artist={card.artist} title={card.title} />
    </motion.article>
  )
}

function ChartRow({ row, index }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      className={`chart-row chart-row--${row.tone}`}
      aria-labelledby={`${row.id}-chart-heading`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.36 }}
      transition={{ duration: 0.42, ease: 'easeOut', delay: index * 0.045 }}
    >
      <h2 className="sr-only" id={`${row.id}-chart-heading`}>
        {row.label}
      </h2>
      <ChartLabel label={row.label} />

      <div className="chart-row-scroll scroll-smooth">
        <div className="chart-row-track">
          {row.cards.map((card, cardIndex) => (
            <div className="chart-segment" key={`${row.id}-${card.id}-${cardIndex}`}>
              <ChartCard card={card} rank={cardIndex + 1} rowTone={row.tone} />
              {cardIndex < row.cards.length - 1 ? (
                <RankingNumber rank={cardIndex + 1} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function RadioChartsSection() {
  return (
    <section className="radio-charts-section" aria-label="SZUNET RADIO charts">
      <div className="radio-charts-board">
        {radioChartRows.map((row, index) => (
          <ChartRow row={row} index={index} key={row.id} />
        ))}
      </div>
    </section>
  )
}

export default RadioChartsSection
