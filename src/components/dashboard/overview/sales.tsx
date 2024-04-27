'use client';

import * as React from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';
import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components';

import { Chart } from '@/components/core/chart';

export interface SalesProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
}

const ChatButton = styled('div')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '60px',
  height: '60px',
  background: 'rgb(110, 72, 170)',
  color: 'white',
  borderRadius: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 1000,
});

const ChatbotContainer = styled('div')({
  position: 'fixed',
  bottom: '300px',
  right: '200px',
  width: '60px',
  height: '60px',
  background: 'rgb(110, 72, 170)',
  color: 'white',
  borderRadius: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 1000,
});

const CloseButton = styled.div`
  position: absolute;
  top: 10px; /* Adjust the position as needed */
  right: 10px; /* Adjust the position as needed */
  cursor: pointer;
  color: white;
  background-color: white;
`;

export function Sales({ chartSeries, sx }: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions();
  const [showChatbot, setShowChatbot] = React.useState(false);
  // const handleChatbotClose = () => {
  //   setShowChatbot(false);
  // };

  const chatbotContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotContainerRef.current && !chatbotContainerRef.current.contains(event.target as Node)) {
        setShowChatbot(false);
      }
      setShowChatbot(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
            Sync
          </Button>
        }
        title="Sales"
      />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type="bar" width="100%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
          Overview
        </Button>
      </CardActions>
      {showChatbot ? (
        <ChatbotContainer>
          <ChatBot
            steps={[
              {
                id: 'hello-world',
                message: 'Hi there! How can I help you today?',
                trigger: 'user-input',
              },
              {
                id: 'user-input',
                user: true,
                trigger: 'response',
              },
              {
                id: 'response',
                message: 'Thank you for your message!',
                trigger: 'another-step',
              },
              {
                id: 'another-step',
                message: 'I will get back to you soon.',
                end: true,
              },
            ]}
          />
        </ChatbotContainer>
      ) : (
        <ChatButton
          onClick={() => {
            setShowChatbot(true);
          }}
        >
          <ChatBubbleIcon fontSize="large" />
        </ChatButton>
      )}
    </Card>
  );
}

function useChartOptions(): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'solid' },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: '40px' } },
    stroke: { colors: ['transparent'], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
