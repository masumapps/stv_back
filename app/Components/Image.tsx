import Image from "next/image"

export const ImagePreview = ({ src }: { src: string }) => {
   return (<div>
    {src && 
        <Image
            src={src}
          
         height={0}
         width={0}
         sizes="100vw"
         style={{
           width: "auto",
           height: "40px",
           objectFit: "cover",
           objectPosition: "center",
           borderRadius: "0.5rem",
           border: "1px solid #ddd",
         }}
            alt="Team B Logo"
          />}</div>)
        }
