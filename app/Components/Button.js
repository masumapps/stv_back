"use client"
export default function MyButton (){
    return (
       <div> <button onClick={()=> alert('Clicked')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
        </button>
        </div>
    )
}