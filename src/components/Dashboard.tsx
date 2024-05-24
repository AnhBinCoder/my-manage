import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { useEffect, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

type listFilm = {
    id: number,
    image: string,
    detailImg: string,
    description: string,
    title: string,
    year: string,
    nation: string
};

export default function Dashboard() {

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
    //add new movie
    const [id, setId] = useState<number>()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [nation, setNation] = useState('')
    const [year, setYear] = useState('')
    const [detailImg, setDetailImg] = useState('')
    const [image, setImage] = useState('')
    const [success, setSuccess] = useState('')

    const handleAddMovie = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            // 👇️ const data: CreateUserResponse
            const { data, status } = await axios.post<listFilm[]>(
                'https://6650a80bec9b4a4a6032e751.mockapi.io/movie',
                {
                    title: title,
                    image: image,
                    detailImg: detailImg,
                    description: description,
                    year: year,
                    nation: nation
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );
            getListfilm();
            setSuccess("Add movie success")
            console.log(JSON.stringify(data, null, 4));
            console.log(status);
            return data;
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

    return (
        <>
            <TableContainer component={Paper}>
                <h3>List of movies</h3>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Movie Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Year&nbsp;</TableCell>
                            <TableCell>Nation&nbsp;</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {listfilm.map((row) => (

                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.year}</TableCell>
                                <TableCell>{row.nation}</TableCell>

                                <TableCell><Link to={`/edit/${row.id}`} ><SettingsIcon style={{ color: "purple", cursor: "pointer" }} /></Link></TableCell>
                                <TableCell>
                                    <Tooltip title="Delete">
                                        <IconButton>
                                            <DeleteIcon style={{ color: "pink", cursor: "pointer" }} onClick={() => {
                                                setId(row.id)

                                            }} />
                                        </IconButton>
                                    </Tooltip>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <div className="row">
                <h3>Add new movie </h3>
                <form onSubmit={handleAddMovie} className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            <input id="title" type="text" className="validate" required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="nation" type="text" className="validate" required
                                value={nation}
                                onChange={(e) => setNation(e.target.value)}
                            />
                            <label htmlFor="last_name">Nation</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="year" type="number" className="validate" required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <label htmlFor="text">Release Year</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id='description' type="text" className="validate" required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="phone">Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="image" type="text" className="validate" required
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <label htmlFor="text"> Image</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="detailImg" type="text" className="validate" required
                                value={detailImg}
                                onChange={(e) => setDetailImg(e.target.value)}
                            />
                            <label htmlFor="text">Detail Image</label>
                        </div>
                    </div>
                    <Button type='submit' variant="contained" disableElevation className="purple darken-3">
                        Add Movie
                    </Button>
                    <h4 style={{ color: "purple" }}>{success}</h4>
                </form>
            </div>
        </>
    );
}