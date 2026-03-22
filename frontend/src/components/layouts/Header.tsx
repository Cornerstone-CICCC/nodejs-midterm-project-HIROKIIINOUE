type Props = {
  username: string
}

export const Header = (props: Props) => {
  const { username } = props;

  return (
    <header className="border-b border-slate-200 px-4 py-4 backdrop-blur sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="order-1 text-center md:col-start-2 md:row-start-1 md:order-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Shopping List
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Keep your items organized.
          </p>
        </div>

        <div className="order-2 flex items-center justify-between gap-3 md:col-start-1 md:row-start-1 md:order-1 md:min-w-0 md:justify-self-start">
          <div className="min-w-0 md:max-w-xs">
            <p className="text-xs font-semibold text-teal-700">
              User
            </p>
            <div className="truncate text-sm font-semibold text-slate-700 sm:text-base">
              {username}
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200 md:hidden"
          >
            Logout
          </button>
        </div>

        <div className="hidden md:col-start-3 md:row-start-1 md:flex md:justify-self-end">
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
