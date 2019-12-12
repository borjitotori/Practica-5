import { ObjectID } from "mongodb";
import { PubSub } from "graphql-yoga";

const Mutation = {
    addEquipo: async (parent, args, ctx, info) => {
        const { nombre} = args;
        const { db } = ctx;

        const collection = db.collection("equipos");
        const repeat = await collection.findOne({nombre});
        if(repeat){
            throw new Error ("Equipo ya existente")
        }
        const result = await collection.insertOne({ nombre});

        return {
            _id: result.ops[0]._id,
            nombre,
        };
    },
    addPartido: async (parent, args, ctx, info) => {
        const { equipolocal, equipovisit} = args;
        const { db } = ctx;

        const collection = db.collection("partidos");
        const eqcollection = db.collection("equipos");

        const local = await eqcollection.findOne({_id: ObjectID(equipolocal)});
        const visit = await eqcollection.findOne({_id: ObjectID(equipovisit)});

        if(!local){
            throw new Error("Equipos local no existente");
        } else if (!visit){
            throw new Error("Eqipo visitante no existente");
        }


        const result = await collection.insertOne({ 
            equipolocal: ObjectID(equipolocal),
            equipovisit: ObjectID(equipovisit),
            fecha: new Date(),
            resultado: "???",
            gamestatus: 0,
        });

        return {
            equipolocal: ObjectID(equipolocal),
            equipovisit: ObjectID(equipovisit),
            fecha: new Date(),
            resultado: "???",
            gamestatus: 0,
            _id: result.ops[0]._id,
        };
    },
    actPartido: async (parent, args, ctx, info) => {
        const { _id, resultado} = args;
        const { db, pubsub} = ctx;

        const collection = db.collection("partidos");

        const result = await collection.findOneAndUpdate({_id: ObjectID(_id)},{$set:{resultado: resultado}},{returnOriginal: false});

        pubsub.publish(
            _id,
            {
                subpartido: result.value
            }
        );
        pubsub.publish(
            result.value.equipolocal,
            {
                subequipo: result.value
            }
        );
        pubsub.publish(
            result.value.equipovisit,
            {
                subequipo: result.value
            }
        );

        return result.value;
    },
    status: async (parent, args, ctx, info) => {
        const { _id, gamestatus} = args;
        const { db, pubsub } = ctx;

        const collection = db.collection("partidos");

        const result = await collection.findOneAndUpdate({_id: ObjectID(_id)},{$set:{gamestatus: gamestatus}},{returnOriginal: false});

        pubsub.publish(
            _id,
            {
                subpartido: result.value
            }
        );
        pubsub.publish(
            result.value.equipolocal,
            {
                subequipo: result.value
            }
        );
        pubsub.publish(
            result.value.equipovisit,
            {
                subequipo: result.value
            }
        );

        return result.value;

    },
    tellyou: (parent, args, ctx, info) => {
        const{id, value} = args;
        const{pubsub} = ctx;
        pubsub.publish(
            id,
            {
                tellme: value
            }
        );
        return value;
    }
}



export {Mutation as default}