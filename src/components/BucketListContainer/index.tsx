import { useEffect, useState } from "react"
import "./index.css"
import type { Plan } from "../types/Plan"
import axios from "axios"
import { API_URL } from "../../const"
import { motion } from "motion/react"

const BucketListContainer = ({ onNext } : { onNext: () => void }) =>{
    const [plans, setPlans] = useState<Plan[]>([])
    const [error, setError] = useState<string>()
    const [selectedPlan, setSelectedPlan] = useState<Plan>() 

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [status, setStatus] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        if(title.length == 0) {
            setError("Nie wpisano tytułu!")
            return
        }
        if(date.length == 0) {
            setError("Nie wybrano daty!")
            return
        }
        e.preventDefault()
        try {
            const newPlan = { title, description, date }
            const res = await axios.post(API_URL, newPlan)

            if (res.status === 201 || res.status === 200) {
                setPlans(prev => [...prev, res.data].sort((a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()))
                setTitle("")
                setDescription("")
                setDate("")
                
                await getPlans()
            }
        } catch (err) {
            console.error("Błąd przy dodawaniu planu:", err)
        }
    }

    const getPlans = async () =>{
        const res = await axios.get<Plan[]>(API_URL)

        if(res.status !== 200) {
            setError(res.statusText)
            return;
        }
        const sorted = res.data.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        setPlans(sorted)
    }
    
    useEffect(() =>{
        getPlans()
    }, [])

    useEffect(() =>{
        console.log(error)
    }, [error])

    const selectPlan = (plan: Plan) =>{
        setSelectedPlan(plan)
        setTitle(plan.title)
        setDescription(plan.description)
        setStatus(plan.status)
        setDate(plan.date)
    }

    const handleOverlayClick = async (id: string) => {
        try {
            const updatedPlan = { title, description, date, status }
            const res = await axios.put(`${API_URL}/${id}`, updatedPlan)

            if (res.status === 201 || res.status === 200) {
                setTitle("")
                setDescription("")
                setDate("")
                
                await getPlans()
            }
        } catch(err) {
            console.error("Błąd przy dodawaniu planu:", err)
        }
        setSelectedPlan(undefined)
    }

    const deletePlan = async (id: string) =>{
        try {
            const res = await axios.delete(`${API_URL}/${id}`)

            if (res.status === 204) {                
                await getPlans()
            }
        } catch(err) {
            console.error("Błąd przy dodawaniu planu:", err)
        }
        setSelectedPlan(undefined)
    }

    const transformText = (text: string) =>{
        return text.length > 30 ? text.slice(0, 27) + "..." : text
    }

    const maxDelay = 0.3 + plans.length * 0.2
    
    return (
        <>
        <section className="bucket-list-container">
            <motion.header
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
            >
                Przygody
            </motion.header>

            <motion.div
                className="plans-cotaniner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
            >
                {plans.map((plan, index) => (
                <motion.div
                    className="plan"
                    key={plan.id}
                    onClick={() => selectPlan(plan)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.2, duration: 0.4 }}
                >
                    <header>{plan.title}</header>
                    <desc className="description">{transformText(plan.description)}</desc>
                    <div className="date">{plan.date}</div>
                    <div className="status">
                    {plan.status ? "Zrobione" : "Do zrobienia"}
                    </div>
                </motion.div>
                ))}

                <motion.div
                    className="new-plan-form"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + maxDelay, duration: 0.4 }}
                >
                    <header>Nowa Przygoda</header>
                    <input type="text" placeholder="Tytuł" value={title} onChange={e => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Opis" value={description} onChange={e => setDescription(e.target.value)} required />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    <div className="form-buttons">
                        <button type="submit" onClick={handleSubmit}>Dodaj</button>
                    </div>
                </motion.div>
        </motion.div>

        <motion.button
            onClick={onNext}
            className="letter-btn shiny-btn next-btn"
            whileHover="hover"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
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
        {selectedPlan && (
                <div className="blank-container">
                    <motion.div
                        className="plan-popup"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, type: "spring" }}
                    >
                        <input defaultValue={selectedPlan.title} className="title input" />
                        <textarea onChange={e => setDescription(e.target.value)} className="description text-area" defaultValue={selectedPlan.description} />
                        <input type="date" onChange={e => setDate(e.target.value)} className="date input" defaultValue={selectedPlan.date} />
                        <input onChange={e => e.target.value.toLowerCase() == "zrobione" ? setStatus(true) : setStatus(false)} className="status input" defaultValue={selectedPlan.status ? "Zrobione" : "Do zrobienia"} />
                        <button onClick={() => handleOverlayClick(selectedPlan.id)} className="close-button">×</button>
                        <motion.button
                            onClick={() => deletePlan(selectedPlan.id)}
                            className="letter-btn shiny-btn delete-btn"
                            whileHover="hover"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
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
                            Usuń
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
                    </motion.div>
                </div>
        )}
            </section>
            {selectedPlan && <div className="blur" />}
        </>
    )
}

export default BucketListContainer