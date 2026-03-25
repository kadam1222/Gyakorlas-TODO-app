import { useState, useEffect } from "react";
import { Lekerdezesek } from "../services/services";
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function UjTodos() {
    const [adat, setAdat] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Középső");


    const getBorderColor = (p) => {
        switch (p?.toLowerCase()) {
            case 'felső': return 'danger';
            case 'alsó': return 'success';
            default: return 'warning';
        }
    };

    const getPriorityColor = (p) => {
        switch (p?.toLowerCase()) {
            case 'felső': return '#dc3545';
            case 'alsó': return '#198754';
            default: return '#ffc107';
        }
    };

    useEffect(() => {
        Lekerdezesek.getAll()
            .then(data => setAdat(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);


    const handleAddTodo = async (e) => {
        e.preventDefault(); 

        if (!title.trim()) {
            alert("A cím kitöltése kötelező!");
            return;
        }

        const ujTodoObjektum = {
            title: title,
            description: description,
            priority: priority
        };

        try {
            const mentettAdat = await Lekerdezesek.create(ujTodoObjektum);
            
            // Lista frissítése az új elemmel
            setAdat(prev => [...prev, mentettAdat]);

            // Mezők kiürítése a sikeres mentés után
            setTitle("");
            setDescription("");
            setPriority("Középső");
        } catch (err) {
            console.error("Hiba a mentésnél:", err);
            alert("Nem sikerült elmenteni a teendőt.");
        }
    };

    // TÖRLÉS FUNKCIÓ
    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törlöd?")) {
            try {
                await Lekerdezesek.delete(id);
                setAdat(prev => prev.filter(t => t.id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">Teendők kezelése</h1>

            {/* 3. HOZZÁADÁS SZEKCIÓ (Űrlap) */}
            <Card className="mb-5 p-3 shadow-sm">
                <Card.Title>Új teendő felvétele</Card.Title>
                <Form onSubmit={handleAddTodo}>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-2">
                                <Form.Label>Cím</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    placeholder="Mi a feladat?"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={5}>
                            <Form.Group className="mb-2">
                                <Form.Label>Leírás</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    placeholder="Részletek (opcionális)"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-2">
                                <Form.Label>Prioritás</Form.Label>
                                <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="Alsó">Alsó</option>
                                    <option value="Középső">Középső</option>
                                    <option value="Felső">Felső</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="success" type="submit" className="mt-2 w-100">
                        Teendő hozzáadása
                    </Button>
                </Form>
            </Card>

            <hr />

            {/* LISTA SZEKCIÓ */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, marginTop: "20px" }}>
                {loading && <p>Adatok betöltése...</p>}
                {!loading && adat.length === 0 && <p>Nincs megjeleníthető teendő.</p>}
                
                {adat && adat.map((a) => (
                    <Card key={a.id} style={{ width: '18rem' }} border={getBorderColor(a.priority)}>
                        <Card.Body>
                            <Card.Title>{a.title}</Card.Title>
                            <Card.Text>
                                {a.description ? <div>{a.description}</div> : <i>Nincs leírás!</i>}
                                <div style={{
                                    marginTop: "10px",
                                    backgroundColor: getPriorityColor(a.priority),
                                    color: "white",
                                    textAlign: "center",
                                    borderRadius: "15px",
                                    padding: "2px 10px",
                                    display: "inline-block",
                                    fontSize: "0.85rem"
                                }}>
                                    {a.priority}
                                </div>
                            </Card.Text>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(a.id)}>
                                Törlés
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}