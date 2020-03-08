import React from "react";
import "./App.css";
import Game from "./game";
import logo from "./logo2.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.game = new Game();
  }
  state ={isVisibleWorker: true}
  componentDidMount() {
    setInterval(() => {
      this.game.update();
      this.setState({});
    }, 100);
  }

  update = () => {
    this.game.update();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header"><img style={{ width: "50px" }} src={logo} alt=""/> <h1>Qelyanxana</h1></header>
        <div style={{ marginBottom: "12px",display:"flex",justifyContent: "space-between"  }}>
          Ümumi Qelyanlar: {this.game.manufacturedCigKofte} <br />
          <button disabled={!this.game.canMakeCigKofte()} onClick={() => this.game.makeCigKofte()}>
            Qəlyan Hazirla
          </button>
        </div>
        <div>
          <div>İşletme</div>
          <hr />
          <div>
            <table>
              <tr>
                <td style={{ width: "150px" }}>Kassa :</td><td>{this.game.money}Azn</td>
              </tr>
              <tr>
                <td>Hazır Qəlyanlar:</td><td>{this.game.currentCigKofte}</td>
              </tr>
              <tr>
                <td>Qiymət:</td>
                <td>
                  {this.game.price}Azn
                  <button
                    disabled={!this.game.canDecreasePrice()}
                    style={{ marginLeft: "20px" }}
                    onClick={this.game.decreasePrice}
                  >
                    -
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={this.game.increasePrice}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td>Bazar Tələbi:</td>
                <td>%{this.game.demandRate}</td>
              </tr>
            </table>
          </div>
          <div style={{ marginTop: "16px" }}>
            <hr/>
            <div>istehsal</div>
            <hr />

            <table>
              <tr>
                <td style={{ width: "100px" }}>Qəlyan / saat:</td>
                <td>{this.game.lastManufacturedRate}</td>
              </tr>
              <tr>
                <td>Tütün:</td>
                <td>
                  {this.game.material} qr
                  <button
                    style={{ marginLeft: "10px" }}
                    disabled={!this.game.canBuyMaterial()}
                    onClick={this.game.buyMaterial}
                  >
                     Al! ({this.game.materialCost}₺)
                  </button>
                </td>
              </tr>
              <tr>
                <td>Menecer :</td>
                <td>
                  {this.game.hasAutoBuyer ? (
                    <React.Fragment>
                      {this.game.isAutoBuyerActive ? "Aktif" : "Durdu"}
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={
                          this.game.isAutoBuyerActive
                            ? this.game.stopAutoBuyer
                            : this.game.startAutoBuyer
                        }
                      >
                        {this.game.isAutoBuyerActive ? "İcaze verme" : "İcaze ver"}
                      </button>
                    </React.Fragment>
                  ) : (
                    <span>
                      Yox
                      {this.game.didUnlockAutoBuyer() && (
                        <button
                          style={{ marginLeft: "10px" }}
                          disabled={!this.game.canBuyAutoBuyer()}
                          onClick={this.game.buyAutoBuyer}
                        >
                           Al! ({this.game.autoBuyerCost}₺)
                        </button>
                      )}
                    </span>
                  )}
                </td>
              </tr>
            </table>

            <div style={{ marginTop: "16px" }}>
              <div>İşçilər:</div>
              <hr />
              <table>
                <tr>
                  <td>Sadə Qəlyançı:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.errandBoy}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("ERRAND_BOY")}
                      onClick={() => this.game.buyAutoGenerator("ERRAND_BOY")}
                    >
                       İşə Al! ({this.game.autoGenerators.errandBoyCost}₺)
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Afisant:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.foreman}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("FOREMAN")}
                      onClick={() => this.game.buyAutoGenerator("FOREMAN")}
                    >
                      İşə Al! ({this.game.autoGenerators.foremanCost}₺)
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Usta:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.master}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("MASTER")}
                      onClick={() => this.game.buyAutoGenerator("MASTER")}
                    >
                      İşə Al! ({this.game.autoGenerators.masterCost}₺)
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// 1 cig kofte
// 1 lira = talep tavan = 100%
// 40 lira = talep min = 0%
