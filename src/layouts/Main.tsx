import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { ComponentType, ReactNode } from 'react';
import { RouteProps, Route, NavLink } from 'react-router-dom';

interface IMainProps {
  children: ReactNode;
}

interface IRouteMainLayoutWrapper extends RouteProps {
  component: ComponentType<any>;
}

const Main = ({ children }: IMainProps) => {
  return (
    <>
      <Box
        sx={{
          flowGrow: 1,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Herolo Home Assignment!</Typography>
            <NavLink to="/">
              <Button style={{ color: 'white' }}>Home</Button>
            </NavLink>
            <NavLink to="/Favorites">
              <Button style={{ color: 'white' }}>Favorites</Button>
            </NavLink>
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
