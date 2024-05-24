import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';

type listFilm = {
    id: number,
    image: string,
    detailImg: string,
    description: string,
    title: string,
    year: string,
    nation: string
};


export default function Film(): JSX.Element {

    const [listfilm, setListfilm] = useState<listFilm[]>([])

    async function getListfilm() {
        try {
            // 👇️ const data: getListfilmResponse
            await axios.get<listFilm[]>(
                'https://6650a80bec9b4a4a6032e751.mockapi.io/movie',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            ).then(response => {
                setListfilm(response.data);
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    useEffect(() => {
        getListfilm();
    }, []
    )
    const mystyle = {
        width: "100%",
        height: "500px"
    };


    return (
        <>

            <div className="row container">
                <h3>List of films</h3>
                {listfilm?.map((film) => (
                    <div key={film.id} className="col s12 m4">
                        <div className="card">
                            <Link to={`/detail/${film.id}`}><div className="card-image">
                                <img src={film.image} style={mystyle} />
                                <span className="card-title">{film.title}</span>
                                <a className="btn-floating halfway-fab waves-effect waves-light green"><i className="material-icons">add</i></a>
                            </div></Link>
                            <div className="card-content">
                                <p>Movie: {film.title}</p>
                                <p>Release Year: {film.year}</p>
                                <p>Nation: {film.nation}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}