import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Filtro = () => {
    const [valorTurbidez, setValorTurbidez] = useState('')
    const [valorNitratos, setValorNitratos] = useState('')
    const [valorFluoruros, setValorFluoruros] = useState('')
    const [valorArsenico, setValorArsenico] = useState('')
    const [valorMercurio, setValorMercurio] = useState('')
    const [valorPlomo, setValorPlomo] = useState('')
    const [prueba, setPrueba] = useState([])

    useEffect(() => {
        const pruebaGuardada = JSON.parse(localStorage.getItem('Prueba')) || []
        setPrueba(pruebaGuardada)
    }, [])

    useEffect(() => {
        localStorage.setItem('Prueba', JSON.stringify(prueba))
    }, [prueba])

    const rango = {
        turbidez: { max: 1 },
        nitratos: { max: 10 },
        fluoruros: { max: 1.5 },
        arsenico: { max: 0.01 },
        mercurio: { max: 0.006 },
        plomo: { max: 0.01 },
    }

    const datos = (e) => {
        e.preventDefault()

        const proceso = [
            { elemento: 'Turbidez', valorIngresado: valorTurbidez, valorFiltrado: Math.min(valorTurbidez, rango.turbidez.max), fueraDeRango: valorTurbidez > rango.turbidez.max },
            { elemento: 'Nitratos', valorIngresado: valorNitratos, valorFiltrado: Math.min(valorNitratos, rango.nitratos.max), fueraDeRango: valorNitratos > rango.nitratos.max },
            { elemento: 'Fluoruros', valorIngresado: valorFluoruros, valorFiltrado: Math.min(valorFluoruros, rango.fluoruros.max), fueraDeRango: valorFluoruros > rango.fluoruros.max },
            { elemento: 'Arsénico', valorIngresado: valorArsenico, valorFiltrado: Math.min(valorArsenico, rango.arsenico.max), fueraDeRango: valorArsenico > rango.arsenico.max },
            { elemento: 'Mercurio', valorIngresado: valorMercurio, valorFiltrado: Math.min(valorMercurio, rango.mercurio.max), fueraDeRango: valorMercurio > rango.mercurio.max },
            { elemento: 'Plomo', valorIngresado: valorPlomo, valorFiltrado: Math.min(valorPlomo, rango.plomo.max), fueraDeRango: valorPlomo > rango.plomo.max },
        ]

        setPrueba((Filtros) => [...Filtros, proceso].slice(-5))
        setValorTurbidez('')
        setValorNitratos('')
        setValorFluoruros('')
        setValorArsenico('')
        setValorMercurio('')
        setValorPlomo('')
    };

    return (
        <div className="container my-5 text-white">
            <form onSubmit={datos} className='shadow-lg p-5 bg-success rounded-5'>
            <h1 className="text-center mb-4">Calidad del Agua</h1>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label><b>Turbidez</b>:</label>
                        <input
                            type="number"
                            value={valorTurbidez}
                            onChange={(e) => setValorTurbidez(parseFloat(e.target.value))}
                            placeholder="Ingrese el valor"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label><b>Nitratos</b>:</label>
                        <input type="number" value={valorNitratos} onChange={(e) => setValorNitratos(parseFloat(e.target.value))} placeholder="Ingrese el valor" className="form-control"/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Fluoruros</b>:</label>
                        <input type="number" value={valorFluoruros} onChange={(e) => setValorFluoruros(parseFloat(e.target.value))} placeholder="Ingrese el valor" className="form-control"/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Arsénico</b>:</label>
                        <input type="number" value={valorArsenico} onChange={(e) => setValorArsenico(parseFloat(e.target.value))} placeholder="Ingrese el valor" className="form-control"/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Mercurio</b>:</label>
                        <input type="number" value={valorMercurio} onChange={(e) => setValorMercurio(parseFloat(e.target.value))} placeholder="Ingrese el valor" className="form-control"/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Plomo</b>:</label>
                        <input type="number" value={valorPlomo} onChange={(e) => setValorPlomo(parseFloat(e.target.value))} placeholder="Ingrese el valor" className="form-control"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Evaluar Prueba</button>
            </form>

            <h2 className="mt-5">Resultados de las Pruebas</h2>
            <table className="table mt-3 border-5">
                <thead className='table-primary'>
                    <tr>
                        <th>Elemento</th>
                        <th>Valor que ingresa</th>
                        <th>Valor que sale</th>
                    </tr>
                </thead>
                    {prueba.length > 0 ? (
                        prueba.map((test, i) => (
                            <tbody key={i}>
                                {test.map((elemento, j) => (
                                    <tr key={j}>
                                        <td>{elemento.elemento}</td>
                                        <td>{elemento.valorIngresado}</td>
                                        <td>{elemento.valorFiltrado}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2" className="text-end px-5 font-weight-bold">El agua es:</td>
                                    <td className="bg-secondary text-white fs-5">
                                        <b>Potable</b>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center text-dark">No hay pruebas registradas</td>
                        </tr>
                    )}
            </table>
        </div>
    )
}

export default Filtro;
