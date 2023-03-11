export const userData = {
  id: '1234567890',
  nickname: 'Natali Romanova',
  email: 'email@example.com',
  posts: [
    {
      id: '1111',
      title: 'Ліс',
      photo: require('./assets/images/post-1.jpg'),
      likesNumber: 177,
      locationRegion: 'Івано-Франківщина',
      locationCountry: 'Україна',
      location: {
        latitude: 48.502234,
        longitude: 24.35083,
      },
      comments: [],
    },
    {
      id: '2222',
      title: 'Закат на Чорному морі',
      photo: require('./assets/images/post-2.jpg'),
      likesNumber: 220,
      locationRegion: 'Затока',
      locationCountry: 'Україна',
      location: {
        latitude: 46.095246,
        longitude: 30.487479,
      },
      comments: [
        {
          id: '1111',
          ownerId: 'qwertyuiop',
          ownerPhoto: require('./assets/images/1234567890-photo.jpg'),
          date: '09 червня, 2020 | 08:40',
          text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
        },
        {
          id: '2222',
          ownerId: '1234567890',
          ownerPhoto: require('./assets/images/user-photo.jpg'),
          date: '09 червня, 2020 | 09:14',
          text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
        },
        {
          id: '3333',
          ownerId: 'qwertyuiop',
          ownerPhoto: require('./assets/images/1234567890-photo.jpg'),
          date: '09 червня, 2020 | 09:20',
          text: 'Thank you! That was very helpful!',
        },
      ],
    },
    {
      id: '3333',
      title: 'Старий будиночок у Венеції',
      photo: require('./assets/images/post-3.jpg'),
      likesNumber: 200,
      locationRegion: 'Венеція',
      locationCountry: 'Італія',
      location: {
        latitude: 45.453887,
        longitude: 12.352767,
      },
      comments: [],
    },
  ],
};
