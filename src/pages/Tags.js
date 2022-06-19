import { gql, useMutation, useQuery } from "@apollo/client";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";
import { useState } from "react";
import { Input } from "@mui/material";

const GET_TAGS_QUERY = gql`
  query GetMyTags {
    getMyTags {
      _id
      name
      color
    }
  }
`;

const TAGS_MUTATION = gql`
  mutation Mutation($data: tagInfo!) {
    create_tag(data: $data) {
      status
      msg
    }
  }
`;

const Tags = () => {
  const [nameInput, setNameInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  const [send_tags_mutation] = useMutation(TAGS_MUTATION);

  const { error, loading, data, refetch } = useQuery(GET_TAGS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  const submitTags = async () => {
    if (nameInput === "") return ErrorToast("please choose a color name");
    if (colorInput === "") return ErrorToast("please choose a color");
    try {
      const {
        data: {
          create_tag: { status },
        },
      } = await send_tags_mutation({
        variables: {
          data: {
            name: nameInput,
            color: colorInput,
          },
        },
      });
      if (status === 200)
        return (
          refetch(),
          SuccessToast("your tag successfully was added"),
          setNameInput(""),
          setColorInput("")
        );
    } catch (error) {
      if (error) return ErrorToast("Please chose a color");
      console.log(error);
    }
  };

  // console.log(colorInput);

  return (
    <>
      <div className="bg-red-">
        <h1 className="absolute right-[5rem] text-[30px] m-4 text-[#ffffff] bg-red- w-[5rem] ">
          تگ ها
        </h1>
        <div className=" absolute right-[7rem] top-[12rem]  flex justify-between -red-500 w-[30rem]  ">
        <button
              className="bg-[#63db8b]  hover:bg-[#6df299]  right-[8rem] top-[15rem]  rounded w-[5rem]   p-1 "
              onClick={() => submitTags()}
            >
              Add
            </button>
          <Input
            className="-[4rem] bg-blue- w-[3rem]  "
            onChange={(e) => setColorInput(e.target.value)}
            value={colorInput}
            type="color"
          />
          <div>
            <input
              onChange={(e) => setNameInput(e.target.value)}
              value={nameInput}
              autoComplete="color"
              type="text"
              className="mr-[1rem] text-right outline-none pr-2 bg-blue- bg-[#bac8ca] w-[10rem] "
            />
            {/* <input className="mr-[2rem] rounded-md outline-none " onChange={(e) => setNameInput(e.target.value)} type="taxt" /> */}

           
          </div>
          

        </div>
        
        <div
          style={{ overflowY: "scroll" }}
          className="absolute top-[12rem] -red-500 h-[25rem] "
        >
          {data?.getMyTags?.map((tag) => {
            return (
              <>
                <div className="flex justify-evenly text-right -red-300 w-[30rem] mt-[] ">
                  <Input
                    value={tag.color}
                    className="ml-[] bg-blue- w-[3rem]  "
                    type="color"
                    disabled="true"
                    />
                  <div>
                    <input
                      value={tag.name}
                      readOnly="true"
                      type="text"
                      className="mr-[] outline-none bg-[#bac8ca] pr-2 text-right w-[10rem]"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tags;
