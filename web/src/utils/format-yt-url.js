export const getEmbedYoutubeURL = (url) => {
  // src={'https://www.youtube.com/embed/7KDRqBpT8NA'}
  // src={'https://www.youtube.com/embed/J7XVzwEdUNw'}
  let _url = url.split('&')[0];

  return _url.replace('watch?v=', 'embed/');
};
