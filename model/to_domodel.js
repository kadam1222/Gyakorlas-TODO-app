const pool = require("../config/db")
const Todo = {}

Todo.getall = async () =>{
    try{
        const [rows] = await pool.query("Select * from todos");
        return rows
    }
    catch(err){
        console.log(err)
        throw err
    }
    
}

Todo.getbyid = async (id) =>{
    try{
        const [row] = await pool.query("Select * from todos where id = ?", [id])
        return row[0]
    }
    catch(err){
        console.log(err)
        throw err
    }
}

Todo.create = async (title,description,priority) =>{
    try{
        if(!description) description = null
        if(!priority) priority = "Középső"

        const [row] = await pool.query("Insert into todos(title,description,priority) values(?,?,?)", [title,description,priority]);
        return row.affectedRows > 0 ? row.insertId : null
    }
    catch(err){
        console.log(err)
        throw err
    }
}

Todo.update = async (priority, id ) =>{
    try{
        const[row] = await pool.query("Update todos set priority = ? where id = ?", [priority,id]);
        return row.affectedRows > 0
    }
    catch(err){
        console.log(err)
        throw err
    }
}

Todo.delete = async (id) =>{
    try{
        const [row] = await pool.query("Delete from todos where id = ?", [id]);
        return row.affectedRows > 0
    }
    catch(err){
        console.log(err)
        throw err
    }
}

module.exports = Todo