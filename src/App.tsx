import "./App.css"
import StarterContainer from "./components/StarterContainer"
import PhotosContainer from "./components/PhotosContainer"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import MusicContainer from "./components/MusicContainer"
import LetterContainer from "./components/LetterContainer"

export default function App() {
  const [currentPage, setCurrentPage] = useState<"starter" | "photos" | "music" | "letter">("starter")
  const [backgroundStyle, setBackgroundStyle] = useState<"stripes" | "blank" | "circles">("stripes")

  const goToPhotos = () =>{
    setCurrentPage("photos")
    setBackgroundStyle("blank")
  }

  const goToMusic = () =>{
    setCurrentPage("music")
  }

  const goToLetter = () =>{
    setCurrentPage("letter")
    setBackgroundStyle("circles")
  }

  return (
    <div className={`app ${backgroundStyle}`}>
      <title>Urodziny Iwonki</title>
      <AnimatePresence mode="wait">
        {currentPage === "starter" && (
          <StarterContainer key="starter" onNext={goToPhotos} />
        )}
        {currentPage === "photos" && (
          <>
            <PhotosContainer key="photos" onNext={goToMusic} />
          </>
        )}
        {currentPage == "music" && (
          <>
            <MusicContainer key="music" onNext={goToLetter} />
          </>
        )}
        {currentPage == "letter" && (
          <>
            <LetterContainer key="letter"/>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
