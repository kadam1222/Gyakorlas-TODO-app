import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';


export default function Fooldal(){
    const navigate = useNavigate()
    
    return(
        <div style={{display:"flex", flexDirection:"column", width: 200, margin:"auto", alignItems:"center"}}>
            <img src="./cimer.jpg" style={{width:170, height:200,marginBottom:15}}></img>

            <h1>Üdvözöljük!</h1>
            
            <div style={{display:"flex", justifyContent: "space-evenly"}}>
                <Button variant="primary" onClick={() => navigate("/todos")} style={{marginRight:10}}>Teendők!</Button>
                <Button variant="secondary" onClick={() =>navigate("/about")}>Rólunk!</Button>
            </div>
            
            
        </div>
    )
}