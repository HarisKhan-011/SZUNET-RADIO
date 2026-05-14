import { useMemo, useState } from 'react'
import { brandAssets } from '../data/channels'
import { scheduleItems } from '../data/schedule'

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.75" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M16.25 16.25 20 20"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SongSearchBar({ value, onChange, inputId }) {
  return (
    <div
      className="relative isolate flex min-h-[52px] w-full max-w-[min(100%,640px)] items-stretch overflow-hidden rounded-sm shadow-[0_10px_28px_rgba(8,8,51,0.12)] [font-family:Arial,Helvetica,sans-serif]"
      style={{
        background: 'linear-gradient(118deg, #ffffff 0%, #ffffff 56%, #ff1111 56%, #ff1111 100%)',
      }}
    >
      <label
        className="flex shrink-0 cursor-text items-center justify-center self-center px-[10px] py-2 max-[420px]:px-2"
        htmlFor={inputId}
      >
        <span className="grid h-[clamp(36px,9vw,44px)] w-[clamp(36px,9vw,44px)] shrink-0 place-items-center border-2 border-[#7c3aed] bg-white text-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <SearchIcon className="h-[18px] w-[18px] max-[420px]:h-4 max-[420px]:w-4" />
        </span>
      </label>
      <div className="flex min-w-0 flex-1 items-center gap-2 pr-3 pl-1 max-[420px]:gap-1.5 max-[420px]:pr-2">
        <span className="shrink-0 text-[clamp(11px,2.6vw,14px)] font-[950] uppercase tracking-[0.03em] text-[#111118]">
          dalkeresés
        </span>
        <input
          className="min-w-0 flex-1 border-0 bg-transparent py-2 text-[clamp(13px,3.2vw,16px)] font-bold text-[#111118] outline-none ring-0 placeholder:font-semibold placeholder:text-[rgba(17,17,24,0.42)] focus:ring-0 max-[420px]:text-[13px]"
          id={inputId}
          type="search"
          name="song-search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Előadó vagy dal…"
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
          aria-label="Keresés előadóra vagy dalra"
        />
      </div>
    </div>
  )
}

function SongSearchPage({ onNavigateHome }) {
  const [query, setQuery] = useState('')
  const inputId = 'song-search-field'

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return scheduleItems
    return scheduleItems.filter(
      (item) =>
        item.artist.toLowerCase().includes(q) || item.title.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="min-h-[calc(100svh-var(--player-height))] bg-[#f6f6f9] text-[#11112a] [--page-width:min(1448px,calc(100vw-40px))] max-[700px]:[--page-width:calc(100vw-24px)]">
      <header className="border-b border-[rgba(8,8,51,0.08)] bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-[6px]">
        <div className="mx-auto flex w-[var(--page-width)] items-center px-[clamp(12px,1.5vw,18px)] py-[clamp(14px,2vw,22px)]">
          <button
            className="block w-[clamp(96px,10vw,132px)] shrink-0 cursor-pointer border-0 bg-transparent p-0 transition-opacity duration-200 hover:opacity-85 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#080833]"
            type="button"
            aria-label="Vissza a kezdőlapra — lejátszás folytatódik"
            onClick={onNavigateHome}
          >
            <img className="block h-auto w-full" src={brandAssets.stationLogo} alt="SZUNET RADIO" />
          </button>
        </div>
      </header>

      <div className="mx-auto w-[var(--page-width)] px-[clamp(12px,1.5vw,18px)] pb-[clamp(28px,4vw,48px)] pt-[clamp(20px,3vw,36px)]">
        <h1 className="m-0 mb-[clamp(14px,2vw,22px)] text-[clamp(22px,3.2vw,34px)] font-[950] uppercase tracking-[0.06em] text-[#080833]">
          Dal keresés
        </h1>
        <SongSearchBar value={query} onChange={setQuery} inputId={inputId} />

        <p className="mt-4 mb-3 text-[13px] font-semibold text-[rgba(8,8,51,0.55)]">
          {query.trim()
            ? `${results.length} találat a műsorban`
            : 'Összes műsor elem — szűréshez írj a mezőbe'}
        </p>

        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <li
              className="flex min-w-0 gap-3 rounded-lg border border-[rgba(8,8,51,0.08)] bg-white p-3 shadow-[0_6px_16px_rgba(8,8,51,0.06)]"
              key={item.id}
            >
              <img
                className="h-14 w-14 shrink-0 rounded object-cover"
                src={item.cover}
                alt=""
              />
              <div className="min-w-0 flex-1">
                <p className="m-0 truncate text-[11px] font-extrabold text-[rgba(8,8,51,0.55)]">
                  {item.artist}
                </p>
                <p className="m-0 truncate text-[13px] font-[950] text-[#080833]">{item.title}</p>
                <p className="m-0 mt-1 text-[11px] font-bold text-[#ff1111]">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>

        {results.length === 0 ? (
          <p className="mt-6 text-center text-[15px] font-semibold text-[rgba(8,8,51,0.5)]">
            Nincs találat erre a kifejezésre.
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default SongSearchPage
