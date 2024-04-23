import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <p>Hozzáférés megtagadva.</p>
            <div className="flexGrow">
            
                <button onClick={goBack}>Menj vissza</button>
            </div>
        </section>
    )
}

export default Unauthorized
