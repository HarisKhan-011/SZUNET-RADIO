import playControl from '../assets/images/Group 32.png'
import volumeIcon from '../assets/images/Group 17.png'
import onAirBadge from '../assets/images/Group 27.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import trackBadge from '../assets/images/MILEY CYRUS PRISONER.png'
import volumeLine from '../assets/images/Line 1.png'
import volumeKnob from '../assets/images/Ellipse 1.png'
import { useEffect, useState } from 'react'
import { cx } from '../utils/cx'
import StreamSelector from '../components/StreamSelector'

function useNarrowPlayerBar() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 420px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 420px)')
    function update() {
      setNarrow(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return narrow
}

function PlayerBar({
  channel,
  isPlaying,
  onChangeStream,
  onChangeVolume,
  onTogglePlay,
  selectedStreamId,
  streams,
  volume,
}) {
  const narrowBar = useNarrowPlayerBar()

  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 min-h-[var(--player-height)] overflow-hidden border-y-2 border-[#008eff] bg-[#070738] pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-12px_28px_rgba(7,7,56,0.28)]"
      aria-label={`Now playing: ${channel.playerName}. ${channel.artist} — ${channel.track}`}
    >
      <div
        className={cx(
          'mx-auto grid min-h-[calc(var(--player-height)_-_4px-env(safe-area-inset-bottom,0px))] w-[var(--page-width)] items-center gap-[clamp(10px,1.3vw,22px)] px-[clamp(10px,1.6vw,18px)] text-white',
          'grid-cols-[54px_52px_64px_150px_minmax(0,1fr)_96px_292px] max-[1050px]:grid-cols-[50px_50px_54px_118px_minmax(0,1fr)_78px_220px]',
          'max-[860px]:grid-cols-[46px_48px_46px_minmax(0,1fr)_72px_190px] max-[860px]:gap-2.5 max-[860px]:px-3',
          'max-[700px]:grid max-[700px]:w-full max-[700px]:grid-cols-[40px_44px_minmax(0,1fr)_minmax(76px,30vw)] max-[700px]:grid-rows-[auto_auto] max-[700px]:gap-x-2 max-[700px]:gap-y-1 max-[700px]:px-2 max-[700px]:py-1.5',
          /* ≤420px: single row — play | art | title + feedback inline | compact stream (no stacked bar). */
          'max-[420px]:grid-cols-[minmax(30px,34px)_minmax(32px,36px)_minmax(0,1fr)_minmax(58px,76px)] max-[420px]:grid-rows-1 max-[420px]:items-center max-[420px]:gap-x-1.5 max-[420px]:gap-y-0 max-[420px]:px-1.5 max-[420px]:py-1',
        )}
      >
        <button
          className={cx(
            'relative inline-grid h-[42px] w-[42px] cursor-pointer place-items-center justify-self-center border-0 bg-transparent p-0 transition-transform duration-150 hover:scale-[1.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
            'max-[700px]:col-start-1 max-[700px]:row-span-2 max-[700px]:row-start-1 max-[700px]:h-10 max-[700px]:w-10 max-[420px]:row-span-1 max-[420px]:h-9 max-[420px]:w-9 max-[360px]:h-8 max-[360px]:w-8',
          )}
          type="button"
          aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
          aria-pressed={isPlaying}
          onClick={onTogglePlay}
        >
          <img
            className={cx(
              'h-[42px] w-[42px] object-contain transition-[opacity,transform] duration-150 max-[700px]:h-10 max-[700px]:w-10 max-[420px]:h-9 max-[420px]:w-9 max-[360px]:h-8 max-[360px]:w-8',
              isPlaying && 'scale-[0.72] opacity-0',
            )}
            src={playControl}
            alt=""
            aria-hidden="true"
          />
          <span
            className={cx(
              'absolute left-1/2 top-1/2 grid h-6 w-5 -translate-x-1/2 -translate-y-1/2 scale-[0.8] grid-cols-2 gap-1.5 opacity-0 transition-[opacity,transform] duration-150 max-[700px]:h-5 max-[700px]:w-4 max-[700px]:gap-1',
              isPlaying && 'scale-100 opacity-100',
            )}
            aria-hidden="true"
          >
            <span className="rounded-sm bg-[#ff1111] shadow-[0_0_10px_rgba(255,17,17,0.45)]" />
            <span className="rounded-sm bg-[#ff1111] shadow-[0_0_10px_rgba(255,17,17,0.45)]" />
          </span>
        </button>

        <img
          className={cx(
            'h-[calc(var(--player-height)_-_4px)] w-[52px] self-stretch object-cover object-top',
            'max-[700px]:col-start-2 max-[700px]:row-span-2 max-[700px]:row-start-1 max-[700px]:h-[58px] max-[700px]:w-[44px] max-[700px]:self-center max-[420px]:row-span-1 max-[420px]:h-[44px] max-[420px]:w-[36px] max-[360px]:h-[42px] max-[360px]:w-[34px]',
          )}
          src={channel.portrait}
          alt={`${channel.artist} - ${channel.track}`}
        />

        <div
          className={cx(
            'min-w-0 max-w-full',
            'max-[700px]:col-start-3 max-[700px]:row-start-1 max-[700px]:row-span-2 max-[700px]:grid max-[700px]:grid-rows-[auto_auto] max-[700px]:gap-y-0.5 max-[700px]:self-center',
            'max-[420px]:col-start-3 max-[420px]:row-span-1 max-[420px]:flex max-[420px]:min-w-0 max-[420px]:flex-row max-[420px]:items-center max-[420px]:gap-1 max-[420px]:pr-0.5',
          )}
        >
          <div
            className={cx(
              'min-w-0 max-w-full overflow-hidden max-[700px]:row-start-1 max-[420px]:min-w-0 max-[420px]:flex-1',
            )}
          >
            <p className="m-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap [font-family:Arial,Helvetica,sans-serif] text-[clamp(11px,1vw,15px)] font-black uppercase leading-none text-white max-[700px]:text-[12px] max-[420px]:text-[10px] max-[360px]:text-[9px]">
              {channel.playerName}
            </p>
            <p className="m-0 mt-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap [font-family:Arial,Helvetica,sans-serif] text-[10px] font-bold uppercase leading-none text-[rgba(255,255,255,0.74)] max-[700px]:hidden min-[701px]:block">
              {channel.artist} - {channel.track}
            </p>
          </div>

          <div
            className={cx(
              'inline-flex items-center justify-start gap-1.5 max-[700px]:row-start-2 max-[700px]:min-w-0 max-[700px]:justify-self-start max-[420px]:shrink-0 max-[420px]:gap-1',
            )}
            aria-label="Track feedback"
          >
            <button
              className="inline-grid h-8 w-8 cursor-pointer place-items-center border-0 bg-transparent p-0 transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[420px]:h-7 max-[420px]:w-7 max-[360px]:h-6 max-[360px]:w-6"
              type="button"
              aria-label="Like this track"
            >
              <img
                className="h-[21px] w-[21px] object-contain max-[700px]:h-[17px] max-[700px]:w-[17px] max-[420px]:h-[14px] max-[420px]:w-[14px]"
                src={likeIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
            <button
              className="inline-grid h-8 w-8 cursor-pointer place-items-center border-0 bg-transparent p-0 transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[420px]:h-7 max-[420px]:w-7 max-[360px]:h-6 max-[360px]:w-6"
              type="button"
              aria-label="Dislike this track"
            >
              <img
                className="h-[21px] w-[21px] object-contain max-[700px]:h-[17px] max-[700px]:w-[17px] max-[420px]:h-[14px] max-[420px]:w-[14px]"
                src={dislikeIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="max-[860px]:hidden">
          <img className="block h-auto w-[61px]" src={trackBadge} alt="Miley Cyrus Prisoner" />
        </div>

        <img className="h-auto w-[88px] justify-self-center max-[860px]:hidden" src={onAirBadge} alt="On air" />

        <div
          className={cx(
            'flex min-w-0 items-center justify-end gap-[clamp(8px,1.2vw,14px)]',
            /* ≤860px badge/on-air hidden: last cell was only 72px — span volume+select across both trailing tracks (fixes ~768px). */
            'min-[701px]:max-[860px]:col-span-2 min-[701px]:max-[860px]:w-full min-[701px]:max-[860px]:min-w-0 min-[701px]:max-[860px]:justify-end min-[701px]:max-[860px]:gap-2',
            'max-[860px]:min-w-0 max-[860px]:justify-end max-[860px]:gap-2',
            'max-[700px]:col-start-4 max-[700px]:row-span-2 max-[700px]:row-start-1 max-[700px]:self-center max-[700px]:justify-self-stretch max-[700px]:gap-0',
            'max-[420px]:col-start-4 max-[420px]:row-span-1 max-[420px]:row-start-1 max-[420px]:w-auto max-[420px]:max-w-[76px] max-[420px]:min-w-0 max-[420px]:shrink-0 max-[420px]:justify-self-end',
          )}
        >
          <div className="flex min-w-0 flex-1 items-center justify-end gap-[clamp(8px,1.2vw,14px)] max-[860px]:min-w-0 max-[860px]:max-w-[min(160px,42%)] max-[700px]:hidden">
            <img className="h-5 w-[22px] shrink-0 object-contain" src={volumeIcon} alt="" aria-hidden="true" />
            <label
              className="relative block h-6 w-[min(20vw,150px)] min-w-[72px] max-w-[150px] max-[860px]:w-full max-[860px]:max-w-none"
              style={{ '--volume': `${volume}%` }}
            >
              <span className="sr-only">Volume</span>
              <span
                className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#ff1111]"
                style={{ width: `${volume}%` }}
                aria-hidden="true"
              />
              <img
                className="absolute inset-x-0 top-1/2 h-[3px] w-full -translate-y-1/2"
                src={volumeLine}
                alt=""
                aria-hidden="true"
              />
              <img
                className="pointer-events-none absolute top-1/2 left-[var(--volume)] h-5 w-5 -translate-x-1/2 -translate-y-1/2"
                src={volumeKnob}
                alt=""
                aria-hidden="true"
              />
              <input
                className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0 [appearance:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [&::-webkit-slider-thumb]:h-1 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:h-1 [&::-moz-range-thumb]:w-1 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-0"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(event) => onChangeVolume(Number(event.target.value))}
              />
            </label>
          </div>

          <StreamSelector
            className="shrink-0 max-[860px]:w-[min(190px,48%)] max-[700px]:w-full max-[420px]:w-full max-[420px]:max-w-[76px]"
            compact={narrowBar}
            onSelect={onChangeStream}
            selectedStreamId={selectedStreamId}
            streams={streams}
          />
        </div>
      </div>
    </section>
  )
}

export default PlayerBar
