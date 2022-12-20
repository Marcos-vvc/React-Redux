import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCounties,
  getDistricts,
  getStates,
  selectApp,
} from "../../reducers/states";
import { AppDispatch, useAppSelector } from "../../store";
import pais from "../../assets/logo.jpg";

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
    <div className="flex flex-col w-screnn h-screen items-center">
      <img src={pais} className="w-full h-full" />
      <div className="flex flex-col items-center px-6 py-4 rounded-lg bg-gray-200/50 border border-gray-600  text-gray-900 absolute bottom-2/4 w-2/4 opacity-100 gap-1 pb-5">
        <h1 className="text-center text-xl font-bold">Selecione os Estados</h1>
        <select
          onChange={handleSelectedUf}
          className=" border-2 border-black	 rounded-md w-2/4 cursor-pointer	pl-3 py-1"
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
          className="border-2 border-black rounded-md w-2/4	cursor-pointer	pl-3 py-1"
        >
          <option value="0">Selecione o Municipio</option>
          {(counties ?? []).map((city) => (
            <option key={city.id} value={city.id}>
              {city.nome}
            </option>
          ))}
        </select>

        <select className="border-2 border-black rounded-md w-2/4	cursor-pointer pl-3	py-1">
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
