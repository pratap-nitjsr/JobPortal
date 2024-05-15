import mongoose, { model } from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company is required"]
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    },
    position: {
        type: String,
        required: [true, "Position is required"]
    },
    type: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract_Based'],
        default: 'Full-Time'
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'    }
},
    {timestamps: true}

);

export default mongoose.model('Job', jobSchema);