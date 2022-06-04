/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import { IsString, IsNotEmpty, IsEmail, IsDate } from 'class-validator';

/**
 *
 * DTO for user 
 * @category DTOs
 * @class UserDTO
 * @param {string} username - A username 
 */
class UserDTO {
    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string

    @IsString()
    public oaid: string

    @IsString()
    public password: string

    @IsDate()
    public sync_hour: Date | null

    /**
   * Creates an instance of UserDTO.
   * @param {string} username - the name user
   * @param {string} email - the email user
   * @memberof UserDTO
   */
    constructor(username: string, email: string, oaid: string, password: string, sync_hour: Date | null = null) {
      this.username = username;
      this.email = email;
      this.oaid = oaid;
      this.password = password;
      this.sync_hour = sync_hour;
    }
}

export default UserDTO;
