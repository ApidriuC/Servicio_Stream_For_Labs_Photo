/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

/**
 *
 * DTO for Photo 
 * @category DTOs
 * @class PhotoDTO
 * @param {string} name - Name of Photo 
 * @param {string} path - path of Photo
 * @param {number} weight - weight of Photo
 * @param {Date} upload_at - upload_at of Photo 
 * @param {string} author - author of Photo 
 * @param {Array<String>} shared_users - shared_users of Photo 
 */
class PhotoDTO {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public path: string;
    
    @IsNotEmpty()
    @IsNumber()
    public weight: number;

    @IsNotEmpty()
    @IsDate()
    public upload_at: Date;

    @IsNotEmpty()
    @IsString()
    public author: string;


    public shared_users: Array<String>;
    /**
   * Creates an instance of Photo.
   * @param {string} Photoname - the name Photo
   * @param {string} email - the email Photo
   * @param {string} password - the password Photo
   * @memberof Photo
   */
    constructor(name: string, path: string, weight: number, upload_at: Date, author: string, shared_users: Array<String>) {
        this.name = name;
        this.path = path;
        this.weight = weight;
        this.upload_at = upload_at;
        this.author = author;
        this.shared_users = shared_users;
    }
}

export default PhotoDTO;
