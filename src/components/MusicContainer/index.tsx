import { useEffect, useRef, useState } from "react"
import "./index.css"

import { motion } from "motion/react"
import MusicNoteIcon from "../icons/MusicNoteIcon"
import AnimatedText from "../AnimatedText"
import NextIcon from "../icons/NextIcon"
import PrevIcon from "../icons/PrevIcon"
import PlayIcon from "../icons/PlayIcon"
import StopIcon from "../icons/StopIcon"
import { SONGS } from "../../const"

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
    const [duration, setDuration] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false);
    const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false);

    const { videoId, author, text, title } = SONGS[currentIndex]

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
                    onReady: (e: any) => {
                        if (!destroyed) {
                            setPlayerReady(true);
                            setDuration(e.target.getDuration());
                        }
                    },
                },
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    mute: 1,
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
            playerRef.current.unMute();
            playerRef.current.playVideo();
            setIsPlaying(true);
        }
    };
    
    useEffect(() => {
        let interval: any;
    
        if (isPlaying && playerRef.current && !isSeeking) {
            interval = setInterval(() => {
                setPlaybackTime(playerRef.current.getCurrentTime());
            }, 1000);
        }
    
        return () => {
            clearInterval(interval);
        };
    }, [isPlaying, isSeeking]);

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
                        <strong key={title}><AnimatedText style="bounce">{title}</AnimatedText></strong>
                        <AnimatedText delay={0.6} style="bounce" key={author}>{author}</AnimatedText>
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
                Idź do Mapy Planów
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
            <div
                ref={playerElementRef}
                style={{ width: 0, height: 0, opacity: 0, pointerEvents: "none", position: "absolute" }}
            />
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
                            <motion.strong key={title}><AnimatedText delay={0.6} style="bounce">{title}</AnimatedText></motion.strong>
                            <motion.desc key={author}><AnimatedText delay={1.2} style="bounce">{author}</AnimatedText></motion.desc>
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
                            onClick={() => setCurrentIndex(currentIndex - 1 < 0 ? SONGS.length-1 : currentIndex - 1)} className="panel-ico" 
                        />
                        {!isPlaying
                            ? <PlayIcon onClick={togglePlayback} className="panel-ico bigger-ico" />
                            : <StopIcon onClick={togglePlayback} className="panel-ico bigger-ico" />

                        }
                        <NextIcon onClick={() => setCurrentIndex((currentIndex+1) % SONGS.length)} className="panel-ico" />
                    </div>
                    <motion.input
                        type="range"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        min={0}
                        max={duration}
                        value={playbackTime}
                        onMouseDown={() => {
                            setIsSeeking(true);
                            setWasPlayingBeforeSeek(isPlaying);
                            if (isPlaying) {
                                playerRef.current?.pauseVideo();
                            }
                        }}
                        onMouseUp={(e) => {
                            const time = parseFloat(e.currentTarget.value);
                            setPlaybackTime(time);
                            playerRef.current?.seekTo(time, true);
                            setIsSeeking(false);
                            if (wasPlayingBeforeSeek) {
                                playerRef.current?.playVideo();
                            }
                        }}
                        onChange={(e) => {
                            const time = parseFloat(e.target.value);
                            setPlaybackTime(time);
                        }}
                        className="seek-slider"
                    />

                </div>
            </motion.section>
        </section>
    )
}

export default MusicContainer