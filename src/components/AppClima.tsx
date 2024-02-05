import { useClima } from "../hooks/useClima"
import Formulario from "./Formulario"
import Resultado from "./Resultado"

const AppClima = () => {
  const { resultado, cargando } = useClima()

  return (

      <main className="dos-columnas">
        <Formulario />
        {
          cargando ? <p>Cargando...</p> :
          resultado.name ? <Resultado /> : <p>No hubo resultados</p>
        }

      </main>

  )
}

export default AppClima