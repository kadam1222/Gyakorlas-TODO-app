import { useState,useEffect } from "react";
import { Lekerdezesek } from "../services/services";

import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';



export default function Todos(){
    const [adat,setAdat] = useState([]);
    const [loading,setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Középső");

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt a teendőt?")) {
            try {
                await Lekerdezesek.delete(id);
                setAdat(prevAdat => prevAdat.filter(todo => todo.id !== id));
            } catch (err) {
                console.error("Hiba a törlés során:", err);
                alert("Nem sikerült a törlés!");
            }
        }
    };
    
    
    const getBorderColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'felső': return 'danger';  
            case 'középső': return 'warning'; 
            case 'alsó': return 'success';  
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'felső': return '#dc3545';  
            case 'középső': return '#ffc107';
            case 'alsó': return '#198754'; 

        }
    };

    useEffect(() =>{
        Lekerdezesek.getAll().then(data =>setAdat(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, [])

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("A cím kötelező!");

        try {
            const mentettAdat = await Lekerdezesek.create({ title, description, priority });
            setAdat(prev => [...prev, mentettAdat]);
            
            setTitle("");
            setDescription("");
            setPriority("Középső");
            setShowForm(false); 
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <Container>
            <div style={{display:"flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", marginTop: "20px"}}>
                <h1>Teendők</h1>
                <Button variant={showForm ? "secondary" : "primary"} onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Mégse" : "+ Új teendő"}
                </Button>
            </div>


            {showForm && (
                <Card style={{padding: "20px", marginBottom: "30px", backgroundColor: "#f8f9fa", border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "8px"}}>
                    <Card.Title style={{marginBottom:"15px"}}>Új feladat rögzítése</Card.Title>
                    <Form onSubmit={handleAddTodo}>
                        <Row style={{alignItems: "flex-end"}}>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label style={{fontWeight:"bold"}}>Cím</Form.Label>
                                    <Form.Control type="text" value={title}onChange={(e) => setTitle(e.target.value)}placeholder="Mi a feladat?" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label style={{fontWeight:"bold"}}>Leírás</Form.Label>
                                    <Form.Control type="text" value={description}onChange={(e) => setDescription(e.target.value)}placeholder="Részletek" />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label style={{fontWeight:"bold"}}>Prioritás</Form.Label>
                                    <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                        <option value="Alsó">Alsó</option>
                                        <option value="Középső">Középső</option>
                                        <option value="Felső">Felső</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Button variant="success" type="submit" style={{width:"100%"}}> Mentés </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            )}

            <hr />

        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around", alignItems:"center", gap:20}}>
            
            {loading ? <p>Betöltés...</p> : ""}
            {adat && adat.map((a, index) =>{
                const priorityColor = getPriorityColor(a.priority);
                return(
                    <Card key={index} style={{ width: '18rem' }} border={getBorderColor(a.priority)}>
                <Card.Body>
                    <Card.Title>{a.title}</Card.Title>
                    <Card.Text>
                        {a.Description ? <span>{a.Description}</span> : <span>Nincs leírás!</span>}
                    <div style={{border: `2px solid ${priorityColor}`, width: "70px", color:"white", backgroundColor:`${priorityColor}`, textAlign:"center", borderRadius:"15px"}}>
                        {a.priority}
                    </div>
                    </Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(a.id)}>Törlés</Button>
                </Card.Body>
                </Card>
            )
                
    })}
        </div>
        </Container>
    )
}