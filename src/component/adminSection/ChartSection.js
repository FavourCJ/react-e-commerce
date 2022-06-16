import React from 'react'
import Chart from "./Chart";
import {userData} from "./dummyData"

function ChartSection() {
  return (
    <div className='chartSection-container'>
        <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
    </div>
  )
}

export default ChartSection