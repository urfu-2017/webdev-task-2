'use strict';

const siteController = require('./controllers/site');

/**
 * @swagger
 * definitions:
 *   NewSite:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *   Site:
 *     allOf:
 *       - $ref: '#/definitions/NewSite'
 *       - properties:
 *           id:
 *            type: integer
 *           isVisited:
 *             type: boolean
 *           createdAt:
 *             type: string
 *             format: date-time
 */

module.exports = app => {

    /**
     * @swagger
     * /api/v1.0/sites:
     *   get:
     *     tags:
     *       - sites
     *     description: Returns all sites
     *     parameters:
     *       - name: sortBy
     *         in: query
     *         description: Property sites would be sorted by
     *         schema:
     *           type: string
     *       - name: order
     *         in: query
     *         description: Order of sorting
     *         schema:
     *           type: string
     *           enum:
     *             - asc
     *             - desc
     *       - name: page
     *         in: query
     *         description: Number of page
     *         schema:
     *           type: integer
     *       - name: limit
     *         in: query
     *         description: Number of site on one page
     *         schema:
     *           type: integer
     *     produces: application/json
     *     responses:
     *       200:
     *         description: An array of sites
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Site'
     */
    app.get('/sites', siteController.get);

    /**
     * @swagger
     * /api/v1.0/sites/search:
     *   get:
     *     tags:
     *       - sites
     *     description: Returns sites with given parameters
     *     produces: application/json
     *     parameters:
     *       - name: description
     *         in: query
     *         description: Description of the site
     *         example: some description here
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: An array of sites
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Site'
     */
    app.get('/sites/search', siteController.findByDescription);

    /**
     * @swagger
     * /api/v1.0/sites:
     *   post:
     *     tags:
     *       - sites
     *     description: Creates a single site
     *     produces: application/json
     *     parameters:
     *       - name: site
     *         in: body
     *         description: Object describing Site resource
     *         required: true
     *         schema:
     *           $ref: '#/definitions/NewSite'
     *     responses:
     *       200:
     *         description: Created site
     *         schema:
     *           $ref: '#/definitions/Site'
     *       400:
     *         description: Both name and description must be provided
     */
    app.post('/sites', siteController.create);

    /**
     * @swagger
     * /api/v1.0/sites/{id}:
     *   patch:
     *     tags:
     *       - sites
     *     description: Edits site with specified id
     *     produces: application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: site id
     *         type: integer
     *         required: true
     *       - name: changes
     *         in: body
     *         description: Object describing changes
     *         schema:
     *           type: object
     *           maxProperties: 1
     *         required: true
     *     responses:
     *       200:
     *         description: Site was edited
     *       404:
     *         description: Site was not found
     */
    app.patch('/sites/:id(\\d+)', siteController.edit);

    /**
     * @swagger
     * /api/v1.0/sites/swap/{id1}/{id2}:
     *   put:
     *     tags:
     *       - sites
     *     description: Swap sites with specified ids
     *     parameters:
     *       - name: id1
     *         in: path
     *         description: site id
     *         type: integer
     *       - name: id2
     *         in: path
     *         description: site id
     *         type: integer
     *     responses:
     *       204:
     *         description: Sites were swapped
     */
    app.put('/sites/swap/:id1(\\d+)/:id2(\\d+)', siteController.swap);

    /**
     * @swagger
     * /api/v1.0/sites/{id}:
     *   delete:
     *     tags:
     *       - sites
     *     description: Deletes site with specified id
     *     parameters:
     *       - name: id
     *         in: path
     *         description: site id
     *         type: integer
     *         required: true
     *     responses:
     *       204:
     *         description: Site was deleted
     *       404:
     *         description: Site was not found
     */
    app.delete('/sites/:id(\\d+)', siteController.delete);

    /**
     * @swagger
     * /api/v1.0/sites/:
     *   delete:
     *     tags:
     *       - sites
     *     description: Deletes all sites
     *     responses:
     *       204:
     *         description: Sites were successfully deleted
     */
    app.delete('/sites', siteController.deleteAll);
};
