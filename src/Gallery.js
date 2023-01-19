import React, { useState } from 'react';
import './gallery.css';
import Img1 from './assets/a.png';
import Img2 from './assets/b.png';
import Img3 from './assets/c.png';
import Img4 from './assets/d.png';
import Black from './assets/black.jpg';
import Error1 from './assets/error1.gif';
import Error2 from './assets/error2.jpg';
import Error3 from './assets/error3.gif';
import Error4 from './assets/error4.gif';
import SpinGif from './assets/Spinner-2.gif';
import Spin1 from './assets/spin1.gif';
import Spin2 from './assets/spin1.gif';
import Spin3 from './assets/spin1.gif';
import Spin4 from './assets/spin1.gif';
import Transparent from './assets/transparent.png';
import CloseIcon from '@material-ui/icons/Close';
import { OpenInNewSharp } from '@material-ui/icons';
import { Configuration, OpenAIApi } from 'openai';

let generada = false;


const Gallery = () => {

    const [imgSrc1, setImgSrc1] = useState(Transparent);
    const [imgSrc2, setImgSrc2] = useState(Transparent);
    const [imgSrc3, setImgSrc3] = useState(Transparent);
    const [imgSrc4, setImgSrc4] = useState(Transparent);


    const [prompt, setPrompt] = useState('');

    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');

    const errs = [Error1, Error2, Error3, Error4]
    const ims = [Img1, Img2, Img3, Img4];

    const configuration = new Configuration({
        apiKey: "<API KEY from OPENAI>"
      });
    
      const openai = new OpenAIApi(configuration);


    let data = [
    {   imgSrc: imgSrc1,
    },
    {   imgSrc: imgSrc2,
    },
    {   imgSrc: imgSrc3,
    },
    {   imgSrc: imgSrc4,
    },
    ]


    const getImg = (imgSrc) => {
        if(generada){
            setTempImgSrc(imgSrc);
            setModel(true);
        }

    }

    const changeImgs = () =>{
        setImgSrc1(ims[Math.floor(Math.random() * 4)]);
        setImgSrc2(ims[Math.floor(Math.random() * 4)]);
        setImgSrc3(ims[Math.floor(Math.random() * 4)]);
        setImgSrc4(ims[Math.floor(Math.random() * 4)]);
    }

    const generateImage = async () =>{
        setImgSrc1(Spin1);
        setImgSrc2(Spin2);
        setImgSrc3(Spin3);
        setImgSrc4(Spin4);
        generada = true;
        try{

            const response = await openai.createImage({
                prompt: prompt,
                n: 4,
                size: "1024x1024",
            });
            
            setImgSrc1(response.data.data[0].url);
            setImgSrc2(response.data.data[1].url);
            setImgSrc3(response.data.data[2].url);
            setImgSrc4(response.data.data[3].url);
        } catch{
            const shuffledArray = errs.sort((a, b) => 0.5 - Math.random());

            setImgSrc1(shuffledArray[0]);
            setImgSrc2(shuffledArray[1]);
            setImgSrc3(shuffledArray[2]);
            setImgSrc4(shuffledArray[3]);

            
        }

    }


    return(
        <div className='app-main'>      
            <textarea  className='app-input'
            onChange={(e) => {
                setPrompt(e.target.value);
            }}

            placeholder="write your prompt here"/>
        <button className='app-btn' onClick={generateImage}>Flipar!</button>
        <div className='gallery'>
            <div className={model? "model open" : "model"}>
                <img src={tempImgSrc} onClick ={ () => {setModel(false)}}/>
                <CloseIcon onClick ={ () => {setModel(false)}}/>
            </div>
            {data.map((item, index) => {
                return(
                    <div className='pics' key={index} onClick={() => getImg(item.imgSrc)}>
                        <img className="imgs" src={item.imgSrc} style={{width: '100%'}}/>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default Gallery;