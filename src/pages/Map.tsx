import { Button, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const Map = () => {
  return (
    <div>
      <div className='grid grid-cols-4 mt-8 items-center'>
        <div className='font-bold text-4xl text-blue-500 ml-6'>MASJIB</div>
        <div className='col-span-2'>
          <TextField
            id='outlined-basic'
            label='Category'
            variant='outlined'
            sx={{
              width: '45%'
            }}
          />
          <TextField
            id='outlined-basic'
            label='Location'
            variant='outlined'
            sx={{
              width: '45%'
            }}
          />
          <Button variant='outlined' sx={{ height: '3.55em' }}>
            <SearchIcon />
          </Button>
        </div>
        <Button
          variant='outlined'
          sx={{
            textAlign: 'center',
            width: '30%',
            height: '3em',
            color: 'white',
            marginLeft: '30%',
            backgroundColor: '#3B82F6',
            borderColor: '#3B82F6',
            fontFamily: 'bold',
            fontSize: '1.0em',
            ':hover': {
              backgroundColor: '#3B82F6',
              color: 'white'
            }
          }}
        >
          Log In
        </Button>
      </div>
      <div>
        {/*여기가 위에 상단바 밑에 구성*/}
        Map & Categories
      </div>
    </div>
  );
};
export default Map;
