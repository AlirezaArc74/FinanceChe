import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import "../App.css";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";
import UploadImage from "../components/UploadImage";
import { useAllState, UserContext } from "../UserContext";

const GET_ME_QUERY = gql`
  query Query {
    me {
      _id
      name
      username
      img
    }
    getMyTags {
      name
      color
      _id
    }
  }
`;

const EDIT_USER_MUTATION = gql`
  mutation Mutation($name: String!, $img: Upload) {
    editMe(name: $name, img: $img) {
      status
      msg
    }
  }
`;

const User = () => {
  const [userData, setUserData] = useState({});
  const [userTags, setUserTags] = useState([]);
  const [userFile, setUserFile] = useState(null);
  const { userImage, setUserImage } = useAllState();

  const { error, loading, data, refetch } = useQuery(GET_ME_QUERY);
  const [edit_user_mutation] = useMutation(EDIT_USER_MUTATION);

  // useEffect(() => {
  //   setUserData(data?.me);
  // }, [data]);

  // useEffect(() => {
  //   setUserTags(data?.getMyTags);
  // }, [data]);

  // useEffect(() => {
  //   setUserImage(data?.me?.img);
  // }, [data]);

  useEffect(() => {
    setUserData(data?.me);
    setUserTags(data?.getMyTags);

    setUserImage(data?.me?.img);

  },[data])
  console.log(data);
  // useEffect(() => {
  //   setImage
  // })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log(userFile);
  // console.log(userTags);
  // console.log(userData)
  // console.log(data);
  // console.log(image);

  const handlePictureLoad = async () => {
    if (!userFile) return ErrorToast("لطفا یک عکس جدید انتخاب کنید");
    try {
      const {
        data: {
          editMe: { status },
        },
      } = await edit_user_mutation({
        variables: {
          name: userData.name,
          img: userFile,
        },
      });
      if (status === 200)
        return refetch(), SuccessToast("عکس جدید با موفقیت ثبت شد");
    } catch (error) {
      if (error) return ErrorToast("لطفا عکس مناسب انتخاب کنید");
      console.log(error);
    }
  };

  // const handleImage = () => [

  // ]

  return (
    <>
      <div>
        <div className="absolute top-[7rem] text-right right-[20rem] h-[rem] w-[11rem] bg-white">
          {/* <h1>{userData?.username} :کاربری نام </h1> */}
          <h1> :تگ های شما </h1>
          <div
            style={{ overflowY: "scroll" }}
            className="absolute right-[0rem] bg-red- h-[15rem] bg-white  "
          >
            {userTags?.map((tag) => {
              return (
                <>
                  <div className=" flex justify-between bg-red- m-2 w-[10rem] ">
                    <input type="color" value={tag.color} disabled={true} />

                    <h1> {tag.name} </h1>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className=" relative top-[2rem] left-[4rem] w-[20rem] h-[30rem] bg-white ">
          <h1 className=" absolute top-4 left-[5.5rem] -red-500">
            Upload your image
          </h1>
          <input
            onChange={(e) => setUserFile(e.target.files[0])}
            type="file"
            style={{ display: "none" }}
            className="my_file  "
            id="myInput"
          />
          <label htmlFor="myInput">
            <img
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                cursor: "pointer",
                border: "1px solid black",
              }}
              onError={(e) => {
                e.target.src =
                  "https://p.kindpng.com/picc/s/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png";
              }}
              className=" absolute left-[6rem] top-[3rem] -red-500  "
              src={`${UploadImage.domain}/${userImage}`}
            />
          </label>

          <h1 className="absolute top-[12rem] left-[1rem] ">Edit Your Name</h1>
          <input
            className="absolute top-[15rem] ml-[1rem] outline-none "
            value={userData?.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

          <button
            className="absolute bottom-[5rem] left-[rem] hover:border p-1 hover:border-black 
            rounded-full w-[5rem] hover:bg-black hover:text-white  "
            onClick={() => handlePictureLoad()}
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
};

export default User;
