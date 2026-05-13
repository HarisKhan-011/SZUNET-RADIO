import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import { radioChartRows } from '../data/radioCharts'
import { cx } from '../utils/cx'

const toneStyles = {
  szunet: {
    gradient: 'bg-[linear-gradient(100deg,#c90016_0%,#ff1111_45%,#ff4a27_100%)]',
    chip: 'bg-[#ff1111]',
  },
  oldschool: {
    gradient: 'bg-[linear-gradient(100deg,#b45d00_0%,#f58400_48%,#ff501f_100%)]',
    chip: 'bg-[#ff8500]',
  },
  power: {
    gradient: 'bg-[linear-gradient(100deg,#0038d6_0%,#087bff_54%,#4b79ff_100%)]',
    chip: 'bg-[#008eff]',
  },
  relax: {
    gradient: 'bg-[linear-gradient(100deg,#008323_0%,#1db940_48%,#86e663_100%)]',
    chip: 'bg-[#24c447]',
  },
  electric: {
    gradient: 'bg-[linear-gradient(100deg,#7700df_0%,#bd1dff_46%,#ff42d0_100%)]',
    chip: 'bg-[#d818ff]',
  },
}

function ChartLabel({ label }) {
  return (
    <div
      className="relative z-[2] grid place-items-center bg-[rgba(0,0,0,0.2)] shadow-[inset_-1px_0_0_rgba(255,255,255,0.2),inset_1px_0_0_rgba(0,0,0,0.12)]"
      aria-hidden="true"
    >
      <span className="block rotate-180 [font-family:Arial,Helvetica,sans-serif] text-[clamp(9px,0.85vw,13px)] font-[950] leading-none tracking-[0.06em] text-white uppercase [text-shadow:0_2px_8px_rgba(0,0,0,0.28)] [writing-mode:vertical-rl] max-[420px]:text-[8px]">
        {label}
      </span>
    </div>
  )
}

function ReactionIcons({ trend }) {
  return (
    <div
      className="absolute right-1 top-1 z-[3] inline-flex items-center gap-[3px]"
      aria-label={trend === 'up' ? 'Rising track' : 'Hot track'}
    >
      <img
        className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] object-contain [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(98%)_saturate(1707%)_hue-rotate(100deg)_brightness(99%)_contrast(108%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.36))]"
        src={likeIcon}
        alt=""
        aria-hidden="true"
      />
      <img
        className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] object-contain [filter:brightness(0)_saturate(100%)_invert(21%)_sepia(96%)_saturate(5505%)_hue-rotate(350deg)_brightness(101%)_contrast(105%)_drop-shadow(0_1px_2px_rgba(0,0,0,0.36))]"
        src={dislikeIcon}
        alt=""
        aria-hidden="true"
      />
    </div>
  )
}

function MusicMeta({ artist, title }) {
  return (
    <div className="grid min-w-0 gap-[2px] [font-family:Arial,Helvetica,sans-serif] leading-none text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.28)]">
      <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(8px,0.78vw,12px)] font-[950] uppercase max-[620px]:text-[6.5px] max-[360px]:text-[5.5px]">
        {artist}
      </strong>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(7px,0.68vw,10px)] font-extrabold max-[620px]:text-[5.5px] max-[360px]:text-[5px]">
        {title}
      </span>
    </div>
  )
}

function RankingNumber({ rank }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="cursor-default justify-self-center self-center [font-family:Arial,Helvetica,sans-serif] text-[clamp(60px,7.35vw,110px)] font-[950] leading-[0.76] text-white [text-shadow:0_10px_22px_rgba(0,0,0,0.2),-2px_0_0_rgba(255,255,255,0.2)] max-[760px]:text-[42px] max-[620px]:text-[34px] max-[420px]:text-[30px] max-[360px]:text-[25px]"
      aria-label={`Rank ${rank}`}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {rank}
    </motion.div>
  )
}

function ChartCard({ card, rank, rowTone }) {
  const prefersReducedMotion = useReducedMotion()
  const tone = toneStyles[rowTone]

  return (
    <motion.article
      className="grid min-w-0 cursor-pointer gap-1.5 [transform-origin:center] group"
      aria-label={`${rank}. ${card.artist} - ${card.title}`}
      whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.035 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="relative isolate aspect-square overflow-hidden border-2 border-[rgba(255,255,255,0.82)] bg-[rgba(8,8,51,0.18)] shadow-[0_10px_18px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.28)] transition-[box-shadow,filter] duration-200 group-hover:shadow-[0_14px_24px_rgba(0,0,0,0.26),0_0_18px_rgba(255,255,255,0.2)]">
        <img
          className="block h-full w-full object-cover transition-transform duration-[220ms] motion-reduce:transition-none group-hover:scale-[1.045]"
          src={card.image}
          alt={`${card.artist} - ${card.title}`}
          style={{ objectPosition: card.imagePosition }}
        />
        <span
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.44)),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.22),transparent_14%)]"
          aria-hidden="true"
        />
        <ReactionIcons trend={card.trend} />
        <span
          className={cx(
            'absolute left-[5px] top-[5px] z-[3] inline-grid min-h-[21px] min-w-[21px] place-items-center rounded-full [font-family:Arial,Helvetica,sans-serif] text-[9px] font-[950] leading-none text-white shadow-[0_4px_10px_rgba(0,0,0,0.24)] max-[620px]:left-1 max-[620px]:top-1 max-[620px]:min-h-[16px] max-[620px]:min-w-[16px] max-[620px]:text-[7px] max-[360px]:min-h-[13px] max-[360px]:min-w-[13px] max-[360px]:text-[6px]',
            tone.chip,
          )}
        >
          #{rank}
        </span>
      </div>
      <MusicMeta artist={card.artist} title={card.title} />
    </motion.article>
  )
}

function ChartRow({ row, index }) {
  const prefersReducedMotion = useReducedMotion()
  const tone = toneStyles[row.tone]
  const visibleCards = row.cards.slice(0, 4)

  return (
    <motion.section
      className={cx(
        'relative isolate grid min-h-[clamp(128px,12.4vw,178px)] grid-cols-[clamp(38px,4.1vw,58px)_1fr] overflow-hidden text-white shadow-[0_18px_34px_rgba(8,8,51,0.14),inset_0_1px_0_rgba(255,255,255,0.24)] max-[760px]:min-h-[138px] max-[620px]:min-h-[128px] max-[620px]:grid-cols-[36px_1fr] max-[360px]:min-h-[116px] max-[360px]:grid-cols-[30px_1fr]',
        tone.gradient,
      )}
      aria-labelledby={`${row.id}-chart-heading`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.36 }}
      transition={{ duration: 0.42, ease: 'easeOut', delay: index * 0.045 }}
    >
      <h2 className="sr-only" id={`${row.id}-chart-heading`}>
        {row.label}
      </h2>
      <motion.span
        className={cx('pointer-events-none absolute inset-0 z-0 bg-[length:150%_150%] opacity-90', tone.gradient)}
        aria-hidden="true"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={prefersReducedMotion ? undefined : { backgroundPosition: '100% 50%' }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      <span
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.82),transparent_7%),repeating-linear-gradient(90deg,rgba(255,255,255,0.22)_0_1px,transparent_1px_34px)] opacity-[0.18] mix-blend-screen"
        aria-hidden="true"
      />
      <ChartLabel label={row.label} />

      <div className="relative z-[2] min-w-0 overflow-hidden">
        <div className="grid h-full grid-cols-[minmax(74px,1fr)_clamp(34px,5vw,78px)_minmax(74px,1fr)_clamp(34px,5vw,78px)_minmax(74px,1fr)_clamp(34px,5vw,78px)_minmax(74px,1fr)] items-center gap-[clamp(8px,1.08vw,18px)] px-[clamp(13px,1.9vw,30px)] py-[clamp(12px,1.45vw,20px)] max-[760px]:grid-cols-[minmax(48px,1fr)_28px_minmax(48px,1fr)_28px_minmax(48px,1fr)_28px_minmax(48px,1fr)] max-[760px]:gap-2 max-[760px]:px-2.5 max-[620px]:grid-cols-[minmax(42px,1fr)_22px_minmax(42px,1fr)_22px_minmax(42px,1fr)_22px_minmax(42px,1fr)] max-[620px]:gap-1.5 max-[620px]:px-2 max-[620px]:py-2 max-[360px]:grid-cols-[minmax(34px,1fr)_18px_minmax(34px,1fr)_18px_minmax(34px,1fr)_18px_minmax(34px,1fr)] max-[360px]:gap-1 max-[360px]:px-1.5 max-[360px]:py-1.5">
          {visibleCards.map((card, cardIndex) => (
            <Fragment key={`${row.id}-${card.id}-${cardIndex}`}>
              <div className="min-w-0">
                <ChartCard card={card} rank={cardIndex + 1} rowTone={row.tone} />
              </div>
              {cardIndex < visibleCards.length - 1 ? (
                <RankingNumber rank={cardIndex + 1} />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function RadioChartsSection() {
  return (
    <section className="bg-[#5cf5df] pb-[clamp(28px,4vw,58px)]" aria-label="SZUNET RADIO charts">
      <div className="mx-auto grid w-[var(--page-width)] gap-[8px] overflow-hidden max-[620px]:w-[calc(100vw-20px)]">
        {radioChartRows.map((row, index) => (
          <ChartRow row={row} index={index} key={row.id} />
        ))}
      </div>
    </section>
  )
}

export default RadioChartsSection
