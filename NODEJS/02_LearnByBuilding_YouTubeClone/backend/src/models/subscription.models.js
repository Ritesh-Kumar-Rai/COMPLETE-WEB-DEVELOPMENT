import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" // the user who subscribes the channel
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" // the user[channel] whom subscribed by the subscriber
    }
},{timestamps: true});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);