import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx';
import { formatearDinero, calcTotalPagar } from './helpers'

function App() {
    const [amount, setAmount] = useState(10000);
    const [months, setMonths] = useState(6);
    const [total, setTotal] = useState(0);
    const [pago, setPago] = useState(0)

    useEffect(() => {
        const resultTotalPagar = calcTotalPagar(amount, months)
        setTotal(resultTotalPagar)

        // Calcular pago
        setPago(total/months)
        console.log();
    }, [amount, months, total])

    const MIN = 0;
    const MAX = 20000;
    const STEP = 100;


    // nombrar handle a las funciones que manipulen eventos.
    const handleChange = e => {
        setAmount(+e.target.value);
    }

    const handleClickDecrement = () => {
        const value = amount - STEP
      
        if (value < MIN) {
          alert('Cantidad no válida')
          return
        }

      setAmount(value)
    }
    
    const handleClickIncrement = () => {
      const value = amount + STEP

      if (value > MAX) {
        alert('Cantidad no válida')
        return
      }

      setAmount(value)
    }

    return (
        <div className='my-20 max-w-lg mx-auto bg-white shadow p-10'>
            <Header />
            <div className='flex justify-between my-6'>
                <Button 
                    operator="-"
                    fn={handleClickDecrement}
                    />
                <Button 
                    operator="+"
                    fn={handleClickIncrement}
                />
            </div>

            <input 
                type="range" 
                className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
                onChange={handleChange}
                min={MIN}
                max={MAX}
                step={STEP}
                value={amount}
            />

            <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
                {formatearDinero(amount)} USD
            </p>

            <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
                Elige un <span className='text-indigo-600'>plazo</span> a pagar
            </h2>

            <select 
                className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500" 
                value={months}
                onChange={ e => setMonths(+e.target.value)}>
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
            </select>

            <div className='my-5 space-y-3 bg-gray-50 p-5'>
                <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
                    Resumen de <span className='text-indigo-600'>pagos</span>
                </h2>
                <p className='text-xl text-gray-500 text-center font-bold'>{months} meses</p>
                <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
                <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Mensuales</p>
            </div>
          
        </div>
    )
}

export default App
