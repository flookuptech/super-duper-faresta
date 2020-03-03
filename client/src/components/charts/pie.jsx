import React, { Fragment, Component } from "react";
import { ResponsivePie } from "@nivo/pie";

class PieChart extends Component {
  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          sortByValue={true}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableRadialLabels={false}
          padAngle={2}
          radialLabelsTextXOffset={6}
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: "color" }}
          slicesLabelsTextColor="#000"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#000",
              symbolSize: 20,
              symbolShape: "circle"
            }
          ]}
        />
      </Fragment>
    );
  }
}

export default PieChart;
