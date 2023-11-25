"use strict";

class UserException{
    constructor(errorMessage){
        return this._errorMessage = errorMessage;
    }
}


class User{
    constructor(username,email,password,profileImage) {
        this._username = username;
        this._email = email;
        this._password = password
        this._profileImage = profileImage;
    }

    /**Username**/
    get username(){
        return this._username;
    }
    set username(value){
        if(typeof(value) !== 'string'){
            throw new UserException("Input is not correctly")
        }
        this._username = value;
    }

    /**Email**/
    get email(){
        return this._email;
    }
    set email(value) {
        // Expresión regular para validar correos electrónicos
        const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Validar el formato del correo electrónico
        if (typeof value !== 'string' || !expresionRegularCorreo.test(value)) {
            throw new UserException("Email format is not correctly");
        }
        this._email = value;
    }

    /**Password**/
    get password(){
        return this._password;
    }
    set password(value){
        if(typeof(value) !== 'string'){
            throw new UserException("Input is not correctly");
        }
        this._password = value;
    }

    /**Profile Image**/
    get profileImage(){
        return this._profileImage;
    }
    set profileImage(value){
        if(typeof(value) !== 'string'){
            throw new UserException("Input is not correctly");
        }
        this._profileImage = value;
    }
}