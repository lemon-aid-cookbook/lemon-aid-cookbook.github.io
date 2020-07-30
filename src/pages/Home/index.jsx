import React from "react";
import { Container } from "@material-ui/core";
import AppHeader from "../../components/Header/AppHeader";
import SearchForm from "./components/SearchForm";
import ListCollection from "./components/ListCollection";
import ListPopular from "./components/ListPopular";
import ListNews from "./components/ListNews";

export default () => {
  return (
    <>
      <AppHeader from="home" />
      <SearchForm />
      <Container>
        <ListCollection />
        <ListPopular />
        <ListNews />
      </Container>
    </>
  );
};
