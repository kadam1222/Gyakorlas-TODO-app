import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export default function Rolunk(){
    const navigate = useNavigate()

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:550, marginRight:"auto", marginLeft:"auto"}}>
            <img src="./cimer.jpg" style={{width:170, height:200,marginBottom:15}}></img>

            <h1>Rólunk</h1>

            <p>
                Kedves Látogató, kedves Érdeklődő!
                Teleki Blanka a 19. században mert nagyot álmodni. Neki köszönhetően az Alföld szívében, Mezőtúron 1897. szeptemberében megnyitotta kapuit egy iskola, amely kifejezetten a nőnevelés úttörőjének számított abban a korban. Ahogy teltek az évek, évtizedek, generációk sokasága nevelődött a régi épület falai között. Folyton megújuló iskolánk ma is szeretettel és odafigyeléssel várja volt, mostani és leendő diákjait.

                Képzéseink között található gimnázium, többféle tagozattal, szakgimnáziumi és technikusi osztályok is. A régi épület egyszerre kívánja ötvözni a hagyományokat, klasszikus értékeket és a megújulást, modernizációt is. 

                A Teleki egyik erőssége mindig is a színesség, sokoldalúság volt. Hogy mit jelent ez a valóságban? El kell jönni, meg kell nézni, részt kell venni. Várunk!
            </p>
            <Button variant="primary" onClick={() => navigate(-1)}>Vissza</Button>
        </div>
    )

}