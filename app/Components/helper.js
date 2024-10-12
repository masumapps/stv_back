export function decode(data) {
    try{
       return atob(reverseString(atob(data)))
    }
    catch(err){
       return  data
    }
   }
   
   function reverseString (str) {
       return [...str].reverse().join('')
     }