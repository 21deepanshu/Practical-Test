import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "60vh" }}
  >
    <Spinner
      animation="border"
      role="status"
      style={{ width: "6rem", height: "6rem" }}
    ></Spinner>
  </div>
  )
}

export default Loader