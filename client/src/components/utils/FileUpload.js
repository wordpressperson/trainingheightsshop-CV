import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd'
import Axios from 'axios'

const FileUpload = (props) => {
    //state def
    const [Images, setImages] = useState([])


    //def for ondrop func
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {
                'content-type': 'multipart/form-data',
            }
        }
        formData.append("file", files[0])

        //send image to server
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } 
                else {
                    alert('Failed to save image in Server')
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex=Images.indexOf(image)

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={900000000}>

            {({getRootProps, getInputProps}) => (
                <div style={{width: '300px', height: '240px', border: '1px solid lightgrey', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    {...getRootProps()}
                >
                <input {...getInputProps()}/>
                <Icon type="plus" style={{fontSize: '3rem'}}/>
                </div>
            )}
            </Dropzone>
            <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'scroll', }}>
                {Images.map((image, index) => (
                    <div onClick={onDelete} key={index}>
                        <img
                            style={{minWidth: '300px', width: '300px', height: '240px'}} 
                            src={`http://localhost:5000/${image}`} alt={`product-${index}`} 
                            />
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default FileUpload;