import React from 'react';
import './css/MarsImages.css';
import ReactLoading from 'react-loading';

const MarsPhotos = (props) => {

    if (props.noPhotos) {
        return (
            <div className="no-photo">
                <h2> No photos available. Try different input parameters.
                </h2>
            </div>
        )
    }

    if (props.loading) {
        return (
            <div className="loader">
                <h2> Connecting to Mars... </h2>
                <ReactLoading type={"bars"} color={"rgb(20,129,134)"} height={50} width={200} />
            </div>
        )
    }


    return (
        props.photos.map(photo => <div className="grid-item"><img className="mars-image" key={photo.id} src={photo.img_src} alt="Mars" /></div>)
    )
}

export default MarsPhotos;
