import jobsModel from "../models/jobsModel.js";

export const createJobController = async (req, res, next) => { 
    try {
        const { company, position, location } = req.body;
        if (!company || !position || !location) {
            next('Please provide all required fields')
        }
        req.body.createdBy = req.user.userId;
        const job = await jobsModel.create(req.body);

        res.status(201).send({
            message: 'Job Created successfully',
            success: true,
            job: job
        })
    } catch (err) {
        console.log(err)
    }
}

export const getAllJobsController = async (req, res, next) => { 
    const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totaljobs: jobs.length,
        jobs
    });
}

export const updateJobController = async (req, res, next) => { 
    const { id } = req.params;
    const { company, position, location } = req.body;
    // console.log(req)
    if (!company ||!position ||!location) {
        next('Please provide all required fields');
    }
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
        next('Job not found');
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('You are not authorized to update this job');
        return;
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        message: 'Job updated successfully',
        success: true,
        job: updateJob
    })
}

export const deleteJobController = async (req, res, next) => { 
    const { id } = req.params;
    const job = await jobsModel.findOne({ _id: id });
    if (!job) {
        next('Job not found');
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('You are not authorized to delete this job');
        return;
    }
    await jobsModel.findOneAndDelete({ _id: id });
    res.status(200).json({
        message: 'Job deleted successfully',
        success: true
    })
}

