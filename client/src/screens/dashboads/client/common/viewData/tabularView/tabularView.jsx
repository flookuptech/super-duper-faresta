import React, { Component, Fragment } from "react";
import { Grid, IconButton } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import JsonTable from "ts-react-json-table";
import Fullscreen from "react-full-screen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import UploadDataTable from "../../../senior/components/uploadData/uploadDataTable";

class TabularView extends Component {
  state = {
    isFull: false
  };

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };
  exitFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };

  render() {
    const { data, user } = this.props;
    const { isFull } = this.state;
    return (
      <Fragment>
        <Grid>
          <Grid item>
            <IconButton onClick={this.exitFull}>
              <FullscreenIcon />
            </IconButton>
          </Grid>
          <Grid item className="fullscreen-scroll">
            <Fullscreen
              enabled={isFull}
              onChange={isFull => this.setState({ isFull })}
            >
              <div id="screen" style={{ backgroundColor: "white" }}>
                {isFull && (
                  <IconButton onClick={this.exitFull}>
                    <FullscreenExitIcon />
                  </IconButton>
                )}
                <UploadDataTable data={data} user={user}/>
              </div>
            </Fullscreen>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default TabularView;
