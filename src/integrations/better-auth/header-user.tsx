import { authClient } from '#/lib/auth-client'
import { Link } from '@tanstack/react-router'

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="h-8 w-8 rounded-full bg-neutral-200 animate-pulse" />
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover border border-neutral-200" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-neutral-600">
              {session.user.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            void authClient.signOut()
          }}
          className="h-8 px-3.5 text-xs font-semibold tracking-wider uppercase bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50 active:scale-95 transition-all duration-300 rounded-full cursor-pointer"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <Link
      to="/login"
      className="h-8 px-3.5 flex items-center text-xs font-semibold tracking-wider uppercase text-neutral-800 bg-white border border-neutral-200 hover:bg-neutral-50 active:scale-95 transition-all duration-300 rounded-full shadow-xs cursor-pointer"
    >
      Sign in
    </Link>
  )
}
