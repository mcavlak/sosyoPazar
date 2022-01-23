import React from 'react'

const SuspenseFallback = () => {
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <p>
                Yükleniyor
            </p>

        </div>
    )
}

export default SuspenseFallback