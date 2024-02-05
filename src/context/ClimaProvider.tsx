import axios from "axios";
import { ChangeEvent, PropsWithChildren, createContext, useState } from "react";

export interface BusquedaPayload {
    ciudad: string;
    pais: string;
}

export interface ResultadoAPI {
    name: string;
    main: {
        temp: number,
        temp_max: number,
        temp_min: number
    };
}

export interface ClimaContextProps {
    busqueda: BusquedaPayload;
    resultado: ResultadoAPI;
    actualizarDatosBusqueda: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    consultarClima: (datos: BusquedaPayload) => void;
    cargando: boolean;
}

const ClimaContext = createContext<ClimaContextProps>({} as ClimaContextProps);

const ClimaProvider = ({ children }: PropsWithChildren) => {
    const [busqueda, setBusqueda] = useState<BusquedaPayload>({
        ciudad: "", pais: ""
    })

    const [resultado, setResultado] = useState<ResultadoAPI>({} as ResultadoAPI);
    const [cargando, setCargando] = useState(false);

    const actualizarDatosBusqueda = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const consultarClima = async (datos: BusquedaPayload) => {
        setCargando(true)

        try {
            const { ciudad, pais } = datos;
            const appId = import.meta.env.VITE_API_KEY

            const urlGeolocalizacion = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&appid=${appId}`
            const { data } = await axios.get(urlGeolocalizacion)

            const { lat, lon } = data[0]

            const urlRequestClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data : datosClima } = await axios.get(urlRequestClima)
            /* console.log(datosClima); */

            setResultado(datosClima)
        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false)
        }
    }

    /* consultarClima({ ciudad: "Mendoza", pais: "Argentina" }) */

    return (
        < ClimaContext.Provider value={
            {
                busqueda,
                resultado,
                actualizarDatosBusqueda,
                consultarClima,
                cargando
            }}
        > {children}
        </ ClimaContext.Provider>
    )
}

export { ClimaProvider }
export default ClimaContext