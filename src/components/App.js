import React, { Component } from "react";
import Web3 from "web3";
import logo from "../logo.png";
import "./App.css";
import University from "../abis/University.json";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = University.networks[networkId];
    if (networkData) {
      const university = web3.eth.Contract(University.abi, networkData.address);
      this.setState({ university });
      const studentCount = await university.methods.studentCount().call();
      this.setState({ studentCount });
      // Load products
      for (var i = 1; i <= studentCount; i++) {
        const student = await university.methods.students(i).call();
        this.setState({
          students: [...this.state.students, student],
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      studentCount: 0,
      students: [],
      loading: true,
    };

    this.createStudent = this.createStudent.bind(this);
    this.PayFees = this.PayFees.bind(this);
  }

  createStudent(name, fees) {
    this.setState({ loading: true });
    this.state.university.methods
      .createStudent(name, fees)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  PayFees(id, fees) {
    this.setState({ loading: true });
    this.state.university.methods
      .PayFees(id)
      .send({ from: this.state.account, value: fees })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <Main
                  students={this.state.students}
                  createStudent={this.createStudent}
                  PayFees={this.PayFees}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
