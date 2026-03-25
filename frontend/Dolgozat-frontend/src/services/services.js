import httpCommon from '../../http-common'

export const Lekerdezesek = {
    
    getAll : async () =>{
        const response = await httpCommon.get('/api/todos')
        return response.data;
    },
    getbyid: async (id) =>{
        const response = await httpCommon.get(`/api/todos/${id}`)
        return response.data
    },
    delete: async (id) =>{
        const response = await httpCommon.delete(`/api/todos/${id}`)
        return response.status;

    },
    create: async (ujTodo) => {

        const response = await httpCommon.post('/api/todos', ujTodo);
        return response.data; 
    },
    update: async (id, ujallapot) =>{
        const response = await httpCommon.put(`/api/todos/${id}`, ujallapot)
        return response.data
    }
}


export default function getbyid(){

}