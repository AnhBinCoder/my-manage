
type listFilm = {
    id: number,
    image: string,
    detailImg: string,
    description: string,
    title: string,
    year: string,
    nation: string
};

type ModalProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    thisfilm: listFilm | undefined
}
export default function ModalCase({ setIsOpen, thisfilm }: ModalProps) {
    return (
        <div className='modal-show' onClick={() => setIsOpen(false)}>
            <div id="modal1" className="modal" style={{ display: 'block', top: '35%' }}>
                <div className="modal-content">
                    <h4>Group 5 {thisfilm?.title}</h4>
                    <p><iframe width="100%" height="400px" src={thisfilm?.image} title={thisfilm?.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></p>
                </div>
                <div className="modal-footer">
                    <a className="modal-close red-text">Close</a>
                </div>
            </div>
        </div>
    )
}