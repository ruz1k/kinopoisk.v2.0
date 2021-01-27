import React, {Component} from 'react'
import axios from "axios";
import {List, Card, Image, Spin, Dropdown, Menu} from "antd";
import "./film-list.sass"
import {Link} from "react-router-dom";

class FilmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            list: [],
        };
    }

    componentDidMount() {
        axios("https://api.themoviedb.org/3/discover/movie?api_key=32adee17c164b555fa727f7406e2fe07&language=en-US&include_adult=false&include_video=false")
            .then(res => res)
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        list: data.data.results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const {isLoaded, list} = this.state
        const listSortByPopularity = () => {
            const sorted = list.sort((a,b) => (a.popularity > b.popularity) ? -1 : 1)
            this.setState({
                list: sorted
            })
        }
        const listSortByRating = () => {
            const sorted = list.sort((a,b) => (a.vote_average > b.vote_average) ? -1 : 1)
            this.setState({
                list: sorted
            })
        }
        const listSortByDate = () => {
            const sorted = list.sort((a,b) => (a.release_date > b.release_date) ? -1 : 1)
            this.setState({
                list: sorted
            })
        }
        const dropDownSort = (
            <Menu>
                <Menu.Item key="0">
                    <button onClick={() => listSortByPopularity()} className='sort-btn' type="primary">Sort By Popularity</button>
                </Menu.Item>
                <Menu.Item key="1">
                    <button onClick={() => listSortByRating()} className='sort-btn' type="primary">Sort By Rating</button>
                </Menu.Item>
                <button onClick={() => listSortByDate()} className='sort-btn' type="primary">Sort By Date</button>
            </Menu>
        );
        return (
            <Spin spinning={!isLoaded}>
                <div className='container'>
                    <div className='sort'>
                        <Dropdown overlay={dropDownSort} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <span>Sort</span>
                            </a>
                        </Dropdown>,
                    </div>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 3,
                            xxl: 3,
                        }}
                        pagination={{
                            defaultPageSize: 10,
                            pageSizeOptions: [20, 30, 60],
                            size: "small",
                        }}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item>
                                <Link to={{
                                    pathname: `/Film/${item.id}`,
                                    detail: item
                                }}
                                >
                                    <Card bordered={false}>
                                        <Image
                                            src={"https://image.tmdb.org/t/p/original/" + `${item.poster_path}`}
                                        />
                                        <p>{item.title}</p>
                                        <span
                                            className={`rating ${item.vote_average >= 7 ? "good-film" : item.vote_average < 5 ? "bad-film" : "medium-film"} `}>{item.vote_average}</span>
                                        <Genres ids={item.genre_ids[0]}/>
                                        <span>, {item.release_date.substr(0, 4)}</span>
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            </Spin>
        )
    }
}

const Genres = (props) => {
    /// В данной функции я вывожу жанры
    /// Номера жанров я взял с данного API
    // https://api.themoviedb.org/3/genre/movie/list?api_key=32adee17c164b555fa727f7406e2fe07&language=en-US
    const {ids} = props
    switch (ids) {
        case 28:
            return <span>Action</span>
        case 12:
            return <span>Adventure</span>
        case 16:
            return <span>Animation</span>
        case 35:
            return <span>Comedy</span>
        case 80:
            return <span>Crime</span>
        case 99:
            return <span>Documentary</span>
        case 18:
            return <span>Drama</span>
        case 10751:
            return <span>Family</span>
        case 14:
            return <span>Fantasy</span>
        case 36:
            return <span>History</span>
        case 27:
            return <span>Horror</span>
        case 10402:
            return <span>Music</span>
        case 9648:
            return <span>Mystery</span>
        case 10749:
            return <span>Romance</span>
        case 878:
            return <span>Science Fiction</span>
        case 10770:
            return <span>TV Movie</span>
        case 53:
            return <span>Thriller</span>
        case 10752:
            return <span>War</span>
        case 37:
            return <span>Western</span>
        default:
            return <span></span>
    }
}

export {
    FilmList,
    Genres
};