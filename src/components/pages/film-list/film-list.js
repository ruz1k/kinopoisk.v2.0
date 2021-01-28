import React, {Component} from 'react'
import axios from "axios";
import {List, Card, Image, Spin, Dropdown, Menu, message } from "antd";
import "./film-list.sass"
import {Link} from "react-router-dom";
import arrow from '../../../img/markup_static_img_svg_collapse-down-white.svg'

class FilmList extends Component {
    state = {
        error: null,
        isLoaded: false,
        list: [],
        dataGenres: [],
    }

    fetchData() {
        axios("https://api.themoviedb.org/3/discover/movie?api_key=32adee17c164b555fa727f7406e2fe07&language=en-US&include_adult=false&include_video=false")
            .then(res => res)
            .then(
                (data) => {
                    this.setState(state => {
                        const dataWithFavorite = data.data.results.map((item) => {
                            return {
                                ...item,
                                favorite: false
                            }
                        })
                        return {
                            list: [...dataWithFavorite],
                            isLoaded: true,
                            dataGenres: data.data.results
                        };
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

    componentDidMount() {
        this.fetchData()
    }

    render() {
        const {isLoaded, list} = this.state
        /// Удаление и добавление в избранное и из избранного
        const deleteOnFavorite = (dataFav) => {
            dataFav.favorite = false
            message.error(`Film deleted in favorite`);
            this.setState({
                list
            })
        }
        const addToFavorite = (dataFav) => {
            dataFav.favorite = true
            message.success(`Film added to favorite`);
            this.setState({
                list
            })
        }
        /// Очистка фильтров и сортировки
        const resetList = () => {
            this.fetchData()
        }
        /// Сортировка по популярности
        const listSortByPopularity = () => {
            const sorted = list.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1)
            this.setState({
                list: sorted
            })
            const active = document.querySelectorAll('.ant-dropdown-menu li')
            for (let i = 0; active.length > i; i++) {
                active[i].classList.add('active')
            }
        }
        /// Сортировка по Рейтингу
        const listSortByRating = () => {
            const sorted = list.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1)
            this.setState({
                list: sorted
            })
        }
        /// Сортировка по Дате
        const listSortByDate = () => {
            const sorted = list.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1)
            this.setState({
                list: sorted
            })
        }
        /// Фильтр жанров
        const filterGenres = (genre_id) => {
            const {dataGenres} = this.state
            const sortedGenres = dataGenres.filter(item => item.genre_ids[0] === genre_id)
            this.setState({
                list: sortedGenres
            })
        }
        /// Dropdown меню
        const dropDownSort = (
            <Menu theme={"dark"}>
                <Menu.Item>
                    <button onClick={() => resetList()} className='sort-btn reset' type="primary">Reset
                    </button>
                </Menu.Item>
                <Menu.Item key="0">
                    <button onClick={() => listSortByRating()} className='sort-btn' type="primary">Sort By Rating
                    </button>
                </Menu.Item>
                <Menu.Item key="1">
                    <button onClick={() => listSortByDate()} className='sort-btn' type="primary">Sort By Date</button>
                </Menu.Item>
                <Menu.Item key='2'>
                    <button onClick={() => listSortByPopularity()} className='sort-btn' type="primary">Sort By
                        Popularity
                    </button>
                </Menu.Item>
            </Menu>
        );
        const filterSort = (
            <Menu theme={"dark"}>
                <Menu.Item>
                    <button onClick={() => resetList()} className='sort-btn reset' type="primary">Reset</button>
                </Menu.Item>
                <Menu.Item key="0">
                    <button onClick={() => filterGenres(28)} className='sort-btn' type="primary">Action</button>
                </Menu.Item>
                <Menu.Item key="1">
                    <button onClick={() => filterGenres(12)} className='sort-btn' type="primary">Adventure</button>
                </Menu.Item>
                <Menu.Item key="2">
                    <button onClick={() => filterGenres(16)} className='sort-btn' type="primary">Animation</button>
                </Menu.Item>
                <Menu.Item key="3">
                    <button onClick={() => filterGenres(35)} className='sort-btn' type="primary">Comedy</button>
                </Menu.Item>
                <Menu.Item key="4">
                    <button onClick={() => filterGenres(80)} className='sort-btn' type="primary">Crime</button>
                </Menu.Item>
                <Menu.Item key="5">
                    <button onClick={() => filterGenres(99)} className='sort-btn' type="primary">Documentary</button>
                </Menu.Item>
                <Menu.Item key="6">
                    <button onClick={() => filterGenres(18)} className='sort-btn' type="primary">Drama</button>
                </Menu.Item>
                <Menu.Item key="7">
                    <button onClick={() => filterGenres(10751)} className='sort-btn' type="primary">Family</button>
                </Menu.Item>
                <Menu.Item key="8">
                    <button onClick={() => filterGenres(14)} className='sort-btn' type="primary">Fantasy</button>
                </Menu.Item>
                <Menu.Item key="9">
                    <button onClick={() => filterGenres(36)} className='sort-btn' type="primary">History</button>
                </Menu.Item>
                <Menu.Item key="10">
                    <button onClick={() => filterGenres(27)} className='sort-btn' type="primary">Horror</button>
                </Menu.Item>
                <Menu.Item key="11">
                    <button onClick={() => filterGenres(10402)} className='sort-btn' type="primary">Music</button>
                </Menu.Item>
                <Menu.Item key="12">
                    <button onClick={() => filterGenres(9648)} className='sort-btn' type="primary">Mystery</button>
                </Menu.Item>
                <Menu.Item key="13">
                    <button onClick={() => filterGenres(10749)} className='sort-btn' type="primary">Romance</button>
                </Menu.Item>
                <Menu.Item key="14">
                    <button onClick={() => filterGenres(878)} className='sort-btn' type="primary">Science Fiction
                    </button>
                </Menu.Item>
                <Menu.Item key="15">
                    <button onClick={() => filterGenres(10770)} className='sort-btn' type="primary">TV Movie</button>
                </Menu.Item>
                <Menu.Item key="16">
                    <button onClick={() => filterGenres(53)} className='sort-btn' type="primary">Thriller</button>
                </Menu.Item>
                <Menu.Item key="17">
                    <button onClick={() => filterGenres(10752)} className='sort-btn' type="primary">War</button>
                </Menu.Item>
                <Menu.Item key="18">
                    <button onClick={() => filterGenres(37)} className='sort-btn' type="primary">Western</button>
                </Menu.Item>
            </Menu>
        )
        return (
            <Spin spinning={!isLoaded}>
                <div className='container'>
                    <div className='sort'>
                        <Dropdown overlay={dropDownSort} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <span>
                                    Sort
                                <img alt='' src={arrow}/>
                                </span>
                            </a>
                        </Dropdown>
                        <Dropdown overlay={filterSort} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <span>Filter Genres
                                <img alt='' src={arrow}/></span>
                            </a>
                        </Dropdown>
                    </div>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 3,
                            md: 3,
                            lg: 3,
                            xl: 3,
                            xxl: 3,
                        }}
                        pagination={{
                            defaultPageSize: 9,
                            pageSizeOptions: [20, 30, 60],
                            size: "small",
                        }}
                        dataSource={list}
                        renderItem={item => {
                            return (
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
                                    {item.favorite === true ? <button onClick={() => deleteOnFavorite(item)} className='want-to-watch true'>Delete on Favorite</button>
                                        : <button onClick={() => addToFavorite(item)} className='want-to-watch false'>Add to Favorite</button>}
                                </List.Item>
                            )
                        }}
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