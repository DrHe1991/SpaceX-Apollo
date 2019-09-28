import React, { Component } from 'react'

export class MissonKey extends Component {
  render() {
    return (
      <div className="my-3">
        <p>
            <span className="px-3 mr-2 bg-success"></span> = Success
        </p>
        <p>
            <span className="px-3 mr-2 bg-danger"></span> = Fail
        </p>
        <p>
            <span className="px-3 mr-2 bg-warning"></span> = Scheduled
        </p>
      </div>
    )
  }
}

export default MissonKey
