import { useState } from "react"
import "./index.css"

import { motion } from "motion/react"
import AnimatedText from "../AnimatedText"

const LetterContainer = () =>{
    const [open, setOpen] = useState(false)
    
    return (
        <motion.section className="letter-container">
            <motion.header><AnimatedText>Specjalny List</AnimatedText></motion.header>
            <motion.div
                className="envelope"
                onClick={() => setOpen(true)}
                whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                
            >
                <motion.div
                    className="envelope-entrance"
                    animate={open ? { rotateX: -130, y: -160 } : { rotateX: 0 }}
                    transition={{ type: "spring", delay: !open ? 0.2 : 0, stiffness: 300, damping: 30 }}
                />
            </motion.div>
            {open && <motion.div
                className="letter-text"
                initial={{ opacity: 0, y: 20, zIndex: -1, }}
                animate={open ? { opacity: 1, y: 0, zIndex: 0 } : { opacity: 0, y: 20, zIndex: -1 }}
                transition={{ duration: 0.5, delay: open ? 0.2 : 0, ease: "easeOut" }}
                onClick={() => setOpen(false)}
            >
                <strong><AnimatedText>Droga Iwonko,</AnimatedText></strong>
                <div className="content">
                    <AnimatedText style="fade">W dniu twoich urodzin, życzę ci z całego serca, abyśmy zawsze byli razem, żebyś nie martwiła się </AnimatedText>
                    <AnimatedText delay={3} style="fade">aż tak wieloma sprawami oraz abyś pamiętała o tym że zawsze będę twoim oparciem.</AnimatedText>
                    <AnimatedText delay={5.5} style="fade">Jesteś najcudowniejszym, co mnie w życiu spotkało i nie mógłbym wymarzyć lepszej partnerki. </AnimatedText>
                    <AnimatedText delay={8.5} style="fade">Już nie mogę się doczekać, jaka przyszłość nas razem czeka.</AnimatedText>
                    <br />
                    <div className="signature-container">
                        <AnimatedText delay={10} style="fade">Twój na zawsze,</AnimatedText>
                        <strong><AnimatedText delay={11}>Mateusz</AnimatedText></strong>
                    </div>
                </div>
            </motion.div>}
        </motion.section>
    )
}

export default LetterContainer