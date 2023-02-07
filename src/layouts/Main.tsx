import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import { ComponentType, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {
  RouteProps,
  Route,
  NavLink,
  RouteChildrenProps,
} from 'react-router-dom';
import { allData } from '../store';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
interface IMainProps {
  children: ReactNode;
}

interface IRouteMainLayoutWrapper extends RouteProps {
  component: ComponentType<RouteChildrenProps>;
}

const Main = ({ children }: IMainProps) => {
  const { currentData } = useSelector(allData);

  const { IsDayTime } = currentData;

  return (
    <>
      <Box
        sx={{
          flowGrow: 1,
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: IsDayTime ? '#2D83C6' : '#03132C',
          }}
        >
          <Toolbar>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Typography variant="h6">Cities Weather</Typography>
              </Grid>
              <Grid item>
                <NavLink to="/">
                  <Button
                    style={{ color: 'white' }}
                    variant="outlined"
                    startIcon={<HomeIcon />}
                  >
                    Home
                  </Button>
                </NavLink>
                <NavLink to="/Favorites">
                  <Button
                    style={{ color: 'white' }}
                    variant="outlined"
                    startIcon={<FavoriteIcon />}
                  >
                    Favorites
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <>{children}</>
    </>
  );
};

const MainLayoutWrapper = ({
  component: Component,
  ...rest
}: IRouteMainLayoutWrapper) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Main {...props}>
          <Component {...props} />
        </Main>
      )}
    />
  );
};

export default MainLayoutWrapper;
