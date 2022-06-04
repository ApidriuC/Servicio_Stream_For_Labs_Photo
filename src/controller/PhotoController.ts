/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { IPhoto } from '../interfaces';
import { HttpException } from '../exceptions';
import { PhotoService } from '../services';
import path from 'path'
import fs from 'fs'
import { decryptFile } from '../utils/encrypt'

/**
 *
 * The Photo controller
 * @category Controllers
 * @class PhotoController
 */
class PhotoController {
  /**
   *
   * List all Photos
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of Photos
   * @memberof PhotoController
   */
  public static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const author = req.params.author
      const ownPhotos: Array<IPhoto> = await PhotoService.getPhotos(author);
      const sharedPhotos: Array<IPhoto> = await PhotoService.getSharePhotos(author);
      res.json([...ownPhotos, ...sharedPhotos]);
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

    /**
   *
   * Share Photo
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {Number} - A status request
   * @memberof PhotoController
   */
     public static async sharePhotoWithUser(req: Request, res: Response, next: NextFunction) {
      try {
        const {photoId, userToShareId} = req.body
        const { author} = req.params
        const photoShared: IPhoto | null = await  PhotoService.sharePhotoWithUser(userToShareId, photoId)
        
        if (!photoShared) throw new HttpException(404, 'Photo not found');
        if (author != photoShared?.author) throw new HttpException(403, 'Forbidden');
        
        res.sendStatus(200);
      } catch (error) {
        return next(new HttpException(error.status || 500, error.message));
      }
    }


  public static async download(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const photo: IPhoto | null = await PhotoService.getById(id);

      if (!photo) throw new HttpException(404, 'Photo not found');
    
      const location =  photo.path
      console.log("Location:", location);
     
      const fileDecryped = await decryptFile(location)
      res.json({image: fileDecryped.toString("base64"), name: photo.name});
      
    } catch (error) {
      console.log(error)
      return next(new HttpException(error.status || 500, error.message));
    }
  }



  /**
   *
   * Remove Photo synced by id 
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A photo removed
   * @memberof PhotoController
   */
   public static async removePhotoSyncedByPath(req: Request, res: Response, next: NextFunction) {
    try {
      const {author } = req.params;
      const { pathToRemove } = req.body
      console.log("Path received: ", pathToRemove);
      
        const file: IPhoto | null = await PhotoService.removeByPath(pathToRemove);
        if (!file) throw new HttpException(404, 'Photo not found');
        if( author != file.author) throw new HttpException(403, 'Forbidden: The file is not his authorship.');
        console.log(`Photo ${file.name} deleted`);
        res.sendStatus(200)
    } catch (error) {
      console.log(error);
      return next(new HttpException(error.status || 500, error.message));
    }
  }
  
    /**
   *
   * Remove Photo by id
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of PhotoS
   * @memberof PhotoController
   */
  public static async removeById(req: Request, res: Response, next: NextFunction) {
    try {
      const {author } = req.params;
      const photosToRemove = req.body.files
      console.log("Photos received: ", photosToRemove);
      
      // If have one Photo to remove
      if(photosToRemove.length === 1){
        const id = photosToRemove[0]
        const photo: IPhoto | null = await PhotoService.removeById(id);
        if (!photo) throw new HttpException(404, 'Photo not found');
        if( author != photo.author) throw new HttpException(403, 'Forbidden: The Photo is not his authorship.');
      
      
        const location =  photo.path
        fs.unlinkSync(path.resolve(location))
        console.log(`Photo ${photo.name} deleted`);
      }else { // If have multiple Photos to remove
        photosToRemove.forEach(async (PhotoId: string) => {
          const photo: IPhoto | null = await PhotoService.removeById(PhotoId);
          if (!photo) throw new HttpException(404, 'Photo not found');
          if( author != photo.author) throw new HttpException(403, 'Forbidden: The Photo is not his authorship.');
        
          const location =  photo.path
          fs.unlinkSync(path.resolve(location))
          console.log(`Photo ${photo.name} deleted`);
        });
      }
      
      res.sendStatus(200)
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }
}
export default PhotoController;
