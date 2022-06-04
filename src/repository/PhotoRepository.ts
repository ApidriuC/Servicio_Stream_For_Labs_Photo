/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { ICrud, IPhoto } from '../interfaces';
import { Photo } from '../models';
import mongoose from 'mongoose'
/**
 *
 * The Photo repository 
 * @category Repositorys
 * @class PhotoRepository
 * @implements {ICrud<IPhoto, string>}
 */
class PhotoRepository implements ICrud<IPhoto, string> {
  /**
   *
   *
   * @param {IPhoto} Photo - The Photo to create
   * @return {Promise<IPhoto>}  A Photo created
   * @memberof PhotoRepository
   */
  async create(Photo: IPhoto): Promise<IPhoto> {
    return Photo.save();
  }

  /**
   *
   *
   * @return {Promise<Array<IPhoto>>}  A list of Photos
   * @memberof PhotoRepository
   */
  async list(): Promise<Array<IPhoto>> {
    return Photo.find({});
  }

  /**
   *
   *
   * @param {string} id - The id to find
   * @return {Promise<IPhoto>}  A Photo
   * @memberof PhotoRepository
   */
  async getById(id: string): Promise<IPhoto | null> {
    return Photo.findById(id);
  }

  /**
   *
   *
   * @param {string} path - The path to find
   * @return {Promise<IPhoto>}  A Photo
   * @memberof PhotoRepository
   */
   async getByPath(path: string): Promise<IPhoto | null> {
    return Photo.findOne({ path });
  }

  /**
   *
   *
   * @param {IPhoto} Photo - The Photo to remove
   * @return {Promise<IPhoto>}  A Photo removed
   * @memberof PhotoRepository
   */
  async remove(Photo: IPhoto): Promise<IPhoto> {
    if (Photo._id) await Photo.remove();
    return Photo;
  }

  /**
   *
   *
   * @param {string} id - The id to find
   * @return {Promise<IPhoto>}  A Photo removed
   * @memberof PhotoRepository
   */
  async removeById(id: string): Promise<IPhoto | null> {
    const PhotoToDelete = await this.getById(id);
    if (PhotoToDelete) await PhotoToDelete.remove();
    return PhotoToDelete;
  }

  /**
   *
   *
   * @param {IPhoto} Photo - The Photo to updated
   * @return {Promise<IPhoto>}  A Photo updated
   * @memberof PhotoRepository
   */
  async update(Photo: IPhoto): Promise<IPhoto> {
    if (Photo._id) await Photo.update();
    return Photo;
  }

  /**
   *
   *
   * @param {string} id - The id to find
   * @param {IPhoto} Photo - The Photo to updated
   * @return {Promise<IPhoto>} A Photo updated
   * @memberof PhotoRepository
   */
  async updateById(id: string, Photo: IPhoto):
  Promise<IPhoto | null > {
    const PhotoToUpdate = await this.getById(id);
    if (PhotoToUpdate) {
      PhotoToUpdate.name = Photo.name;
      PhotoToUpdate.path = Photo.path;
      PhotoToUpdate.weight = Photo.weight;
      PhotoToUpdate.upload_at = Photo.upload_at;
      PhotoToUpdate.author = Photo.author;
      PhotoToUpdate.shared_users = Photo.shared_users;
      await PhotoToUpdate.update();
    }
    return PhotoToUpdate;
  }

   /**
   *
   *
   * @return {Promise<Array<IPhoto>>} List of shared Photos
   * @memberof PhotoRepository
   */
  async getSharedPhotos(user: string): Promise<Array<IPhoto>> {
    return Photo.find({ shared_users: new mongoose.Types.ObjectId(user) }).populate('author');
  }

  /**
   *
   *
   * @return {Promise<Array<IPhoto>>} List of shared Photos
   * @memberof PhotoRepository
   */
  async getPhotos(author: string): Promise<Array<IPhoto>> {
    return Photo.find({ author }).populate("author");
  }
  /**
   *
   *
   * @return {Promise<IPhoto>} Share Photo with a user
   * @memberof PhotoRepository
   */
   async sharePhotoWithUser(userToShare: string, _id: String): Promise<IPhoto | null> {
    return Photo.findByIdAndUpdate(_id, { $addToSet: { shared_users: new mongoose.Types.ObjectId(userToShare)} })
  }
}
export default new PhotoRepository();
