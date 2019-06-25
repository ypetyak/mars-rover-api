import React from 'react';
import axios from 'axios';
import './css/SearchForm.css';

import MarsPhotos from './MarsPhotos';

class SearchForm extends React.Component {

    state = {
        sol: '',
        camera: 'any',
        photos: [],
        photosFetched: false,
        inputError: false,
        noPhotos: false,
        loading: true
    }

    sendDetails = () => {

        this.setState({
            photosFetched: true,
            noPhotos: false,
            loading: true
        })

        let searchNumber = parseInt(this.state.sol)

        if (searchNumber > 1000 || searchNumber < 0) {
            console.log("error");
            this.setState({ inputError: true })
            return;
        }

        console.log(this.state.sol);
        console.log(this.state.camera);
        axios.post('/search', {
            sol: this.state.sol,
            camera: this.state.camera
        }).then(response => {
	           console.log(response.data)

               if (response.data.photos.length === 0) {
                   this.setState({
                       noPhotos: true,
                       photosFetched: true,
                       loading: false
                   })
               } else {
                   this.setState({
                       photos: response.data.photos,
                       photosFetched: true,
                       inputError: false,
                       noPhotos: false,
                       loading: false
                   })
               }


        }).catch(error => {
            console.log("Error from axios:", error);
        })
    }


    render() {
        return(
            <div className="main-div">
                <div className="search-form-div">
                    <h1> Explore Mars with Curiosity</h1>
                    <div className="main-input-div">
                        <div className="sol-input-div">
                            <h2> Sol </h2>
                            <input
                                type="text"
                                name="sol"
                                placeholder="Enter a number between 0 and 1000"
                                value={this.state.sol}
                                onChange={(e) => this.setState({ sol: e.target.value})}
                            />
                            {this.state.inputError ? (<h2 id="error"> Error! Wrong Input! </h2>) : (<div></div>)}
                        </div>
                        <div className="camera-input-div">
                            <h2> Camera </h2>
                            <select onChange={(e) => this.setState({ camera: e.target.value})}>
                                <option value="any">Any</option>
                                <option value="FHAZ">FHAZ</option>
                                <option value="RHAZ">RHAZ</option>
                                <option value="MAST">MAST</option>
                                <option value="CHEMCAM">CHEMCAM</option>
                                <option value="MAHLI">MAHLI</option>
                                <option value="MARDI">MARDI</option>
                                <option value="NAVCAM">NAVCAM</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={this.sendDetails}> Search </button>
                </div>
                <div className="photo-grid">
                    {this.state.photosFetched ? (<MarsPhotos photos={this.state.photos} noPhotos={this.state.noPhotos} loading={this.state.loading}/>) : (<div></div>)}
                </div>
            </div>
        )
    }
}

export default SearchForm;
