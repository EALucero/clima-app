import { FormEvent, useState } from "react"
import { useClima } from "../hooks/useClima"

const Formulario = () => {
    const { actualizarDatosBusqueda, busqueda: { ciudad, pais }, consultarClima } = useClima()
    const [alerta, setAlerta] = useState("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()

        if ([ciudad, pais].includes("")) {
            setAlerta("Todos los campos son necesarios!!")
            return
        }

        consultarClima({ ciudad, pais })
        setAlerta('')
    }

    return (
        <div className="contenedor">
            {
                alerta && <p className="bg-red-500 text-white p-[5px]"></p>
            }
            <form onSubmit={onSubmit}>
                <div className="campo">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                        type="text"
                        id="ciudad"
                        name="ciudad"
                        onChange={actualizarDatosBusqueda}
                        value={ciudad}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="pais">País</label>
                    <select
                        id="pais"
                        name="pais"
                        onChange={actualizarDatosBusqueda}
                        value={pais}
                    >
                        <option value=""> Seleccione un país</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                        <option value="CL">Chile</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value='Consultar Clima'
                />
            </form>
        </div>
    )
}

export default Formulario