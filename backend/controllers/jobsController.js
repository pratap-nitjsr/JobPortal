import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";

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

    const { status, type, search, sort } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }

    if (type && type !== 'all') { 
        queryObject.type = type;
    }
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }


    let queryResult = jobsModel.find(queryObject);

    if (sort === 'latest') {
        queryResult = queryResult.sort('-CreatedAt');
    }
    if (sort === 'oldest') {
        queryResult = queryResult.sort('CreatedAt');
    }
    if (sort === 'a-z') {
        queryResult = queryResult.sort('position');
    }
    if (sort === 'z-a') {
        queryResult = queryResult.sort('-position');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit)
    console.log(queryResult)

    const totaljobs = await jobsModel.countDocuments(queryResult);
    const numOfPage = Math.ceil(totaljobs / limit);

    const jobs = await queryResult;

    // const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totaljobs,
        jobs,
        numOfPage
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

export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: '$status',
                count: {$sum : 1}
            }
        }
    ]);

    console.log(stats.Open)

    const defaultStats = {
        open: stats.Open || 0,
        closed: stats.Closed || 0
    }

    res.status(200).json({
        stats
    });
}

