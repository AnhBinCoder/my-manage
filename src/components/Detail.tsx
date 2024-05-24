
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ModalCase from "./ModalCase";
import axios from 'axios'
type listFilm = {
  id: number,
  image: string,
  detailImg: string,
  description: string,
  title: string,
  year: string,
  nation: string
};

export default function Detail(): JSX.Element {

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
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams()
  const thisfilm = listfilm?.find((film) => String(film.id) === id)
  console.log(thisfilm?.image)
  return (
    <>
      <div className="row container">
        <div className="col s12 m12">
          <div className="card">
            <div className="card-image">
              <img src={thisfilm?.detailImg} />
              <span className="card-title">{thisfilm?.title}</span>
              <a onClick={() => setIsOpen(true)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">ondemand_video</i></a>
              {isOpen && <ModalCase setIsOpen={setIsOpen} thisfilm={thisfilm} />}
            </div>
            <div className="card-content">
              <p>{thisfilm?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}