const Query = {
    getPartidos: async (parent, args, ctx, info) => {
      const { db } = ctx;

      const collection = db.collection("partidos");
      const result = await collection.find({}).toArray();
      return result;
    },
    getEquipos: async (parent, args, ctx, info) => {
        const { db } = ctx;
  
        const collection = db.collection("equipos");
        const result = await collection.find({}).toArray();
        return result;
    },
}

export {Query as default}