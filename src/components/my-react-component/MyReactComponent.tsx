import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

import './MyReactComponent.scss';
import * as ReactDOM from 'react-dom';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export interface IMyComponentProps {
  counter: number;
  onClick?: () => void;
}

const dataSource = {
  chart: {
    caption: 'Countries With Most Oil Reserves [2017-18]',
    subCaption: 'In MMbbl = One Million barrels',
    xAxisName: 'Country',
    yAxisName: 'Reserves (MMbbl)',
    numberSuffix: 'K',
    theme: 'fusion'
  },
  data: [
    { label: 'Venezuela', value: '290' },
    { label: 'Saudi', value: '260' },
    { label: 'Canada', value: '180' },
    { label: 'Iran', value: '140' },
    { label: 'Russia', value: '115' },
    { label: 'UAE', value: '100' },
    { label: 'US', value: '30' },
    { label: 'China', value: '30' }
  ]
};

const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: dataSource
};

export const MyReactComponent: FunctionComponent<IMyComponentProps> = (props: IMyComponentProps) => {

  const timerHandle = useRef<number | null>(null);
  const [stateCounter, setStateCounter] = useState(42);

  useEffect(() => {
    timerHandle.current = +setInterval(() => {
      setStateCounter(stateCounter + 1);
    }, 2500);

    return () => {
      if (timerHandle.current) {
        clearInterval(timerHandle.current);
        timerHandle.current = null;
      }
    };
  });

  const {counter: propsCounter, onClick} = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return <div className={`my-graph-component`}>
    <div className={'comp-props'}>Props counter: {propsCounter}
      <span onClick={handleClick}
            className={'increase-button'}>click to increase</span>
    </div>
    <div className={'comp-state'}>State counter: {stateCounter}</div>
    <ReactFC {...chartConfigs} />
  </div>;
};
