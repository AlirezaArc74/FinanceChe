import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";
import { DateInput } from "react-hichestan-datetimepicker";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import RoomIcon from "@mui/icons-material/Room";

const GET_TAGS_QUERY = gql`
  query GetMyTags {
    getMyTags {
      _id
      name
      color
    }
  }
`;

const EXPENSE_MUTATION = gql`
  mutation Mutation($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
      msg
    }
  }
`;

const NewPurchase = () => {
  const myMap = useRef();
  const [amount, setAmount] = useState("");
  const [tagData, setTagData] = useState([]);
  const [colorIdChosen, setColorIdChosen] = useState("notChoses");
  const [date, setDate] = useState("");
  const [position, setPosition] = useState(null);

  const [send_expense_mutation] = useMutation(EXPENSE_MUTATION);

  const { error, loading, data, refetch } = useQuery(GET_TAGS_QUERY);

  useEffect(() => {
    setTagData(data?.getMyTags);
  }, [data]);

  const tarikh = date?.slice(0, 10);
  // console.log(tarikh)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log(tagData);
  const _data = {
    amount: Number(amount),
    geo: {
      lat: position?.lat,
      lon: position?.lng,
    },
    tags: colorIdChosen,
    date: tarikh,
  };

  const expanseSubmit = async () => {
    if (amount === "مقدار")
      return ErrorToast("لطفا مقدار خرید به تومان را وارد کنید");
    // if(lat || lon === undefined)
    if (colorIdChosen === "notChoses")
      return ErrorToast("لطفا تگ خرید را انتخاب کنید");

    if (date === "") return ErrorToast("لطفا تاریخ خرید را انتخاب کنید");
    if (position.lat === 51.505
      || position.lon === -0.09)
      return ErrorToast("لطفا مکان خرید خود را انتخاب کنید");
    try {
      const {
        data: {
          create_expense: { status },
        },
      } = await send_expense_mutation({
        variables: {
          data: _data,
        },
      });
      if (status === 200)
        return (
          refetch(),
          SuccessToast("اطلاعات خرید با موفقیت ثبت شد"),
          setAmount(""),
          setColorIdChosen(""),
          setDate("")
        );
    } catch (error) {
      console.log(_data);

      if (error) return ErrorToast("لطفا موارد خواسته شده را وارد کنید");
      console.log(error);
    }
  };

  // console.log(date);
  console.log(_data);

  return (
    <>
      <div className="mt-[2rem] border-black border h-[20rem] w-[15rem] bg-blue-600 ml-[10rem]  ">
        <p className="m-4"> اطلاعات خرید خود را وارد کنید </p>
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder="مقدار"
          className="rounded-md bg pr-2 m-4 text-right "
          type="text"
        />
        <br />
        <select
          className="m-4 rounded w-[11.3rem] pl-2 h-[1.4rem] text-right "
          value={colorIdChosen}
          onChange={({ target: { value } }) => setColorIdChosen(value)}
        >
          <option value="notChoses"> تگ خود را انتخاب کنید </option>
          {/* {console.log(colorIdChosen)} */}
          {tagData?.map((item) => {
            return (
              <>
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              </>
            );
          })}
        </select>

        <br />

        <div className="w-[11.3rem] m-4 ">
          <DateInput
            autoOk={true}
            readOnly={true}
            dialogContainerStyle={{ backgroundColor: "#BBC8CA" }}
            className="bg-red- pr-8 outline-none rounded-md  "
            value={date}
            onChange={({ target: { value } }) => setDate(value)}
          />
          {/* {console.log(date)} */}
        </div>
        <button
          className="m-4 bg-[#43b72a] hover:bg-[#7fc96e] p-1 rounded-[90px]"
          onClick={() => expanseSubmit()}
        >
          submit
        </button>
      </div>

      <div className="bg-red- absolute right-[15rem] w-[30rem] h-[25rem] top-[6rem] ">
        <p className="text-right mb-2  ">
          لطفا مکان خرید خود را از روی نقشه انتخاب کنید
        </p>
        <div className="relative h-[19rem] w-[30rem]  ">
          <RoomIcon
            style={{ zIndex: 999 }}
            className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] "
          />
          {/* <ExternalStateExample /> */}
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            ref={myMap}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          <button
            className="absolute top-[-2.2rem] bg-[#43b72a] hover:bg-[#7fc96e] p-1 rounded-[90px] "
            onClick={() => {
              console.log(myMap.current.getCenter());
              setPosition(myMap.current.getCenter());
              SuccessToast("مکان جدید ثبت شد");
            }}
          >
            get locaton
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPurchase;

{
  /* <div className="razi" style={{background: 'red', width: 400, height: 400, borderRadius: '8px', transition: 'all .2s',
      transformOrigin: '20% 80%'
    }}>

      </div> */
}
