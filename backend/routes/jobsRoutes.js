import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, getAllJobsController, updateJobController,deleteJobController, jobStatsController } from '../controllers/jobsController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      required:
 *        - company
 *        - position
 *        - location
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of the job collection
 *        company:
 *          type: string
 *          description: The name of the company offering the job
 *        status:
 *          type: string
 *          description: The current status of the job
 *          enum:
 *            - Open
 *            - Closed
 *          default: Open
 *        position:
 *          type: string
 *          description: The position for the job
 *        type:
 *          type: string
 *          description: The type of the job
 *          enum:
 *            - Full-Time
 *            - Part-Time
 *            - Internship
 *            - Contract_Based
 *          default: Full-Time
 *        location:
 *          type: string
 *          description: The location of the job
 *        createdBy:
 *          type: string
 *          description: The ID of the user who created the job
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: The date and time when the job was created
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: The date and time when the job was last updated
 *      example:
 *        id: 60c72b2f9b1d8b3a8c8d0e4f
 *        company: AcmeCorp
 *        status: Open
 *        position: Software Engineer
 *        type: Full-Time
 *        location: San Francisco
 *        createdBy: 507f191e810c19729de860ea
 *        createdAt: 2023-05-19T12:34:56Z
 *        updatedAt: 2023-05-19T12:34:56Z
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */



router.post('/create-job', userAuth, createJobController)

/**
 * @swagger
 * /api/v1/job/get-job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - Open
 *             - Closed
 *             - all
 *         description: Filter jobs by status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum:
 *             - Full-Time
 *             - Part-Time
 *             - Internship
 *             - Contract_Based
 *             - all
 *         description: Filter jobs by job type
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search jobs by position (case-insensitive)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - latest
 *             - oldest
 *             - a-z
 *             - z-a
 *         description: Sort jobs by specific criteria
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of jobs per page
 *     responses:
 *       200:
 *         description: List of jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totaljobs:
 *                   type: integer
 *                   description: Total number of jobs
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 numOfPage:
 *                   type: integer
 *                   description: Number of pages
 *       400:
 *         description: Bad request, invalid parameters
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */



router.get('/get-job', userAuth, getAllJobsController)

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update an existing job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */


router.patch('/update-job/:id', userAuth, updateJobController)

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete an existing job
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */


router.delete('/delete-job/:id', userAuth, deleteJobController)

router.get('/job-stats',userAuth, jobStatsController)

export default router;