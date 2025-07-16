import { useEffect, useRef, useState } from "react"
import "./index.css"

import { motion } from "motion/react"
import MusicNoteIcon from "../icons/MusicNoteIcon"
import { BATHROOM_TEXT, COMPLICATED_TEXT, EXAMPLE_SONG_TEXT, HOT_DEMON_BITCHES_TEXT, IF_YOU_LOVE_HER_TEXT, PERFECT_TEXT, SLOW_DOWN_TEXT, SLUMBER_PARTY_TEXT, VROOM_TEXT } from "../../const"
import AnimatedText from "../AnimatedText"
import NextIcon from "../icons/NextIcon"
import PrevIcon from "../icons/PrevIcon"
import PlayIcon from "../icons/PlayIcon"
import StopIcon from "../icons/StopIcon"

const MusicContainer = ({ onNext } : { onNext: () => void }) =>{
    const [isPlaying, setIsPlaying] = useState(false)
    const [playerReady, setPlayerReady] = useState(false)
    const [playbackTime, setPlaybackTime] = useState(0)
    const playerRef = useRef<any>(null)
    const playerElementRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [rotationAngle, setRotationAngle] = useState(0)
    const animationFrameRef = useRef<number | null>(null)
    const lastTimestampRef = useRef<number | null>(null)

    const songs : { videoId: string, author: string, title: string, text: string }[]= [
        {
            videoId: "ml6w6KDNCzU",
            author: "Rango Ukulele",
            title: "Jesteś Kluską",
            text: EXAMPLE_SONG_TEXT,
        },
        {
            videoId: "g1TYOwPt4oE",
            author: "Montell Fish",
            title: "Bathroom",
            text: BATHROOM_TEXT,
        },
        {
            videoId: "4kbSC3HXfJw",
            author: "Chase Atlantic",
            title: "Slow Down",
            text: SLOW_DOWN_TEXT,
        },
        {
            videoId: "VWr0hSKLcXY",
            author: "Lud Berk",
            text: "Specjalnie dla ciebie <33",
            title: "This is Berk",
        },
        {
            videoId: "qfAqtFuGjWM",
            author: "Vroom Vroom",
            title: "Charli XCX",
            text: VROOM_TEXT,
        },
        {
            videoId: "5NPBIwQyPWE",
            author: "Avril Lavigne",
            title: "Complicated",
            text: COMPLICATED_TEXT,
        },
        {
            videoId: "UkYpdM3aup8",
            author: "Ashnikko",
            title: "Slumber Party",
            text: SLUMBER_PARTY_TEXT,
        },
        {
            videoId: "cNGjD0VG4R8",
            author: "Ed Sheeran",
            title: "Perfect",
            text: PERFECT_TEXT,
        },
        {
            videoId: "wDaiiluanQc",
            author: "Forest Blakk",
            title: "If You Love Her",
            text: IF_YOU_LOVE_HER_TEXT,
        },
        {
            videoId: "kdZzNsnKkpU",
            title: "HOT DEMON B!TCHES NEAR U",
            author: "CORPSE",
            text: HOT_DEMON_BITCHES_TEXT,
        },
        {
            videoId: "7XRcflf_E0c",
            title: "TAKEDOWN",
            author: "K-popowe Łowczynie Demonów",
            text: "Bez przesady ://"
        }
    ]

    const { videoId, author, text, title } = songs[currentIndex]

    useEffect(() => {
        setPlaybackTime(0);
        setIsPlaying(false);
        setPlayerReady(false);
    }, [currentIndex]);

    useEffect(() => {
        let destroyed = false;
    
        const onYouTubeIframeAPIReady = () => {
            if (playerRef.current) {
                playerRef.current.destroy()
            }
    
            playerRef.current = new (window as any).YT.Player(playerElementRef.current, {
                videoId,
                events: {
                    onReady: () => {
                        if (!destroyed) setPlayerReady(true);
                    },
                },
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                },
            });
        };
    
        if (!(window as any).YT || !(window as any).YT.Player) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
            onYouTubeIframeAPIReady();
        }
    
        return () => {
            destroyed = true;
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            setPlayerReady(false);
        };
    }, [videoId]);
    

    useEffect(() => {
        if (playerReady && playerRef.current) {
            if (isPlaying) {
                playerRef.current.seekTo(playbackTime, true);
                playerRef.current.playVideo();
            } else {
                setPlaybackTime(playerRef.current.getCurrentTime());
                playerRef.current.pauseVideo();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            const rotate = (timestamp: number) => {
                if (lastTimestampRef.current === null) {
                    lastTimestampRef.current = timestamp
                }
                const delta = timestamp - lastTimestampRef.current
                lastTimestampRef.current = timestamp
    
                setRotationAngle(prev => (prev + delta * 0.005) % 360)
    
                animationFrameRef.current = requestAnimationFrame(rotate)
            }
    
            animationFrameRef.current = requestAnimationFrame(rotate)
        } else {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
            }
            lastTimestampRef.current = null
        }
    
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isPlaying])

    const togglePlayback = () => {
        if (!playerReady || !playerRef.current) return;
        
        if (isPlaying) {
            playerRef.current.pauseVideo();
            setIsPlaying(false);
        } else {
            playerRef.current.playVideo();
            setIsPlaying(true);
        }
    };
    

    return (
        <section className="music-container">
            <motion.div
                className="music-disk-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1.5,
                    delay: 0.2,
                    type: "spring"
                }}
            >
                <div className="disk-line" />
                <div className="disk-line" />
                <div className="disk-line" />
                <motion.div
                    className="disk-line"
                    style={{ rotate: rotationAngle }}
                >
                    <div className="disk-line-text">
                        <strong><AnimatedText style="bounce">{title}</AnimatedText></strong>
                        <AnimatedText delay={0.6} style="bounce">{author}</AnimatedText>
                    </div>
                </motion.div>
            </motion.div>
            <motion.button
                onClick={onNext}
                className="letter-btn shiny-btn"
                whileHover="hover"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                variants={{
                    hover: {
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    },
                    },
                }}
                >
                Idź do Listu
                <motion.div
                    className="shine-effect"
                    variants={{
                    hover: {
                        x: ["-100%", "200%"],
                        transition: {
                        duration: 0.8,
                        ease: "easeInOut",
                        },
                    },
                    }}
                />
            </motion.button>
            <div ref={playerElementRef} className="visually-hidden" />
            <motion.section
                className="music-text-container"
                initial={{ opacity: 0.5, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: 'spring' }}
            >
                <motion.div className="line" />
                <section className="music-text-area">
                    <motion.header>
                        <MusicNoteIcon className="music-note" />
                        <motion.div className="header-content">
                            <motion.strong><AnimatedText delay={0.6} style="bounce">{title}</AnimatedText></motion.strong>
                            <motion.desc><AnimatedText delay={1.2} style="bounce">{author}</AnimatedText></motion.desc>
                        </motion.div>
                    </motion.header>
                    <motion.pre
                        className="music-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{
                            duration: 1.5,
                            delay: 1.4,
                            type: "spring"
                        }}
                    >
                            <motion.div className="line-text" />
                            {text}
                    </motion.pre>
                </section>
                <div className="panel">
                    {window.innerWidth > 1557 && <motion.img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={`Thumbnail for ${title}`}
                        className="song-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />}

                    <div className="panel-btns">
                        <PrevIcon 
                            onClick={() => setCurrentIndex(currentIndex - 1 < 0 ? songs.length-1 : currentIndex - 1)} className="panel-ico" 
                        />
                        {!isPlaying
                            ? <PlayIcon onClick={togglePlayback} className="panel-ico bigger-ico" />
                            : <StopIcon onClick={togglePlayback} className="panel-ico bigger-ico" />

                        }
                        <NextIcon onClick={() => setCurrentIndex((currentIndex+1) % songs.length)} className="panel-ico" />
                    </div>
                </div>
            </motion.section>
        </section>
    )
}

export default MusicContainer