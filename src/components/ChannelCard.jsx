import { motion, useReducedMotion } from 'framer-motion'
import { brandAssets } from '../data/channels'
import { cx } from '../utils/cx'

const cardHeightByIndex = {
  1: 'h-[clamp(430px,38vw,545px)] max-[760px]:h-[min(68svh,450px)] max-[420px]:h-[min(66svh,410px)]',
  3: 'h-[clamp(370px,32vw,470px)] max-[760px]:h-[min(62svh,390px)] max-[420px]:h-[min(60svh,352px)]',
  4: 'h-[clamp(430px,37vw,540px)] max-[760px]:h-[min(66svh,438px)] max-[420px]:h-[min(64svh,400px)]',
}

function ChannelCard({ channel, index, isPlaying, onToggle }) {
  const isFeature = channel.size === 'feature'
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      className={cx(
        'relative min-w-0 snap-center overflow-hidden bg-[#111] shadow-[0_16px_32px_rgba(0,0,0,0.18)]',
        '[--footer-height:27%] [--play-size:clamp(54px,6.2vw,64px)]',
        'h-[clamp(398px,34vw,500px)] flex-[1_1_0]',
        'max-[760px]:h-[min(66svh,430px)] max-[760px]:flex-[0_0_76vw] max-[420px]:h-[min(64svh,390px)] max-[420px]:flex-[0_0_78vw]',
        isPlaying && 'outline-4 -outline-offset-4 outline-white',
        cardHeightByIndex[index],
        isFeature &&
          '[--footer-height:24%] [--play-size:clamp(62px,7.2vw,74px)] h-[clamp(450px,39vw,575px)] flex-[1.34_1_0] max-[760px]:h-[min(70svh,470px)] max-[760px]:flex-[0_0_82vw] max-[420px]:h-[min(68svh,420px)] max-[420px]:flex-[0_0_84vw]',
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.56, ease: 'easeOut', delay: 0.12 + index * 0.08 }}
    >
      <img
        className={cx(
          'absolute inset-x-0 top-0 bottom-[var(--footer-height)] h-[calc(100%_-_var(--footer-height))] w-full object-cover object-top transition-[filter,transform] duration-[240ms]',
          channel.id === 'relax' && 'max-[760px]:object-[58%_center]',
          isPlaying && '[filter:saturate(1.12)_contrast(1.04)] scale-[1.015]',
        )}
        src={channel.portrait}
        alt={`${channel.artist} - ${channel.track}`}
      />

      <div className="absolute right-[clamp(9px,1.1vw,13px)] z-[2] grid min-w-0 gap-px bottom-[calc(var(--footer-height)_+_clamp(10px,1.4vw,15px))] left-[clamp(9px,1.1vw,13px)] uppercase text-white [text-shadow:0_2px_7px_rgba(0,0,0,0.8)]">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(8px,0.9vw,11px)] font-black leading-none">
          {channel.artist}
        </span>
        <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(12px,1.25vw,16px)] font-[950] leading-[0.95]">
          {channel.track}
        </strong>
      </div>

      <button
        className="absolute left-1/2 top-[48%] z-[3] h-[var(--play-size)] w-[var(--play-size)] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 transition-[filter,transform] duration-[160ms] hover:scale-[1.08] hover:[filter:drop-shadow(0_10px_18px_rgba(0,0,0,0.28))] focus-visible:rounded-full focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white"
        type="button"
        aria-label={`${isPlaying ? 'Pause' : 'Play'} ${channel.title} radio`}
        aria-pressed={isPlaying}
        onClick={() => onToggle(channel.id)}
      >
        <img
          className={cx(
            'block h-full w-full object-contain transition-[opacity,transform] duration-150',
            isPlaying && 'scale-[0.72] opacity-0',
          )}
          src={channel.playIcon}
          alt=""
          aria-hidden="true"
        />
        <span
          className={cx(
            'absolute left-1/2 top-1/2 grid h-[58%] w-[52%] -translate-x-1/2 -translate-y-1/2 scale-[0.74] grid-cols-2 place-items-center gap-[24%] opacity-0 transition-[opacity,transform] duration-150',
            isPlaying && 'scale-100 opacity-100',
          )}
          aria-hidden="true"
        >
          <span className="h-full w-full rounded-sm bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)]" />
          <span className="h-full w-full rounded-sm bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)]" />
        </span>
      </button>

      <footer className="absolute inset-x-0 bottom-0 h-[var(--footer-height)] overflow-hidden">
        <img className="absolute inset-0 h-full w-full object-cover" src={channel.panel} alt="" />
        <div className="relative z-[1] grid h-full content-center justify-items-center gap-[clamp(2px,0.6vw,7px)] px-[8%] py-[clamp(10px,1.6vw,18px)]">
          <img
            className={cx(
              'h-auto w-[clamp(88px,11vw,112px)]',
              isFeature && 'w-[clamp(104px,12.5vw,130px)]',
            )}
            src={brandAssets.stationLogo}
            alt="SZUNET Radio"
          />
          {channel.label && (
            <img
              className="h-[clamp(18px,2.6vw,36px)] w-auto max-w-[86%] object-contain"
              src={channel.label}
              alt={channel.title}
            />
          )}
        </div>
      </footer>
    </motion.article>
  )
}

export default ChannelCard
