import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { weatherActions } from '../store/slices/weather';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { AppDispatch } from '../store';

const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const DegreesSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    overflow: 'hidden',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(data:image/png;base64,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)`,
        backgroundSize: 'contain',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEYm9tQOrdE5m_2TCPodDG7j4KDmzAQawdqw&usqp=CAU)`,
      backgroundSize: 'contain',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const SwitchButton: React.FC<{ isDarkMode: boolean }> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const degreesToggleHandler = () => {
    dispatch(weatherActions.temperatureToggle());
  };

  return (
    <FormGroup>
      <FormControlLabel
        onChange={degreesToggleHandler}
        control={
          props.isDarkMode ? (
            <DarkModeSwitch sx={{ m: 1 }} defaultChecked />
          ) : (
            <DegreesSwitch sx={{ m: 1 }} defaultChecked />
          )
        }
        label=""
      />
    </FormGroup>
  );
};

export default SwitchButton;
