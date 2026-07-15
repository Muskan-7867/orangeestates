import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/_user/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  // Loading & error/success states
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const { data: session, isPending: isSessionPending } = authClient.useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    if (!email || !password || (isSignUp && !name)) {
      setErrorMsg('Please fill in all required fields.')
      setIsLoading(false)
      return
    }

    try {
      if (isSignUp) {
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name,
        })
        if (error) {
          setErrorMsg(error.message || 'Failed to sign up. Please try again.')
        } else {
          setSuccessMsg('Account created successfully! Logging you in...')
          setTimeout(() => {
            navigate({ to: '/' })
          }, 1500)
        }
      } else {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        })
        if (error) {
          setErrorMsg(error.message || 'Invalid email or password.')
        } else {
          setSuccessMsg('Signed in successfully!')
          setTimeout(() => {
            navigate({ to: '/' })
          }, 1000)
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSessionPending) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-bg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-bg px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="w-full max-w-md bg-white border border-white/40  p-8 sm:p-12 text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            {session.user.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name} 
                className="h-24 w-24 rounded-full object-cover border-2 border-primary/20"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-inner">
                <span className="text-3xl font-serif font-semibold text-primary">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-serif font-semibold text-neutral-900">{session.user.name}</h2>
              <p className="text-sm text-neutral-500">{session.user.email}</p>
            </div>
      
          </div>

          <div className="border-t border-neutral-100 pt-6 flex flex-col gap-3">
            <button
              onClick={() => navigate({ to: '/' })}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold  transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              Return Home
            </button>
            <button
              onClick={() => authClient.signOut()}
              className="w-full py-3 px-4 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold border border-neutral-200  transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-bg px-4 sm:px-6 lg:px-8">
      {/* ── Outer Card Wrapper ── */}
      <div className="w-full max-w-5xl bg-white border border-white/40   overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-all duration-300">
        
        {/* ── Left Column: Premium Real Estate Banner (Desktop Only) ── */}
        <div className="hidden md:flex md:w-1/2 relative bg-neutral-900 flex-col justify-between p-12 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
              alt="Luxury modern villa" 
              className="w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-7000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-black/10" />
          </div>
          
          <div className="relative z-10 flex items-center justify-center gap-2">
            {/* <div className="h-3 w-3 rounded-full bg-primary animate-pulse" /> */}
            {/* <span className="text-xs uppercase tracking-widest font-semibold text-primary-light">Orange Estates</span> */}
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-serif font-medium leading-tight text-center">
              Discover your perfect sanctuary.
            </h2>
            <p className="text-sm text-neutral-300 font-light max-w-md leading-relaxed text-center">
              Unlock access to premium residential properties, personalized consulting, and exclusive luxury listings customized to your standard.
            </p>
          </div>

          <div >
           
          </div>
        </div>

        {/* ── Right Column: Form Panel ── */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto space-y-8">
            
            {/* Header / Tabs */}
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900 tracking-tight text-center">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-neutral-500">
                {isSignUp ? ' ' : " "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setErrorMsg('')
                    setSuccessMsg('')
                  }}
                  className="font-semibold text-primary hover:text-primary-dark transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  {isSignUp ? 'Sign In' : ''}
                </button>
              </p>
            </div>

            {/* Notifications */}
            {errorMsg && (
              <div className="flex items-center gap-3 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-2xl animate-headShake">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}

            {successMsg && (
              <div className="flex items-center gap-3 p-4 text-sm text-green-800 bg-green-50 border border-green-200 rounded-2xl animate-pulse">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                <p className="font-medium">{successMsg}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <User className="h-4.5 w-4.5" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200  text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200  text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold   transition-all duration-300 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
