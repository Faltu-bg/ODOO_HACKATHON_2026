const Settings = () => {


const roles = [
{
role:"Fleet Manager",
fleet:"Full",
drivers:"Full",
trips:"None",
fuel:"None",
analytics:"Full"
},
{
role:"Dispatcher",
fleet:"View",
drivers:"None",
trips:"Full",
fuel:"None",
analytics:"None"
},
{
role:"Safety Officer",
fleet:"None",
drivers:"Full",
trips:"View",
fuel:"None",
analytics:"None"
},
{
role:"Financial Analyst",
fleet:"View",
drivers:"None",
trips:"None",
fuel:"Full",
analytics:"Full"
}
];


const accessStyle = {
Full:"bg-green-500 text-black",
View:"bg-blue-500 text-black",
None:"bg-gray-700 text-gray-300"
};



return (

<div className="min-h-screen bg-[#111] text-white p-8">


<div className="grid grid-cols-2 gap-12">



{/* GENERAL SETTINGS */}

<div>

<h2 className="text-gray-300 text-sm mb-5">
GENERAL
</h2>


<div className="space-y-5">


<div>
<label className="text-xs text-gray-500">
DEPOT NAME
</label>

<select
className="
w-full
mt-2
bg-[#111]
border
border-gray-700
rounded-md
px-4
py-2
outline-none">

<option>Gandhinagar Depot GT4</option>
<option>Ahmedabad Depot A1</option>
<option>Surat Depot S2</option>
<option>Mumbai Depot M5</option>

</select>

</div>




<div>

<label className="text-xs text-gray-500">
CURRENCY
</label>


<select
className="
w-full
mt-2
bg-[#111]
border
border-gray-700
rounded-md
px-4
py-2">

<option>INR (₹)</option>
<option>USD ($)</option>
<option>EUR (€)</option>

</select>

</div>





<div>

<label className="text-xs text-gray-500">
DISTANCE UNIT
</label>


<select
className="
w-full
mt-2
bg-[#111]
border
border-gray-700
rounded-md
px-4
py-2">


<option>Kilometers</option>
<option>Miles</option>


</select>


</div>




<button
className="
bg-blue-500
text-black
px-10
py-2
rounded-md
hover:bg-blue-400">

Save Changes

</button>



</div>

</div>






{/* RBAC */}

<div>


<h2 className="text-gray-300 text-sm mb-5">
ROLE-BASED ACCESS (RBAC)
</h2>



<table className="w-full text-sm">


<thead className="
text-gray-400
border-b
border-gray-800">


<tr>

<th className="text-left py-3">
ROLE
</th>

<th>
FLEET
</th>

<th>
DRIVERS
</th>

<th>
TRIPS
</th>

<th>
FUEL/EXP.
</th>

<th>
ANALYTICS
</th>


</tr>

</thead>



<tbody>


{
roles.map((item,index)=>(


<tr
key={index}
className="
border-b
border-gray-800">


<td className="py-4">
{item.role}
</td>


<td className="text-center">

<span
className={`
px-3
py-1
rounded-md
text-xs
${accessStyle[item.fleet]}
`}>

{item.fleet}

</span>

</td>



<td className="text-center">

<span
className={`
px-3
py-1
rounded-md
text-xs
${accessStyle[item.drivers]}
`}>

{item.drivers}

</span>

</td>




<td className="text-center">

<span
className={`
px-3
py-1
rounded-md
text-xs
${accessStyle[item.trips]}
`}>

{item.trips}

</span>

</td>




<td className="text-center">

<span
className={`
px-3
py-1
rounded-md
text-xs
${accessStyle[item.fuel]}
`}>

{item.fuel}

</span>

</td>




<td className="text-center">

<span
className={`
px-3
py-1
rounded-md
text-xs
${accessStyle[item.analytics]}
`}>

{item.analytics}

</span>

</td>



</tr>


))

}


</tbody>


</table>


{/* Legend */}

<div className="flex gap-5 mt-6 text-xs">


<div className="bg-green-500 text-black px-3 py-1 rounded">
Full Access
</div>


<div className="bg-blue-500 text-black px-3 py-1 rounded">
View Only
</div>


<div className="bg-gray-700 px-3 py-1 rounded">
No Access
</div>


</div>


</div>



</div>


</div>


)

}


export default Settings;