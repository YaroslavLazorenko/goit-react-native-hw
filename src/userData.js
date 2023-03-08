export const userData = {
  name: 'Natali Romanova',
  email: 'email@example.com',
  posts: [
    {
      id: '1111',
      title: 'Ліс',
      photo: require('./assets/images/post-1.jpg'),
      commentsNumber: 0,
      likesNumber: 177,
      locationRegion: 'Івано-Франківщина',
      locationCountry: 'Україна',
      location: {
        latitude: 48.502234,
        longitude: 24.35083,
      },
    },
    {
      id: '2222',
      title: 'Закат на Чорному морі',
      photo: require('./assets/images/post-2.jpg'),
      commentsNumber: 23,
      likesNumber: 220,
      locationRegion: 'Затока',
      locationCountry: 'Україна',
      location: {
        latitude: 46.095246,
        longitude: 30.487479,
      },
    },
    {
      id: '3333',
      title: 'Старий будиночок у Венеції',
      photo: require('./assets/images/post-3.jpg'),
      commentsNumber: 12,
      likesNumber: 200,
      locationRegion: 'Венеція',
      locationCountry: 'Італія',
      location: {
        latitude: 45.453887,
        longitude: 12.352767,
      },
    },
  ],
};
