const Subscription = {
    tellme: {
        subscribe(parent, args, ctx, info){
            const {id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(id) 
        }
    },

    subequipo: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }
    },
    
    subpartido: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }
    },

};

export {Subscription as default}