import "./App.css"
import StarterContainer from "./components/StarterContainer"
import PhotosContainer from "./components/PhotosContainer"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import MusicContainer from "./components/MusicContainer"
import LetterContainer from "./components/LetterContainer"
import BucketListContainer from "./components/BucketListContainer"

export default function App() {
  const [currentPage, setCurrentPage] = useState<"starter" | "photos" | "music" | "letter" | "bucketList">("starter")
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

  const goToBucketList = () =>{
    setCurrentPage("bucketList")
    setBackgroundStyle("stripes")
  }

  const getCurrentPage = (page: string) =>{
    switch(page) {
      case "starter":
        return <StarterContainer key="starter" onNext={goToPhotos} />
      case "photos":
        return <PhotosContainer key="photos" onNext={goToMusic} />
      case "music":
        return <MusicContainer key="music" onNext={goToBucketList} />
      case "bucketList":
        return <BucketListContainer key="bucketList" onNext={goToLetter}/>
      case "letter":
        return <LetterContainer key="letter"/>
      default:
        return <StarterContainer key="starter" onNext={goToPhotos} />
    }
  }

  return (
    <div className={`app ${backgroundStyle}`}>
      <title>Urodziny Iwonki</title>
      <AnimatePresence mode="wait">
        {getCurrentPage(currentPage)}
      </AnimatePresence>
    </div>
  )
}
