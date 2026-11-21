import MatchDetails from './components/match-details'

export default function App() {
  return (
    <main className="">
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[0.25em] text-[#b6ff32]">
          THE MATCHDAY EXPERIENCE
        </p>

        <h1 className="mt-2 text-3xl font-black italic uppercase tracking-tight sm:text-5xl">
          Every moment.
          <span className="text-[#b6ff32]"> Every reaction.</span>
        </h1>
      </div>

      <MatchDetails />
    </main>
  )
}