const Partido = {
    equipolocal: async(parent,args,ctx,info) => {
        const local = parent.equipolocal;
        const {db} = ctx;
        const collection = db.collection("equipos");
        const result = await collection.findOne({_id: local});
        return result;
    },
    equipovisit: async(parent,args,ctx,info) => {
        const visit = parent.equipovisit;
        const {db} = ctx;
        const collection = db.collection("equipos");
        const result = await collection.findOne({_id: visit});
        return result;
    },
    gamestatus: async(parent,args,ctx,info) => {
        const status = parent.gamestatus;
        switch (status){
            case 0:
                return "Partino no empezado"
            case 1:
                return "Partido en juego"
            case 2:
                return "Partido Finalizado"
            default:
                throw new Error ("No se pudo reconocer el estado del partido")

        }
    },
}

export {Partido as default}