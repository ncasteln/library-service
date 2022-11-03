import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";

// NOTES
// Navigate to Login if not logged
// redirect instead of useNavigate ?

const CatalogueButton = ({ action, bookTitle }: {
  action: string;
  bookTitle: string;
}) => {
  const role = useAppSelector(state => state.user.userInfo.role);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={
        role
          ? () => console.log(`Performed action: ${action}`)
          : () => navigate('/login', { replace: true, state: { from: location } })
      } >
        {action}
    </Button>
  )
};

export default CatalogueButton;