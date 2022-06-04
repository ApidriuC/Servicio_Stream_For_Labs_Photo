import {
    NextFunction, Request, Response, Router,
  } from 'express';
  import { IRoute } from '../interfaces';
  import { PhotoController } from '../controller';
  import { isDefinedParamMiddleware, validationMiddleware } from '../middlewares';
  import getAuthUserMiddleware from '../middlewares/getAuthUser'
  
  /**
   *
   * Managament the routes of Photo
   * @category Routes
   * @class PhotoRouter
   * @implements {IRoute}
   */
  class PhotoRouter implements IRoute {
    public router = Router();
  
    public pathIdParam = '/:id';
    public pathAuthorParam = '/:author'
  
    constructor() {
      this.createRoutes();
    }
  
    createRoutes(): void {
  
      // list Photos
      this.router.get(this.pathAuthorParam, 
      (req, res, next) => getAuthUserMiddleware(req, next),
      (req: Request, res: Response, next: NextFunction) => PhotoController
        .list(req, res, next));
  
   
      // Share Photo
      this.router.post(`/share${this.pathAuthorParam}`,
      isDefinedParamMiddleware('params', 'author'),
      (req: Request, res: Response, next: NextFunction) => PhotoController
        .sharePhotoWithUser(req, res, next),
    );

      
      this.router.get(
        `/download${this.pathIdParam}`,
        isDefinedParamMiddleware(),
        (req: Request, res: Response, next: NextFunction) => PhotoController
          .download(req, res, next),
      );


      // Remove Photo
      this.router.delete(
        `${this.pathAuthorParam}`,
        isDefinedParamMiddleware('params', 'author'),
        (req: Request, res: Response, next: NextFunction) => PhotoController
          .removeById(req, res, next),
      );

      // Remove Photo synced
      this.router.delete(
        `/sync${this.pathAuthorParam}`,
        isDefinedParamMiddleware('params', 'author'),
        (req: Request, res: Response, next: NextFunction) => PhotoController
          .removePhotoSyncedByPath(req, res, next),
      );
    }
  }
  export default new PhotoRouter().router;
  