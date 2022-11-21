import { useAppSelector } from "../../app/hooks";
import { ILocation } from "../../features/user/userSlice";

const Profile = () => {
  const profile = useAppSelector(state => state.auth.profile);

  return (
    <div>
      <h2>Personal Data</h2>
      {
        Object
          .entries(profile)
          .map(([key, value]) => {
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
          })  
      }
    </div>
  )
}

export default Profile;