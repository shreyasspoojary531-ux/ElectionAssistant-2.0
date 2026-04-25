import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { FlowProvider } from './context/FlowContext.jsx'
import ScrollToTop from './components/ui/ScrollToTop.jsx'

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const IntentPage = lazy(() => import('./pages/IntentPage.jsx'))
const ChatPage = lazy(() => import('./pages/ChatPage.jsx'))
const LearnGatePage = lazy(() => import('./pages/LearnGatePage.jsx'))
const VoterIdPage = lazy(() => import('./pages/VoterIdPage.jsx'))
const ApplyPage = lazy(() => import('./pages/ApplyPage.jsx'))
const JourneyStepPage = lazy(() => import('./pages/JourneyStepPage.jsx'))
const CompletionPage = lazy(() => import('./pages/CompletionPage.jsx'))

function AppLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel max-w-md p-10 flex flex-col items-center relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div 
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20 blur-[60px] pointer-events-none"
          style={{ background: 'var(--accent-mid)' }}
        />
        
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center border"
          style={{ 
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(34,197,94,0.1))',
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 0 30px var(--accent-glow-sm)'
          }}
        >
          <div className="w-6 h-6 rounded-full border-2 border-[var(--saffron)] border-t-transparent animate-spin" />
        </motion.div>

        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          Indian Election Guide
        </p>
        <h1 className="mt-3 font-[var(--font-heading)] text-2xl font-bold text-[var(--text)] tracking-tight">
          Preparing your journey
        </h1>
        
        <div className="mt-8 flex gap-3">
          <motion.div
            animate={{ backgroundPosition: ['200% center', '-200% center'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="px-6 py-2.5 rounded-full text-sm font-medium tracking-wide"
            style={{
              background: 'linear-gradient(90deg, var(--surface-strong) 0%, rgba(249,115,22,0.15) 50%, var(--surface-strong) 100%)',
              backgroundSize: '200% auto',
              border: '1px solid var(--surface-border)',
              color: 'var(--text-soft)'
            }}
          >
            Loading modules...
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<AppLoading />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/intent" element={<IntentPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/learn" element={<LearnGatePage />} />
          <Route path="/voter-id" element={<VoterIdPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/journey/:stepId" element={<JourneyStepPage />} />
          <Route path="/done" element={<CompletionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FlowProvider>
        <AnimatedRoutes />
      </FlowProvider>
    </BrowserRouter>
  )
}
