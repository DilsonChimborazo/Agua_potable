import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filtro = () => {
    const [valorTurbidez, setValorTurbidez] = useState('');
    const [valorNitratos, setValorNitratos] = useState('');
    const [valorFluoruros, setValorFluoruros] = useState('');
    const [valorArsenico, setValorArsenico] = useState('');
    const [valorMercurio, setValorMercurio] = useState('');
    const [valorPlomo, setValorPlomo] = useState('');
    const [prueba, setPrueba] = useState([]);

    useEffect(() => {
        const pruebaGuardada = JSON.parse(localStorage.getItem('Prueba')) || [];
        setPrueba(pruebaGuardada);
    }, []);

    useEffect(() => {
        localStorage.setItem('Prueba', JSON.stringify(prueba));
    }, [prueba]);

    const idealRanges = {
        turbidez: { max: 1 },
        nitratos: { max: 10 },
        fluoruros: { max: 1.5 },
        arsenico: { max: 0.01 },
        mercurio: { max: 0.006 },
        plomo: { max: 0.01 },
    };

    const datos = (e) => {
        e.preventDefault();

        const proceso = [
            { elemento: 'Turbidez', valorIngresado: valorTurbidez, valorFiltrado: Math.min(valorTurbidez, idealRanges.turbidez.max), fueraDeRango: valorTurbidez > idealRanges.turbidez.max },
            { elemento: 'Nitratos', valorIngresado: valorNitratos, valorFiltrado: Math.min(valorNitratos, idealRanges.nitratos.max), fueraDeRango: valorNitratos > idealRanges.nitratos.max },
            { elemento: 'Fluoruros', valorIngresado: valorFluoruros, valorFiltrado: Math.min(valorFluoruros, idealRanges.fluoruros.max), fueraDeRango: valorFluoruros > idealRanges.fluoruros.max },
            { elemento: 'Arsénico', valorIngresado: valorArsenico, valorFiltrado: Math.min(valorArsenico, idealRanges.arsenico.max), fueraDeRango: valorArsenico > idealRanges.arsenico.max },
            { elemento: 'Mercurio', valorIngresado: valorMercurio, valorFiltrado: Math.min(valorMercurio, idealRanges.mercurio.max), fueraDeRango: valorMercurio > idealRanges.mercurio.max },
            { elemento: 'Plomo', valorIngresado: valorPlomo, valorFiltrado: Math.min(valorPlomo, idealRanges.plomo.max), fueraDeRango: valorPlomo > idealRanges.plomo.max },
        ];

        setPrueba((Filtros) => [...Filtros, proceso].slice(-5));
        setValorTurbidez('');
        setValorNitratos('');
        setValorFluoruros('');
        setValorArsenico('');
        setValorMercurio('');
        setValorPlomo('');
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
                            step="0.001"
                            placeholder="Ingrese el valor"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label><b>Nitratos</b>:</label>
                        <input type="number" value={valorNitratos} onChange={(e) => setValorNitratos(parseFloat(e.target.value))} step="0.001" placeholder="Ingrese el valor" className="form-control"
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Fluoruros</b>:</label>
                        <input type="number" value={valorFluoruros} onChange={(e) => setValorFluoruros(parseFloat(e.target.value))} step="0.001" placeholder="Ingrese el valor" className="form-control"
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Arsénico</b>:</label>
                        <input type="number" value={valorArsenico} onChange={(e) => setValorArsenico(parseFloat(e.target.value))} step="0.001" placeholder="Ingrese el valor" className="form-control"
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Mercurio</b>:</label>
                        <input type="number" value={valorMercurio} onChange={(e) => setValorMercurio(parseFloat(e.target.value))} step="0.001" placeholder="Ingrese el valor" className="form-control"
                        />
                    </div>
                    <div className="col-md-6 mt-3">
                        <label><b>Plomo</b>:</label>
                        <input type="number" value={valorPlomo} onChange={(e) => setValorPlomo(parseFloat(e.target.value))} step="0.001" placeholder="Ingrese el valor" className="form-control"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Evaluar Prueba</button>
            </form>

            <h2 className="mt-5">Resultados de las Pruebas</h2>
            <table className="table mt-3 border-5">
                <thead className='table-primary'>
                    <tr>
                        <th>Elemento</th>
                        <th>Valor Ingresado</th>
                        <th>Valor Filtrado</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {prueba.length > 0 ? (
                        prueba.map((test, i) => (
                            <React.Fragment key={i}>
                                {test.map((element, j) => (
                                    <tr key={j}>
                                        <td>{element.elemento}</td>
                                        <td>{element.valorIngresado}</td>
                                        <td>{element.valorFiltrado}</td>
                                        <td>{element.fueraDeRango ? 'No está en el rango ideal' : 'Está en el rango ideal'}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3" className="text-center font-weight-bold">
                                        Resultado:
                                    </td>
                                    <td className='bg-secondary text-white'>
                                        {test.some((el) => el.fueraDeRango) ? 'No Potable' : 'Potable'}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay pruebas registradas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Filtro;
