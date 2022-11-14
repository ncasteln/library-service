import { IBook } from "../../features/catalogue/catalogueSlice";

const renderTable = (
  name: string,
  list: IBook[],
  idList: string[]
): JSX.Element[] => {

  return list
    .filter(book => {
      return idList.includes(book.id)
    })
    .map((book, i) => {
      return (
        <tr key={`${name}-${i}`}>
          <td>{i}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.year}</td>
        </tr>
      )
    })
}

export default renderTable;
