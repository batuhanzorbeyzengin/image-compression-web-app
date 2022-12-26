import Image from 'next/image';

export default function ResponseImage({imgLink, width, height}) {
    return(
        <Image src={imgLink} alt={"deneme"} width={width} height={height} layout="responsive"/>
    )
}