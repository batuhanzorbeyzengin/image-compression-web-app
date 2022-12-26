import { useState } from 'react'; 
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [image, setImage] = useState(null)
  const [imageSize, setImageSize] = useState(null)
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState('png')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)

    const dataByts = (image.size / (1024*1024)).toFixed(2);
    console.log(dataByts + " MB");

    const formData = new FormData();
    formData.append('image', image);
    formData.append('quality', quality);
    formData.append('format', format);

    axios.post('http://localhost:3001/api/v1/upload', 
    formData, 
    { headers: 
      { 'content-type': 'multipart/form-data' } 
    })
    .then(response => setPreviewUrl(response))
    .catch(error => setError(error))
    .finally(() => {
      setLoading(false)
    });
  }

  const handleFileChange = (event) => {
    setImage(event.target.files[0])
    const dataByts = (event.target.files[0].size / (1024*1024)).toFixed(2);
    setImageSize(dataByts)
  }

  return (
    <>
      <Head>
        <title>Photo Optimization</title>
        <meta name="description" content="Snapshot optimizing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='bg-card'>
              <div className='card'>
                <form onSubmit={handleSubmit}>
                  {previewUrl ?
                  <>
                    <div className='minify-img'>
                      <Image src={previewUrl.data} alt={"deneme"} width={300} height={300} layout="responsive"/> 
                        <a href={previewUrl.data} download>
                          Download
                        </a>
                    </div>
                  </>
                  : ""}
                  <div className='upload-file'>
                    <input type={"file"} accept="image/*" id="upload-file" hidden onChange={handleFileChange} />
                    <label className="btn-upload" htmlFor="upload-file"><span>Upload</span></label>
                    <p>
                      {image ?
                        <>
                          <b><u>image name: {image.name}</u></b>&nbsp;&nbsp;
                          
                          {imageSize > 10 ? "Bu fotoğrafı yükleyemezsin" : imageSize + " MB"}
                          <br></br>
                        </>
                       : ""}
                      You can upload images of maximum 10 MB.
                    </p>
                  </div>
                  <div className='input-range'>
                    <input type="number" min={0} max={100} values={quality} onChange={(event) => setQuality(event.target.value)} />
                    <span><b><u>{quality}%</u></b> How much do you want to reduce the image from there?</span>
                  </div>
                  <div className='input-select'>
                    <label htmlFor="imgFormat">In what format do you want the optimized image output?:</label>
                    <select id="imgFormat" onChange={(event) => setFormat(event.target.value)}>
                      <option value="png">png</option>
                      <option value="jpg">jpg</option>
                      <option value="jpg">jpeg</option>
                      <option value="webp">webp</option>
                    </select>
                  </div>
                  <button className={loading ? "form-submit loading" : "form-submit"} type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
