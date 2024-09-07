
export function decode(data) {
    try{
       return reverseString(atob(reverseString(data)))
    }
    catch(err){
       return  data
    }
   }
   
   function reverseString (str) {
       return [...str].reverse().join('')
     }