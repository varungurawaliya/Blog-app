import React from "react"

export default function button ({
    children,
    type = 'button',
    bgColor = "bg-[#ee4540]",
    textColor = "text-white",
    className = "",
    ...props
}) 

{
    return(
        <button className= {`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
    )
}