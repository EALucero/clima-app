import { useClima } from "../hooks/useClima"

const Resultado = () => {
    const { resultado: { name, main } } = useClima()
    const kelvin = 273.15

    return (
        <div className="contenedor clima">
            <h2>El Clima de {name} es: </h2>
            <p>
                {Math.trunc(main?.temp - kelvin)} <span>&#x2103;</span>
            </p>
            <div className="temp_min_max">
                <p>
                    Mín: {Math.trunc(main?.temp_min - kelvin)} <span>&#x2103;</span>
                </p>
                <p>
                    Máx: {Math.trunc(main?.temp_max - kelvin)} <span>&#x2103;</span>
                </p>
            </div>
        </div>
    )
}

export default Resultado