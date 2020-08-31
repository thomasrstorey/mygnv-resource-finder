import * as resourceController from '../controllers/ResourceController';
import * as userController from '../controllers/UserController';
import express from 'express';

export const path = '/api/resources';

const router: express.Router = express.Router();

// Path is /api/resources/list
// GET will return JSON of all resources
// POST will create resource if user authenticated
/* 
  Accepts query parameters in this format
  locations=true // or false
  categories=true // or false
  True will populate the array, false will leave it as an array of ObjectIDs.
*/
router.get(
  '/list',
  userController.optionalAuthentication,
  resourceController.list
);

// Path is /api/resources/create
// POST will create resource if user authenticated
router.post(
  '/create',
  userController.isAuthenticated,
  resourceController.create
);

// Path is /api/resources/:resourceId
// GET will return resource
router.get(
  '/:resourceId',
  userController.optionalAuthentication,
  resourceController.read
);

// Path is /api/resources/update/:resourceId
// POST will update resource if authenticated
router.post(
  '/update/:resourceId',
  userController.isAuthenticated,
  resourceController.isResourceUpdateAllowed,
  resourceController.update
);

// Path is /api/resources/delete/:resourceId
// DELETE will update resource if authenticated
router.delete(
  '/delete/:resourceId',
  userController.isAuthenticated,
  resourceController.remove
);

// Middleware to get resource by id from mongoDB
router.param('resourceId', resourceController.resourceById);

export default router;