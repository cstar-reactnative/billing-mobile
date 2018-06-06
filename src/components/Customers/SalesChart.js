import React from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

const data = {
  dataSets: [{
    values: [{ y: 2200 }, { y: 1300 }, { y: 2700 }, { y: 1500 }],
    label: 'Sales',
    config: {
      lineWidth: 3,
      drawCubicIntensity: 0.4,
      drawValues: false,
      circleRadius: 5,
      color: processColor('white'),
      drawFilled: true,
      fillColor: processColor('white'),
      fillAlpha: 45,
      circleColor: processColor('white')
    }
  }]
};

const xAxis = {
  valueFormatter: ['JAN', 'FEB', 'MAR', 'APR'],
  position: 'bottom',
  textColor: processColor('white'),
  gridColor: processColor('#53a8e5'),
  gridLineWidth: 1.5
};

const yAxis = {
  right: {
    enabled: false
  },
  left: {
    axisMaximum: 4000,
    axisMinimum: 0,
    textColor: processColor('white'),
    gridColor: processColor('#53a8e5'),
    gridLineWidth: 1.5
  }
};

export default () => (
  <View style={{ flex: 1 }}>
    <LineChart
      style={styles.chart}
      data={data}
      chartDescription={{ text: '' }}
      legend={{ enabled: false }}
      marker={{ enabled: false }}
      xAxis={xAxis}
      yAxis={yAxis}
      drawGridBackground={false}
      drawBorders={false}
      touchEnabled={false}
      keepPositionOnRotation={false}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1,
    height: 170
  }
});
