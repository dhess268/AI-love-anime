import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function UserAnimeList({ anime }) {
  function renderAnime() {
    return anime.map((row) => (
      <TableRow
        key={row.malId}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">{row.score || 'Completed'}</TableCell>
      </TableRow>
    ));
  }

  return anime.length ? (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 285,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Anime</TableCell>
              <TableCell align="right">User Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderAnime()}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  ) : (
    <div>Enter in new MAL username or get anime list from logged in user</div>
  );
}

UserAnimeList.propTypes = {
  anime: PropTypes.array,
};
