import React, { useEffect, useState } from 'react'
import { Cities } from '../../Pages/Register/Cities'

export const CitiesAutoComplete = ({ city, setcity }: { city: string, setcity: any }) => {

    const [flim, setflim] = React.useState(false)
    const [cit, setc] = useState<string[]>([...Cities.map((city) => city.name)])

    const Hash$Filter = (val: string) => {
        let cities: string[] = []
        Cities.filter((c) => {
            if (c.name.toLowerCase().includes(val.toLowerCase())) {
                cities.push(c.name)
            }
            setc(cities)
            // console.log(city)
        })
    }


    return (
        <div className=''>
            {
                flim && <div className='h-screen w-screen overflow-auto text-center absolute top-0 left-0'>
                    <div className='bg-black'>
                        <input className='m-6 p-2 w-[60vw] rounded-2xl outline-none bg-white text-black opacity-100' onChange={(event) => Hash$Filter(event.target.value)} />
                    </div>
                    <div className='min-h-screen bg-black opacity-90 flex flex-col gap-2'>
                        {
                            cit.sort().map((c) => {
                                return <p onClick={() => { setcity(c); setflim(false) }} className='text-white'>{c}</p>
                            })
                        }
                    </div>
                </div>
            }
            {
                <>
                    <div onClick={() => { setc([...Cities.map((city) => city.name)]); setflim(true) }} className='w-[20vw] bg-white p-1 rounded'>{city !== "" ? city : "Select City"}</div>
                </>
            }
        </div>
    )
}