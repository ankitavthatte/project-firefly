import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { StudioProvider, useStudio } from './context/StudioContext.jsx'
import StudioScene from './components/studio/StudioScene.jsx'
import MobileStudio from './components/studio/MobileStudio.jsx'
import RecruiterView from './components/RecruiterView.jsx'
import ControlDock from './components/ControlDock.jsx'
import NavDock from './components/NavDock.jsx'
import GuidedTour from './components/GuidedTour.jsx'
import ProjectsModal from './components/modals/ProjectsModal.jsx'
import SpeedRunModal from './components/modals/SpeedRunModal.jsx'
import {
  NotebookModal,
  TrophyModal,
  AboutModal,
  PassportModal,
  BookshelfModal,
  DrawerModal,
  ContactModal,
  NowModal,
} from './components/modals/ContentModals.jsx'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}

const MODALS = {
  laptop: ProjectsModal,
  notebook: NotebookModal,
  trophy: TrophyModal,
  mug: AboutModal,
  passport: PassportModal,
  bookshelf: BookshelfModal,
  drawer: DrawerModal,
  calendar: NowModal,
  contact: ContactModal,
  speedrun: SpeedRunModal,
}

function Studio() {
  const { activeModal, closeModal, recruiterMode } = useStudio()
  const isDesktop = useIsDesktop()
  const Modal = activeModal ? MODALS[activeModal] : null

  return (
    <div className="grain relative min-h-dvh">
      <ControlDock />
      <NavDock />
      {recruiterMode ? (
        <RecruiterView />
      ) : isDesktop ? (
        <div className="h-dvh">
          <StudioScene />
        </div>
      ) : (
        <MobileStudio />
      )}
      {!recruiterMode && <GuidedTour />}
      <AnimatePresence>{Modal && <Modal key={activeModal} onClose={closeModal} />}</AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <StudioProvider>
      <Studio />
    </StudioProvider>
  )
}
