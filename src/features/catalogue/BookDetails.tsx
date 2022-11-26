import { useParams } from "react-router-dom";

const BookDetails = () => {
  // const currentBookId = NEW STATE, which is the current explored state
  // OOOORRRR
  // useParams and verify if the book exist and render, otherwise render an error
  // io chiederei su stackoverflow
  const params = useParams();
  console.log(params)

  return (
    <div>
      BookDetails
    </div>
  )
};

export default BookDetails;