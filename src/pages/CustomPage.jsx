import React, {useEffect, useState} from "react"
import axios from 'axios'
import { Button, Col, Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink, Row, UncontrolledDropdown } from "reactstrap"

import { useNavigate } from "react-router-dom"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function CustomPage() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = "7076af95ae7613e66826b21fe0031742"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

    const navigate = useNavigate();
    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})

    useEffect(() => {
        fetchMovies()
    }, [])

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })

        // console.log(data.results[0])
        setMovies(data.results)
        console.log("Data... ", movies)
        
        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

    // const renderMovies = () => (
    //     movies.map(movie => (
    //         <Movie
    //             selectMovie={selectMovie}
    //             key={movie.id}
    //             movie={movie}
    //         />
    //     ))
    // )

    return (
        <React.Fragment>
            <Container fluid style={{padding: 0}}> 
                <div>
                    <Navbar
                        dark
                        expand="md"
                        fixed="top"
                        style={{backgroundColor: '#363682'}}
                    >
                        <NavbarBrand href="/">
                        reactstrap
                        </NavbarBrand>
                        <NavbarToggler onClick={function noRefCheck(){}} />
                        <Collapse navbar>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                            <NavLink href="/components/">
                                Components
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                GitHub
                            </NavLink>
                            </NavItem>
                            <UncontrolledDropdown
                            inNavbar
                            nav
                            >
                            <DropdownToggle
                                caret
                                nav
                            >
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                Option 1
                                </DropdownItem>
                                <DropdownItem>
                                Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                Reset
                                </DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <NavbarText>
                            Simple Text
                        </NavbarText>
                        </Collapse>
                    </Navbar>
                </div>
            </Container>
            <Container style={{height:'1400px', marginTop: '80px'}}>
                <h4>Rilis terbaru</h4>
                { movies.length ? 

                <OwlCarousel
                    nav={true}
                    navText={false}
                    dots={false}
                    center={false}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={"3000"}
                    responsive={{
                        0: {
                            items: 1,
                            margin: 140,
                        },
                        304: {
                            items: 2,
                            margin: 140,
                        },
                        360: {
                            items: 2,
                            margin: 80,
                        },
                        800: {
                            items: 3,
                            margin: 40,

                        },
                        995: {
                            items: 4,
                            margin: 30,
                        },
                        1150: {
                            items: 5,
                            // stagePadding: 20,
                            margin: 80
                        },
                        1400: {
                            items: 6,
                            // stagePadding: 20,
                            margin: 80
                        }
                    }}
                >
                    {(movies.map(movie => (
                    <div className="movie-card" onClick={() => {navigate("/default")}} key={movie.id}>
                        <img src={IMAGE_PATH + movie.poster_path} className={'object-fit-cover'} alt={movie.title}/>
                        <div className="vote-circle">
                            <h6 style={{marginBottom: 0}}>{movie.vote_average}</h6>
                        </div>
                        <div className="card-content">
                            <h6 style={{margin:0}}>{movie.title}</h6>
                        </div>
                    </div>
                    )))}
                </OwlCarousel>
                
                :
                null }
                
                <section style={{marginBottom: '24px'}}>
                    <h4>Paling sering ditonton</h4>
                    <div className={'most-watching-box'}>
                        <Row>
                            <Col lg={3} sm={12} className={'center-object'}>
                                <div className="movie-card" onClick={() => {navigate("/default")}} key={movie.id}>
                                    <img src={IMAGE_PATH + movie.poster_path} className={'object-fit-cover'} alt={movie.title}/>
                                    <div className="vote-circle">
                                        <h6 style={{marginBottom: 0}}>{movie.vote_average}</h6>
                                    </div>
                                    <div className="card-content">
                                        <h6 style={{margin:0}}>{movie.title}</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={9} sm={12} className={'center-object'}>
                                <div className="most-watching-movie-desc">
                                    <h2 style={{fontWeight: '700'}}>{movie.original_title}</h2>
                                    <p>{movie.overview}</p>
                                    <Button type="button"color="dark">Tonton Sekarang</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
                <section>
                    <h4>Trending minggu ini</h4>
                    <h4>Film lawas</h4>
                    <h4>Serial TV</h4>
                    <h4>Adventure</h4>
                    <h4>Drama</h4>
                    <h4>Kumpulan film Batman</h4>
                    <h4>Family</h4>
                    <h4>Western</h4>
                </section>
            </Container>
        </React.Fragment>
    );
}

export default CustomPage;
