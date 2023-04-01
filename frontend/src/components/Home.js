import { Fragment } from 'react';
import AnimeListInput from './AnimeListInput';
import Login from './Login';
import Header from './Header';

export default function Home() {
  return (
    <>
      <Header />
      <AnimeListInput />
    </>
  );
}
