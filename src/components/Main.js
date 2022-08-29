import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <h1>Add Student</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.studentName.value;
            const fees = window.web3.utils.toWei(
              this.studentFees.value.toString(),
              "Ether"
            );
            this.props.createStudent(name, fees);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="studentName"
              type="text"
              ref={(input) => {
                this.studentName = input;
              }}
              className="form-control"
              placeholder="Student Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="studentFees"
              type="text"
              ref={(input) => {
                this.studentFees = input;
              }}
              className="form-control"
              placeholder="Fees Amount"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Student
          </button>
        </form>
        <p>&nbsp;</p>
        <h2>Fees Payment</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student Name</th>
              <th scope="col">Fees Amt.</th>
              <th scope="col">Address</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.students.map((student, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{student.id.toString()}</th>
                  <td>{student.name}</td>
                  <td>
                    {window.web3.utils.fromWei(
                      student.price.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </td>
                  <td>{student.owner}</td>
                  <td>
                    {!student.paid ? (
                      <button
                        name={student.id}
                        value={student.price}
                        onClick={(event) => {
                          this.props.PayFees(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        Pay Fees.
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
