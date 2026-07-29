/**
 * Production Local Storage Utility
 */


export const getStorage = (key)=>{

    try{

        const value =
        localStorage.getItem(key);


        return value
        ?
        JSON.parse(value)
        :
        null;


    }
    catch(error){

        console.error(
            "Storage Read Error:",
            error
        );

        return null;

    }

};





export const setStorage = (
key,
value
)=>{

    try{

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );


    }
    catch(error){

        console.error(
            "Storage Write Error:",
            error
        );

    }


};





export const removeStorage = (key)=>{


    try{

        localStorage.removeItem(key);

    }
    catch(error){

        console.error(
            "Storage Remove Error:",
            error
        );

    }


};





export const clearStorage = ()=>{


    try{

        localStorage.clear();

    }
    catch(error){

        console.error(
            "Storage Clear Error:",
            error
        );

    }

};





/**
 * Backward compatible storage object
 */

export const storage = {


    get(key){

        return getStorage(key) || [];

    },


    set(key,value){

        setStorage(
            key,
            value
        );

    },


    remove(key){

        removeStorage(key);

    }


};