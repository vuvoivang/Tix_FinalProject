
import React from 'react'
import "./style.css"
export default function Loading() {
    return (
        <div>
            <div className="wrap">
                <div className="loading">
                    <div className="bounceball" />
                    <div className="text">NOW LOADING</div>
                </div>
            </div>
        </div>

    )
}