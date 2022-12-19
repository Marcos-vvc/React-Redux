import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCounties,
  getDistricts,
  getStates,
  selectApp,
} from "../../reducers/states";
import { AppDispatch, useAppSelector } from "../../store";

const Home = () => {
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedMu, setSelectedMu] = useState("0");
  const dispatch = useDispatch<AppDispatch>();
  const {
    app: { states, counties, districts },
  } = useAppSelector(selectApp);

  useEffect(() => {
    dispatch(getStates());
  }, []);

  useEffect(() => {
    dispatch(getCounties(selectedUf));
  }, [selectedUf]);

  useEffect(() => {
    dispatch(getDistricts(selectedMu));
  }, [selectedMu]);

  const handleSelectedUf = (event: any) => {
    setSelectedUf(event.target.value);
  };

  const handleCounties = (event: any) => {
    setSelectedMu(event.target.value);
  };

  return (
    <div className="flex h-screen ">
      <div className="flex flex-col justify-center m-auto gap-2 border-double border-4 h-2/4 w-2/5 items-center bg-gray-500">
        <h1 className="text-xl">Selecione os Estados</h1>
        <select
          onChange={handleSelectedUf}
          className=" border-2 rounded-md w-2/4 cursor-pointer	"
        >
          <option>Selecione o Estado</option>
          {(states ?? []).map((uf) => (
            <option key={uf.id} value={uf.id}>
              {uf.nome}
            </option>
          ))}
        </select>

        <select
          onChange={handleCounties}
          className="border-2 rounded-md w-2/4	cursor-pointer	"
        >
          <option value="0">Selecione o Municipio</option>
          {(counties ?? []).map((city) => (
            <option key={city.id} value={city.id}>
              {city.nome}
            </option>
          ))}
        </select>

        <select className="border-2 rounded-md w-2/4	cursor-pointer	">
          <option value="0">Selecione a Região Administrativa</option>
          {(districts ?? []).map((district) => (
            <option key={district.id} value={district.id}>
              {district.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Home;
