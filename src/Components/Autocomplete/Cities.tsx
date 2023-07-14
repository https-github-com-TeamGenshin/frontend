import { useState, ChangeEvent, useRef } from "react";
import { Cities } from "../../Pages/Register/Cities";

export const CitiesAutoComplete = ({
  city,
  setcity,
}: {
  city: string;
  setcity: any;
}) => {
  const [flim, setflim] = useState(false);
  const [cit, setc] = useState<string[]>([...Cities.map((city) => city.name)]);

  const inputRef = useRef<HTMLInputElement>(null);

  document.getElementById("cityauto")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setcity(cit[0]);
      setflim(false);
    }
  });

  setTimeout(() => {
    inputRef.current?.focus();
  }, 100);

  const HashFilter = (val: string) => {
    let cities: string[] = [];
    Cities.filter((c) => {
      if (c.name.toLowerCase().includes(val.toLowerCase())) {
        cities.push(c.name);
      }
      setc(cities);
    });
  };

  // console.log(city);

  return (
    <div id="cityauto" className="">
      {flim && (
        <div className="h-screen w-screen overflow-auto text-center absolute top-0 left-0">
          <div className="bg-black">
            <input
              ref={inputRef}
              className="m-6 p-2 w-[60vw] rounded-2xl outline-none bg-white text-black opacity-100"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                HashFilter(event.target.value)
              }
            />
            <button onClick={() => setflim(false)} className="text-white">
              Cancel
            </button>
          </div>
          <div className=" min-h-screen bg-black opacity-90 flex flex-col gap-2">
            {cit.sort().map((c, i) => (
              <p
                key={i}
                onClick={() => {
                  setcity(c);
                  setflim(false);
                }}
                className="text-white cursor-pointer"
              >
                {c}
              </p>
            ))}
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setc([...Cities.map((city) => city.name)]);
          setflim(true);
        }}
        className="w-[20vw] hover:scale-105 text-black cursor-pointer bg-white p-1 rounded text-center"
      >
        {city !== "" ? city : "Select City"}
      </div>
    </div>
  );
};
