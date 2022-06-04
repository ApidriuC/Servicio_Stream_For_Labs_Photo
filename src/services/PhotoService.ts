/* eslint-disable class-methods-use-this */
import { ICrud, IPhoto} from '../interfaces';
import { PhotoRepository } from '../repository';
import { Photo} from '../models';

/**
 *
 * The Photo service,layer of repository pattern
 * @category Services
 * @class PhotoService
 * @implements {ICrud<IPhoto, string>}
 */
class PhotoService implements ICrud<IPhoto, string> {
  /**
   *
   * Create a Photo
   * @param {IPhoto} Photo - The Photo to create
   * @return {Promise<IPhoto>}  A Photo created
   * @memberof PhotoService
   */
  async create(Photo: IPhoto): Promise<IPhoto> {
    return PhotoRepository.create(Photo);
  }

  /**
   *
   * List all Photo
   * @return {Promise<Array<IPhoto>>}  A list of tasks
   * @memberof PhotoService
   */
  async list(): Promise<Array<IPhoto>> {
    return PhotoRepository.list();
  }

  /**
   *
   * Find by id a Photo
   * @param {string} id - The id to find
   * @return {Promise<IPhoto>}  A Photo
   * @memberof PhotoService
   */
  async getById(id: string): Promise<IPhoto| null> {
    return PhotoRepository.getById(id);
  }


   /**
   *
   * Find by path a Photo
   * @param {string} path - The path to find
   * @return {Promise<IPhoto>}  A Photo
   */
    async getByPath(path: string): Promise<IPhoto| null> {
      return PhotoRepository.getByPath(path);
    }

     /**
   *
   * Remove by path a Photo synced
   * @param {string} path - The path to find
   * @return {Promise<IPhoto>}  A Photo removed
   * @memberof PhotoService
   */
      async removeByPath(path: string): Promise<IPhoto| null> {
        const taskToDelete = await this.getByPath(path);
        if (taskToDelete) await taskToDelete.remove();
        return taskToDelete;
      }

  /**
   *
   * Remove a Photo
   * @param {IPhoto} Photo - The Photo to remove
   * @return {Promise<IPhoto>}  A Photo removed
   * @memberof PhotoService
   */
  async remove(Photo: IPhoto): Promise<IPhoto> {
    return PhotoRepository.remove(Photo);
  }

  /**
   *
   * Remove by id a Photo
   * @param {string} id - The id to find
   * @return {Promise<IPhoto>}  A Photo removed
   * @memberof PhotoService
   */
  async removeById(id: string): Promise<IPhoto| null> {
    const taskToDelete = await this.getById(id);
    if (taskToDelete) await taskToDelete.remove();
    return taskToDelete;
  }

  /**
   *
   * Update a Photo
   * @param {IPhoto} Photo - The Photo to updated
   * @return {Promise<IPhoto>}  A Photo updated
   * @memberof PhotoService
   */
  async update(Photo: IPhoto): Promise<IPhoto> {
    return PhotoRepository.update(Photo);
  }

  /**
   *
   * Update by id a Photo
   * @param {string} id - The id to find
   * @param {IPhoto} Photo - The Photo to updated
   * @return {Promise<IPhoto>} A Photo updated
   * @memberof PhotoService
   */
  async updateById(id: string, body: Object): Promise<IPhoto| null > {
    // eslint-disable-next-line no-unused-vars
    return new Promise<IPhoto| null>((resolve, _) => {
      Photo.findOneAndUpdate({ _id: id }, { ...body }, { new: true },
        (error, task: IPhoto| null) => resolve(task));
    });
  }

  async getPhotos(author: string): Promise<Array<IPhoto>> {
    return PhotoRepository.getPhotos(author);
  }
  
  async getSharePhotos(author: string): Promise<Array<IPhoto>> {
    return PhotoRepository.getSharedPhotos(author);
  }

  /**
   *
   *
   * @return {Promise<IPhoto>} Share Photo with a user
   * @memberof PhotoService
   */
   async sharePhotoWithUser(userToShare: string, _id: String): Promise<IPhoto | null> {
    return PhotoRepository.sharePhotoWithUser(userToShare, _id)
  }
}

export default new PhotoService();
