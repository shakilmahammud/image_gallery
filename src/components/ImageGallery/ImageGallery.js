import React, { useState } from 'react';
import './ImageGallery.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import img1 from '../../asset/images/image-1.webp'
import img2 from '../../asset/images/image-2.webp'
import img3 from '../../asset/images/image-3.webp'
import img4 from '../../asset/images/image-4.webp'
import img5 from '../../asset/images/image-5.webp'
import img6 from '../../asset/images/image-6.webp'
import img7 from '../../asset/images/image-7.webp'
import img8 from '../../asset/images/image-8.webp'
import img9 from '../../asset/images/image-9.webp'
import img10 from '../../asset/images/image-10.jpeg'
import img11 from '../../asset/images/image-11.jpeg'


const ImageGallery = () => {
    //handle images state
  const [images, setImages] = useState([
    { id: '1', url: img11 },
    { id: '2', url: img2  },
    { id: '3', url: img3 },
    { id: '4', url: img4 },
    { id: '5', url: img5 },
    { id: '6', url: img6 },
    { id: '7', url: img7 },
    { id: '8', url: img8 },
    { id: '9', url: img9 },
    { id: '10', url: img10 },
    { id: '11', url: img1 },
    { id: '12', title: 'Add Image' },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);

   //handle image Select
  const handleSelected = (id) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((imageId) => imageId !== id)
        : [...prevSelected, id]
    );
  };

   //handle image Delete
  const handleDelete = () => {
    setImages((prevImages) =>
      prevImages.filter((image) => !selectedImages.includes(image.id))
    );
    setSelectedImages([]);
  };

   //handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const newImage = {
        id: (images.length).toString(), 
        url: URL.createObjectURL(file),
      };
  
      setImages((prevImages) => [
        ...prevImages.slice(0, prevImages.length - 1), 
        newImage,
        prevImages[prevImages.length - 1], 
      ]);
    }
  };

  //Dragend reorder images
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedImages = Array.from(images);
    if (result.source.index !== result.destination.index) {
      const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, reorderedImage);
      setImages(reorderedImages);
    }
  };

  return (
    <div className='container'>
      <div className='btn-container'>
      <p>{selectedImages.length>0?`${selectedImages.length} ${selectedImages.length>1?"Files Selected":"File Selected"}`:"Gallery"}</p>
        {
          selectedImages.length>0? <button onClick={handleDelete}>
          {selectedImages.length>1?"Delete files":"Delete file"}
        </button>:null
        }
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="gallery-layout"
              style={{
                transition: 'transform 0.2s ease',
              }}
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index} isDragDisabled={index === images.length - 1}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${index === 0 ? 'item1' : ''} 
                      ${selectedImages.includes(image.id)?"selected-bg":""}`}
                      onClick={() => index !== images.length - 1 && handleSelected(image.id)}
                      
                    >
                      {index === images.length - 1 ? (
                        <>
                        <label htmlFor="file-input">{image?.title}</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: 'none' }}
                          id="file-input"
                          onChange={handleImageUpload}
                        />
                        </>
                      ) : (
                        <>
                          <label  style={{ position: 'absolute', top: 0, left: 0 }}>
                            <input
                              type="checkbox"
                              checked={selectedImages.includes(image.id)}
                              onChange={() => handleSelected(image.id)}
                            />
                          </label>
                         <div>
                         <img src={image.url} alt={image.id} />
                         </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
