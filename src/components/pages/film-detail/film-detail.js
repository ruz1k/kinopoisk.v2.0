import React from 'react'
import {Image, Rate} from "antd";
import './film-detail.sass'
import {createGlobalStyle} from 'styled-components'
import {Genres} from "../film-list/film-list";

const FilmDetail = (props) => {
    const {detail} = props.location
    const img = "https://image.tmdb.org/t/p/original/" + `${detail.backdrop_path}`
    /// Замена заднего фона у body на фото,
    //  которые мы получали из API
    const GlobalStyle = createGlobalStyle`
  body {
    background: url(${img}) !important;
    background-color: rgba(0,0,0,0.9) !important;
    background-blend-mode: color;
    background-size: cover !important;
    background-position: center;
  }
`
    return (
        <div className='container'>
            <div className="container__content">
                <div className='content__poster'>
                    <Image preview={false} src={"https://image.tmdb.org/t/p/original/" + `${detail.poster_path}`}/>
                    <Rate count={10} disabled value={detail.vote_average}/>
                    <div className='span-detail'>
                        <span>Vote count: {detail.vote_count}</span>
                    </div>
                    <div className='span-detail genre'>
                        <span>Genre:</span>
                        <Genres ids={detail.genre_ids[0]}/>
                    </div>
                    <div className='span-detail'>
                        <span>Relase date: {detail.release_date}</span>
                    </div>
                    <div className='span-detail favorite'>
                        {detail.favorite === true ? <span>Film added to favorite</span> : <span></span>}
                    </div>
                </div>
                <div className='content__caption'>
                    <p>{detail.overview}</p>
                </div>
            </div>
            <GlobalStyle/>
        </div>
    )
}

export default FilmDetail;
