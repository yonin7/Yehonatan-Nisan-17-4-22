import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: '123456',
      day: 'mon',
      title: 'Partly cloudy',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sun.svg/2048px-Sun.svg.png',
      backImg:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sky.jpg/1200px-Sky.jpg',
      degrees: 14,
    },
    {
      id: '65123456',
      day: 'tue',
      title: 'rainy',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sun.svg/2048px-Sun.svg.png',
      backImg:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sky.jpg/1200px-Sky.jpg',
      degrees: 6,
    },
  ],
};

const wheatherSlice = createSlice({
  name: 'wheatherData',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      console.log();
    },
    removeFromFavorites(state, action) {
      console.log();
    },
  },
});

export default wheatherSlice.reducer;
