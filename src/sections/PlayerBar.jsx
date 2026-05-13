import playControl from '../assets/images/Group 32.png'
import volumeIcon from '../assets/images/Group 17.png'
import onAirBadge from '../assets/images/Group 27.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import trackBadge from '../assets/images/MILEY CYRUS PRISONER.png'
import volumeLine from '../assets/images/Line 1.png'
import volumeKnob from '../assets/images/Ellipse 1.png'
import { cx } from '../utils/cx'

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
  return (
    <section
      className="fixed inset-x-0 bottom-0 z-50 min-h-[var(--player-height)] overflow-hidden border-y-2 border-[#008eff] bg-[#070738] shadow-[0_-12px_28px_rgba(7,7,56,0.28)]"
      aria-label="Now playing"
    >
      <div className="mx-auto grid min-h-[calc(var(--player-height)_-_4px)] w-[var(--page-width)] grid-cols-[54px_52px_64px_150px_minmax(0,1fr)_96px_292px] items-center gap-[clamp(10px,1.3vw,22px)] px-[clamp(10px,1.6vw,18px)] text-white max-[1050px]:grid-cols-[50px_50px_54px_118px_minmax(0,1fr)_78px_220px] max-[1050px]:gap-3 max-[860px]:grid-cols-[46px_48px_46px_minmax(0,1fr)_72px_190px] max-[860px]:gap-2.5 max-[860px]:px-3 max-[700px]:w-full max-[700px]:grid-cols-[42px_46px_minmax(0,1fr)_74px_92px] max-[700px]:grid-rows-[44px_34px] max-[700px]:gap-x-2 max-[700px]:gap-y-0 max-[700px]:px-2 max-[420px]:grid-cols-[38px_42px_minmax(0,1fr)_62px_84px] max-[420px]:gap-x-1.5 max-[360px]:grid-cols-[36px_38px_minmax(0,1fr)_54px_76px] max-[360px]:px-1.5">
        <button
          className="relative inline-grid h-[42px] w-[42px] cursor-pointer place-items-center justify-self-center border-0 bg-transparent p-0 transition-transform duration-150 hover:scale-[1.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[700px]:row-span-2 max-[700px]:h-10 max-[700px]:w-10 max-[420px]:h-9 max-[420px]:w-9 max-[360px]:h-8 max-[360px]:w-8"
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
          className="h-[calc(var(--player-height)_-_4px)] w-[52px] self-stretch object-cover object-top max-[700px]:row-span-2 max-[700px]:h-[62px] max-[700px]:w-[46px] max-[700px]:self-center max-[420px]:h-[58px] max-[420px]:w-[42px] max-[360px]:h-[54px] max-[360px]:w-[38px]"
          src={channel.portrait}
          alt={`${channel.artist} - ${channel.track}`}
        />

        <div className="inline-flex items-center justify-start gap-1.5 max-[700px]:col-[3] max-[700px]:row-[2] max-[700px]:justify-start max-[700px]:gap-1.5" aria-label="Track feedback">
          <button
            className="inline-grid h-8 w-8 cursor-pointer place-items-center border-0 bg-transparent p-0 transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[700px]:h-8 max-[700px]:w-8 max-[360px]:h-7 max-[360px]:w-7"
            type="button"
            aria-label="Like this track"
          >
            <img className="h-[21px] w-[21px] object-contain max-[700px]:h-[17px] max-[700px]:w-[17px] max-[360px]:h-[15px] max-[360px]:w-[15px]" src={likeIcon} alt="" aria-hidden="true" />
          </button>
          <button
            className="inline-grid h-8 w-8 cursor-pointer place-items-center border-0 bg-transparent p-0 transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[700px]:h-8 max-[700px]:w-8 max-[360px]:h-7 max-[360px]:w-7"
            type="button"
            aria-label="Dislike this track"
          >
            <img className="h-[21px] w-[21px] object-contain max-[700px]:h-[17px] max-[700px]:w-[17px] max-[360px]:h-[15px] max-[360px]:w-[15px]" src={dislikeIcon} alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="max-[860px]:hidden">
          <img className="block h-auto w-[61px]" src={trackBadge} alt="Miley Cyrus Prisoner" />
        </div>

        <img className="h-auto w-[88px] justify-self-center max-[860px]:hidden" src={onAirBadge} alt="On air" />
        <div className="min-w-0 max-[700px]:col-[3] max-[700px]:row-[1] max-[700px]:self-end max-[700px]:pr-1">
          <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap [font-family:Arial,Helvetica,sans-serif] text-[clamp(11px,1vw,15px)] font-black uppercase leading-none text-white max-[700px]:text-[12px] max-[420px]:text-[11px] max-[360px]:text-[10px]">
            {channel.playerName}
          </p>
          <p className="m-0 mt-1 overflow-hidden text-ellipsis whitespace-nowrap [font-family:Arial,Helvetica,sans-serif] text-[10px] font-bold uppercase leading-none text-[rgba(255,255,255,0.74)] max-[700px]:mt-0.5 max-[700px]:text-[8px] max-[420px]:text-[7px] max-[360px]:text-[6.5px]">
            {channel.artist} - {channel.track}
          </p>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-[clamp(8px,1.2vw,14px)] max-[700px]:col-[4/6] max-[700px]:row-span-2 max-[700px]:gap-1.5 max-[420px]:gap-1">
          <img className="h-5 w-[22px] object-contain max-[700px]:hidden" src={volumeIcon} alt="" aria-hidden="true" />
          <label
            className="relative block h-6 w-[min(20vw,150px)] min-w-[92px] max-[700px]:w-[74px] max-[700px]:min-w-0 max-[420px]:w-[62px] max-[360px]:w-[54px]"
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
              className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => onChangeVolume(Number(event.target.value))}
            />
          </label>
          <label className="relative grid min-w-[92px] max-[700px]:min-w-0 max-[700px]:w-[92px] max-[420px]:w-[84px] max-[360px]:w-[76px]">
            <span className="sr-only">Stream quality</span>
            <select
              className="h-8 w-full cursor-pointer appearance-none rounded-none border border-[#008eff] bg-[#070738] px-2 pr-5 [font-family:Arial,Helvetica,sans-serif] text-[10px] font-black uppercase text-white outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[700px]:h-10 max-[700px]:px-1.5 max-[700px]:pr-3 max-[700px]:text-[7px] max-[420px]:h-9 max-[420px]:text-[6.5px] max-[360px]:h-8 max-[360px]:px-1 max-[360px]:text-[6px]"
              value={selectedStreamId}
              onChange={(event) => onChangeStream(event.target.value)}
            >
              {streams.map((stream) => (
                <option key={stream.id} value={stream.id}>
                  {stream.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 h-0 w-0 -translate-y-1/2 border-x-[4px] border-t-[5px] border-x-transparent border-t-white max-[700px]:right-1 max-[700px]:border-x-[3px] max-[700px]:border-t-[4px]" />
          </label>
        </div>
      </div>
    </section>
  )
}

export default PlayerBar
