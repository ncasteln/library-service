import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ILocation } from "../../features/user/userSlice";

const Profile = () => {
  const userInfo = useAppSelector(state => state.user.userInfo);

  return (
    <div>
      {
        Object
          .entries(userInfo)
          .map(([key, value]) => {
            const keyToRender = [
              'first_name', 
              'last_name',
              'email', 
              'username',
              'password',
              'location' ]
            if (keyToRender.includes(key)) {
              if (key === 'location') {
                return Object
                  .entries(value as ILocation)
                  .map(([locKey, locValue]) => {
                    return (
                      <div key={`profile-${locKey}`}>{locKey}: {locValue}</div>
                    )
                  })
              } else {
                return (
                  <div key={`profile-${key}`}>{key} : {value}</div>
                )
              }
            }
            else {
              return null;
            }
          })  
      }
    </div>
  )
}

export default Profile;