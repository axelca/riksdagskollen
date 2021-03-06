import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline, Grid, Hidden } from "@material-ui/core";
import Sticky from "react-sticky-el";

import * as actionCreators from "./store/actions/actions";

import Filter from "./components/Filter";
import FilterDrawer from "./components/FilterDrawer";
import Loading from "./components/Loading";
import Summary from "./components/Summary";
import Table from "./components/Table";
import TopBar from "./components/TopBar";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  sticky: {
    paddingTop: 40
  }
}));

const App = () => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const { filter, filteredItems, items } = data;
  const classes = useStyles();

  useEffect(() => {
    dispatch(actionCreators.fetchData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actionCreators.filterData(items));
  }, [items, filter, dispatch]);

  useEffect(() => {
    dispatch(actionCreators.setAverageAge(filteredItems));
    dispatch(actionCreators.setGenderDistribution(filteredItems));
    dispatch(actionCreators.setPartyDistribution(filteredItems));
  }, [filteredItems, dispatch]);

  return (
    <>
      <CssBaseline />
      <TopBar />
      <FilterDrawer />
      <Container>
        {items && items.length > 0 ? (
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {filteredItems && filteredItems.length > 0 ? (
                  <Summary />
                ) : (
                  <Summary loading />
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Hidden smDown implementation="css">
                  {items && items.length > 0 ? (
                    <Sticky className={classes.sticky}>
                      <Filter />
                    </Sticky>
                  ) : null}
                </Hidden>
              </Grid>
              <Grid item xs={12} md={9}>
                <Table />
              </Grid>
            </Grid>
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

export default App;
