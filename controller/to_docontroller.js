const todomodel = require("../model/to_domodel")


const todocontroller = {
    async getall(req,res){
        try{
            const data = await todomodel.getall();
            res.json(data)
        }
        catch(err){
            res.status(500).json({error: "Belső szerverhiba"})
        }
    },

    async getbyid(req,res){
        try{
            const id = req.params.id
            const data = await todomodel.getbyid(id)
            if(!data){
                res.status(404).json({error: "A teendő nem található"})
            }
            else{
                res.json(data)
            }
        }
        catch(err){
            res.status(500).json({error: "Belső szerverhiba"})
        }
    },

    async create(req,res){
        try{
            const {title, description, priority} = req.body;

            if(!title){
                res.status(400).json({error: "Hiányos adatok (title megadása kötelező)"})
            }
            else{
                const data = await todomodel.create(title,description,priority)
                if(data){
                    const newdata = await todomodel.getbyid(data)
                    res.status(201).json(newdata)

                }
            }
        }
        catch(err){
            res.status(500).json({error: "Belső szerverhiba"})
        }
    },

    async update(req,res){
        try{
            const priority = req.body.priority
            const id = req.params.id
            if(!id){
                res.status(400).json({error: "Nincs ilyen teendő"})
            }
            else{
                const letezocheck = await todomodel.getbyid(id)
                if(!letezocheck){
                    res.status(400).json({error: "Nincs ilyen teendő"})
                }
                else{
                    const data = await todomodel.update(priority,id)
                    const ujdata = await todomodel.getbyid(id) 
                    res.json(ujdata)
                }
                
            }
        }
        catch(err){
            res.status(500).json({error: "Belső szerverhiba"})
        }
    },
    
    async delete(req,res){
        try{
            const id = req.params.id
            if(!id){
                return res.status(400).json({error: "Nincs ilyen teendő"})
            }
            else{
                const data = await todomodel.delete(id)
                if(data)  return res.status(200).json({message: "Sikeres törlés"})
                else {
                    return res.status(404).json({ error: "A teendő nem található" });
                }
            }
        }
        catch(err){
            res.status(500).json({error: "Belső szerverhiba"})
        }
    }
}


module.exports = todocontroller