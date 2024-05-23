import { Link } from "react-router-dom";

export default function StoreItem({ ...store }) {
  return (
    <Link to={`/manage-store/${store.name}`} state={store}>
      <div className="flex flex-col gap-3 py-3  ">
        <h2 className="text-2xl font-semibold">{store?.name}</h2>
        <h3>
          {" "}
          <span className="font-semibold text-gray-600 ">Address :</span>{" "}
          {store?.location}
        </h3>

        <div className="flex items-center gap-2 text-gray-600">
          <p className="font-medium tracking-tight ">Total Products:</p>
          <p className="font-medium tracking-tight text-blue-500 ">114</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-medium tracking-tight text-gray-600">
            Total Orders :
          </p>
          <p className="font-medium tracking-tight  text-green-500">41</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium tracking-tight text-blue-500">
            Pending Orders :
          </p>
          <p className="font-medium tracking-tight text-[#E19133]">4</p>
        </div>
      </div>
    </Link>
  );
}
