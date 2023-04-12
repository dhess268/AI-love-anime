import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import _ from 'lodash';

import './UserAnimeList.css';

import { Container, IconButton, Pagination } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RemoveCircle } from '@mui/icons-material';
import { addSelected, removeSelected } from '../slices/AnimeSlice';

export default function UserAnimeList() {
  const anime = useSelector((state) => state.anime.myanimelist || []);

  const selectedAnime = useSelector((state) => state.anime.selected || []);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  function renderAnime() {
    // Logic for displaying todos
    const animePerPage = 10;
    const indexOfLastAnime = page * animePerPage;
    const indexOfFirstAnime = indexOfLastAnime - animePerPage;
    const currentAnime = anime.slice(indexOfFirstAnime, indexOfLastAnime);

    return currentAnime.map((row) => {
      const inList = _.find(selectedAnime, { malId: row.malId });

      return (
        <TableRow
          key={row.malId}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            <a href={`https://myanimelist.net/anime/${row.malId}`}>
              {row.title}
            </a>
          </TableCell>
          <TableCell align="right">
            <IconButton
              color="primary"
              aria-label="add to selected anime list"
              disabled={!!inList}
              onClick={() =>
                dispatch(addSelected({ malId: row.malId, title: row.title }))
              }
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="warning"
              aria-label="add to selected anime list"
              onClick={() =>
                dispatch(removeSelected({ malId: row.malId, title: row.title }))
              }
            >
              <RemoveCircle />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  }

  function renderSelected() {
    return selectedAnime.map((selected) => (
      <Paper
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        key={selected.malId + 10}
      >
        <div className="anime__wrapper">
          <span>{selected.title}</span>
        </div>

        <IconButton
          color="warning"
          aria-label="add to selected anime list"
          onClick={() =>
            dispatch(
              removeSelected({ malId: selected.malId, title: selected.title })
            )
          }
        >
          <RemoveCircle />
        </IconButton>
      </Paper>
    ));
  }

  function renderPagination() {
    return (
      <Stack
        spacing={2}
        sx={{
          background: '#E7EBF0',
          paddingTop: '1em',
          paddingBottom: '1em',
          marginBottom: '1em',
          marginTop: '1em',
        }}
      >
        <Pagination
          count={Math.ceil(anime.length / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
    );
  }

  return anime.length ? (
    <>
      <Container
        maxWidth="md"
        sx={{
          background: '#E7EBF0',
          paddingBottom: '1em',
          marginBottom: '3em',
          marginTop: '3em',
          borderRadius: '5px',
          color: 'black',
        }}
      >
        <Stack spacing={2} direction="column" maxWidth="md" alignItems="center">
          <h2>Selected Anime List</h2>
          {renderSelected()}
        </Stack>
      </Container>

      {renderPagination()}
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 285,
            background: '#E7EBF0',
            color: 'white',
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Anime</TableCell>
              <TableCell align="right">Select or Unselect</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{renderAnime()}</TableBody>
        </Table>
      </TableContainer>
      {renderPagination()}
    </>
  ) : (
    <div className="loading__div">Enter in MAL username to fetch a list</div>
  );
}

UserAnimeList.propTypes = {};
